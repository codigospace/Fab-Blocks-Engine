
const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2] || 'static/tmp/jst.js';
const outputDir = 'js/generators/languages';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(inputFile, 'utf8');

const languages = {
    cpp: [],
    python: [],
    js: []
};

// Helper to extract blocks by counting braces
function extractBlock(text, startIndex) {
    let braceCount = 0;
    let foundStart = false;
    let i = startIndex;
    let blockContentStart = -1;

    // Find first {
    while (i < text.length) {
        if (text[i] === '{') {
            braceCount++;
            if (!foundStart) {
                foundStart = true;
                blockContentStart = i + 1;
            }
        } else if (text[i] === '}') {
            braceCount--;
            if (foundStart && braceCount === 0) {
                return {
                    content: text.substring(blockContentStart, i),
                    endIndex: i + 1
                };
            }
        }
        i++;
    }
    return null;
}

// Find all JST definitions
let cursor = 0;
while (cursor < content.length) {
    // Look for JST["key"] = function
    const defStart = content.indexOf('JST["', cursor);
    if (defStart === -1) break;

    const keyStart = defStart + 5;
    const keyEnd = content.indexOf('"]', keyStart);
    const key = content.substring(keyStart, keyEnd);

    const funcStart = content.indexOf('function', keyEnd);
    const bodyBlock = extractBlock(content, funcStart);

    if (bodyBlock) {
        const body = bodyBlock.content;
        processBody(key, body);
        cursor = bodyBlock.endIndex;
    } else {
        console.error("Could not parse body for", key);
        cursor = keyEnd + 1; // skip
    }
}

function processBody(key, body) {
    // Now we have the body of the function.
    // We expect: if (programmingLanguage === 'cpp') { ... } else if ...

    // We can search for the identifying strings and extract blocks

    ['cpp', 'python', 'js'].forEach(lang => {
        const searchStr = `programmingLanguage === '${lang}'`;
        let idx = body.indexOf(searchStr);
        if (idx !== -1) {
            // Find the opening brace after this
            const block = extractBlock(body, idx);
            if (block) {
                addTemplate(lang, key, block.content);
            }
        }
    });
}

function addTemplate(lang, key, code) {
    let cleanCode = code.trim();
    // remove leading/trailing newlines again just in case
    languages[lang].push(`    register('${lang}', '${key}', (obj) => {\n        let __p = '';\n        let __t;\n        ${cleanCode}\n        return __p;\n    });`);
}

// Write output files
writeLanguageFile('cpp', 'cpp.js');
writeLanguageFile('python', 'python.js');
writeLanguageFile('js', 'javascript.js');

function writeLanguageFile(langKey, fileName) {
    const entries = languages[langKey];
    if (!entries.length) return;

    const fileContent = `
import { register } from '../registry.js';

export function register${capitalize(langKey === 'js' ? 'javascript' : langKey)}() {
${entries.join('\n\n')}
}
`;
    fs.writeFileSync(path.join(outputDir, fileName), fileContent);
    // console.log(`Generated ${fileName} with ${entries.length} templates.`);
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// Generate index.js loader (Same as before)
const indexContent = `
import { get } from './registry.js';
import { registerCpp } from './languages/cpp.js';
import { registerPython } from './languages/python.js';
import { registerJavascript } from './languages/javascript.js';

// Initialize registries
registerCpp();
registerPython();
registerJavascript();

export const JST = new Proxy({}, {
    get: (target, prop) => {
        return (obj, language) => {
            const tmpl = get(language, prop);
            if (tmpl) {
                 try {
                     return tmpl(obj || {});
                 } catch (e) {
                     console.error(\`Error in template \${String(prop)} [\${language}]:\`, e);
                     return "";
                 }
            }
            console.warn(\`Template not found: \${String(prop)} for \${language}\`);
            return "";
        };
    }
});

window.JST = JST; 
`;

fs.writeFileSync('js/generators/index.js', indexContent);
