
import { stateStore } from '../core/state.store.js';
import { RoboBlocksAdapter } from '../integrations/roboblocks.adapter.js';
import { codeGenerator } from '../core/code.generator.js';
import { themeController } from './theme.controller.js';
import { Config } from '../config.js';

// Import translation map.
// Based on index.html: import { translationMap } from '/static/src/translationMap.js';
import { translationMap } from '/static/src/translationMap.js';

/**
 * Language Controller
 * Manages programming language selection (C++, Python, JS) and visible categories.
 */
export class LanguageController {
    constructor() {
        this.languageSelectorId = 'languageSelector';
        this.setupListeners();
    }

    setupListeners() {
        const selector = document.getElementById(this.languageSelectorId);
        if (selector) {
            selector.addEventListener('change', () => this.changeLanguage());
        }
    }

    changeLanguage() {
        const selector = document.getElementById(this.languageSelectorId);
        const selectedLanguage = selector.value;
        const currentLocale = stateStore.get('locale');
        const colorProfile = stateStore.get('colorProfile');

        // Update State
        stateStore.set('language', selectedLanguage);

        // Reload RoboBlocks
        RoboBlocksAdapter.load({
            zoom: 0.5,
            language: currentLocale,
            colorProfile: colorProfile
        });

        // Update UI Categories
        this.updateCategories(selectedLanguage);

        // Update Code
        codeGenerator.updateCode();

        // Re-apply workspace colors
        themeController.applyWorkspaceColors();
    }

    updateCategories(language) {
        const config = Config.languageCategories[language];

        if (config) {
            if (config.hide) this.hideCategories(config.hide);
            if (config.ensureVisible) this.ensureCategoriesVisible(config.ensureVisible);
        } else {
            this.showAllCategories();
        }
    }


    hideCategories(categories) {
        this.showAllCategories();
        categories.forEach((categoryId) => {
            const translation = this.getTranslationKey(categoryId);
            if (translation) {
                const categoryElement = document.getElementById(translation.toLowerCase());
                if (categoryElement) {
                    categoryElement.style.display = 'none';
                }
            }
        });
    }

    ensureCategoriesVisible(categoryIds) {
        categoryIds.forEach((categoryId) => {
            const translation = this.getTranslationKey(categoryId);
            if (translation) {
                const categoryElement = document.getElementById(translation.toLowerCase());
                if (categoryElement) {
                    categoryElement.style.display = ''; // Restore visibility
                }
            }
        });
    }

    showAllCategories() {
        const allCategories = document.querySelectorAll('.blocklyTreeRow');
        allCategories.forEach((category) => {
            // Logic in original was simple, but here logic depends on ID matching translation??
            // Original: category.style.display = '';
            // BUT wait, how did original connect translation to DOM element?
            // "var categoryElement = document.getElementById(translation.toLowerCase());"
            // This assumes the DOM elements (tree rows) have IDs that match the translated category name!
            // That is ... fragile, but if that's how it works, we maintain it.
            if (category.style) category.style.display = '';
        });
    }

    getTranslationKey(categoryId) {
        const currentLocale = stateStore.get('locale') || 'es-ES';
        // translationMap is global in window or imported? 
        // We imported it.
        if (translationMap && translationMap[currentLocale]) {
            return translationMap[currentLocale][categoryId];
        }
        return null;
    }
}

export const languageController = new LanguageController();
