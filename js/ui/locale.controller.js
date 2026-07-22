
import { stateStore } from '../core/state.store.js';
import { FabBlocksAdapter } from '../integrations/fabblocks.adapter.js';
import { BlocklyAdapter } from '../integrations/blockly.adapter.js';

/**
 * Locale Controller
 * Manages language/locale of the interface (ES, EN, etc.).
 */
export class LocaleController {
    constructor() {
        this.localeSelectorId = 'localeSelector';
        this.setupListeners();
    }

    setupListeners() {
        const selector = document.getElementById(this.localeSelectorId);
        if (selector) {
            selector.addEventListener('change', (event) => {
                const newLocale = event.target.value;
                this.changeLocale(newLocale);
            });
        }
    }

    changeLocale(newLocale) {
        const lastLocale = stateStore.get('locale');
        const colorProfile = stateStore.get('colorProfile');

        // Update State
        stateStore.set('locale', newLocale);

        // Load FabBlocks
        FabBlocksAdapter.load({
            zoom: 1,
            colorProfile: colorProfile,
            language: newLocale
        });

        // Translate Toolbox Labels
        // Logic from original changeLocale
        const labels = document.querySelectorAll('[id$=".label"]');
        const labelArray = Array.from(labels)
            .filter(label => /^[\p{L}]+\.label$/u.test(label.id))
            .map(label => [label.id, label.textContent]);

        const translatedObject = BlocklyAdapter.createLocalizedToolbox(labelArray, lastLocale, newLocale);

        if (translatedObject) {
            const translatedArray = Object.entries(translatedObject);
            this.updateLabels(translatedArray);
        }

        // console.log("Changed locale to", newLocale);
    }

    updateLabels(translatedArray) {
        translatedArray.forEach(([id, text]) => {
            const label = document.getElementById(id);
            if (label) {
                label.textContent = text;
            }
        });
    }
}

export const localeController = new LocaleController();
