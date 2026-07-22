
import { workspaceManager } from './core/workspace.manager.js';
import { themeController } from './ui/theme.controller.js';
import { languageController } from './ui/language.controller.js';
import { localeController } from './ui/locale.controller.js';
import { stateStore } from './core/state.store.js';
import { FabBlocksAdapter } from './integrations/fabblocks.adapter.js';

// Import Translation Map to ensure it's loaded (even if used by controllers)
import { translationMap } from '/static/src/translationMap.js';

// Import Generator System (JST)
import './generators/index.js';

class App {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize Core Components
        // Logic from original script:
        /*
        if (localStorage.getItem('languageFabBlocks') === undefined...) window.fabblocksLanguage = ...
        if (window.programmingLanguage === undefined...) ...
        
        FabBlocks.load({...})
        Blockly.inject...
        Blockly.Xml.domToWorkspace...
        */

        // Initial State Load (handled in StateStore constructor)
        const currentLocale = stateStore.get('locale');
        const programmingLanguage = stateStore.get('language');
        const colorProfile = stateStore.get('colorProfile');

        // Global compatibility (if other external scripts rely on them)
        window.translationMap = translationMap || {}; // Should be set by module import or script

        // console.log("Initializing App with:", { currentLocale, programmingLanguage, colorProfile });

        // Load FabBlocks
        FabBlocksAdapter.load({
            zoom: 1,
            colorProfile: colorProfile,
            language: currentLocale
        });

        // Initialize Workspace
        workspaceManager.init();

        // Trigger initial UI updates
        // Apply colors (ThemeController listens to code-update but initial load needs explicit call?)
        themeController.applyColorsToBlocks();
        themeController.applyWorkspaceColors();

        // Initial language setup (hiding categories)
        languageController.updateCategories(programmingLanguage);

        // Expose toggleCode for UI (if button exists or console use)
        window.toggleCode = () => this.toggleCode();
    }

    toggleCode() {
        const codeElement = document.getElementById('code');
        const blocklyElement = document.getElementById('blockly');

        if (codeElement && blocklyElement) {
            if (codeElement.style.display === 'none') {
                codeElement.style.display = 'block';
                blocklyElement.style.width = '66%';
            } else {
                codeElement.style.display = 'none';
                blocklyElement.style.width = '100%';
            }
            workspaceManager.resize();
        }
    }
}

// Start App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
