import { Config } from '../config.js';

/**
 * Global State Store
 * Manages application state and persistence.
 */
export class StateStore {
    constructor() {
        this.state = {
            locale: Config.defaults.locale,
            language: Config.defaults.language,
            colorProfile: Config.defaults.colorProfile
        };
        this.listeners = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        const storedRoboBlocksLang = localStorage.getItem('languageRoboBlocks');

        if (storedLanguage) {
            this.state.language = storedLanguage;
        }

        // Backward compatibility: Ensure global is set on init
        window.programmingLanguage = this.state.language;

        // Note: verify if we need to sync roboblocksLanguage specifically or if it's just the locale
        const localeSelector = document.getElementById('localeSelector');
        if (localeSelector) {
            // In case we init before DOM, but usually store is init after load
            this.state.locale = localeSelector.value || 'es-ES';
        } else if (storedRoboBlocksLang) {
            this.state.locale = storedRoboBlocksLang;
        }
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        if (this.state[key] !== value) {
            this.state[key] = value;
            this.notifyListeners(key, value);

            if (key === 'language') {
                localStorage.setItem('selectedLanguage', value);
                // backward compatibility global
                window.programmingLanguage = value;
            }
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notifyListeners(key, value) {
        this.listeners.forEach(listener => listener(key, value));
    }
}

export const stateStore = new StateStore();
