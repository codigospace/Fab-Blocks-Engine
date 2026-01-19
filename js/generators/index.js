
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
                     console.error(`Error in template ${String(prop)} [${language}]:`, e);
                     return "";
                 }
            }
            console.warn(`Template not found: ${String(prop)} for ${language}`);
            return "";
        };
    }
});

window.JST = JST; 
