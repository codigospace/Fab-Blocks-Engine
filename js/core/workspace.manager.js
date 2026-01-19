
import { BlocklyAdapter } from '../integrations/blockly.adapter.js';
import { codeGenerator } from './code.generator.js';
import { stateStore } from './state.store.js';

/**
 * Workspace Manager
 * Handles initialization, resizing, and resetting of the workspace.
 */
export class WorkspaceManager {
    constructor() {
        this.blocklyDivId = 'blockly';
        this.startBlocksId = 'startBlocks';
    }

    init() {
        // Inject Blockly
        BlocklyAdapter.inject(this.blocklyDivId, {
            toolbox: BlocklyAdapter.createToolbox()
        });

        // Resize logic (Original jQuery: $('.blocklySvg, #blockly').height('100%');)
        // Manually applying styles to prevent workspace growing issues
        const blocklyDiv = document.getElementById(this.blocklyDivId);
        if (blocklyDiv) blocklyDiv.style.height = '100%';

        // We need to target the svg inside blocklyDiv which is created by inject
        const svg = document.querySelector('.blocklySvg');
        if (svg) {
            svg.style.height = '100%';
            svg.style.width = '100%';
        }

        // Note: The original generic resize handler seems to depend on window 'resize' event
        // The toggleCode function manually triggers Blockly.fireUiEvent(window, "resize");

        // Add listener for code updates
        BlocklyAdapter.addChangeListener(() => {
            // We need to pass the current language, which is in the store
            codeGenerator.updateCode();
        });

        // Load initial blocks
        BlocklyAdapter.loadBlocks(this.startBlocksId);

        // Initial Code Update
        codeGenerator.updateCode();
    }

    reset() {
        BlocklyAdapter.clearWorkspace();
        BlocklyAdapter.loadBlocks(this.startBlocksId);
    }

    resize() {
        BlocklyAdapter.fireUiEvent(window, "resize");
    }
}

export const workspaceManager = new WorkspaceManager();
