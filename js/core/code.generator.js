
import { BlocklyAdapter } from '../integrations/blockly.adapter.js';
import { RoboBlocksAdapter } from '../integrations/roboblocks.adapter.js';
import { stateStore } from './state.store.js';

/**
 * Code Generator
 * Handles generation of code from Blockly workspace.
 * Responsible for escaping and highlighting code.
 */
export class CodeGenerator {
    constructor() {
        this.codeElementId = 'code';
    }

    escapeCode(code) {
        return code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    updateCode() {
        // Assume Blockly.Arduino is available globally for now as it's part of the compressed files
        // In a full module system, this would be imported, but we are respecting constraints.
        const workspace = BlocklyAdapter.getMainWorkspace();
        if (!workspace) return;

        let code = "";
        try {
            code = Blockly.Arduino.workspaceToCode(workspace);
        } catch (e) {
            console.warn("Error generating code", e);
            code = "// Error generating code";
        }

        const language = stateStore.get('language') || 'cpp';
        // Map 'language' to a class for hljs if needed, currently direct mapping

        const escapedCode = this.escapeCode(code);

        // Update DOM - Ideally this should be in a UI controller, 
        // but for now the generator produces the HTML string as per original logic
        const codeContainer = document.getElementById(this.codeElementId);

        // NOTE: This logic was in local function updateCode
        if (codeContainer) {
            /* 
              Original: 
              $('#code').html('<code class="' + languageClass + '"><pre>' + escapeCode(code) + '</pre></code>');
            */
            // Using innerHTML structure slightly cleaner but keeping classes
            codeContainer.innerHTML = `<code class="${language}"><pre>${escapedCode}</pre></code>`;

            // Trigger highlight
            const preElements = codeContainer.querySelectorAll('pre');
            preElements.forEach((e) => {
                if (window.hljs) {
                    window.hljs.highlightBlock(e);
                }
            });

            // We also need to re-apply colors to workspace after code update according to original logic
            // "changeColorWorkSpace(RoboBlocks);" was called at end of updateCode
            // This creates a dependency loop if we call UI controller here.
            // Better approach: Events. 
            // For now, we will dispatch a custom event that ThemeController can listen to.
            const event = new CustomEvent('code-updated');
            document.dispatchEvent(event);
        }
    }
}

export const codeGenerator = new CodeGenerator();
