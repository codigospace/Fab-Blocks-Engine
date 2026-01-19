
/**
 * Configuration
 * Centralizes defaults and static configuration data.
 */
export const Config = {
    defaults: {
        language: 'cpp',
        locale: 'es-ES',
        colorProfile: 'default'
    },

    // Configuration for block categories visibility per language
    languageCategories: {
        js: {
            hide: ["betto", "carlitto", "modular", "communication", "arduino", "raspberry"],
            ensureVisible: []
        },
        python: {
            hide: ["betto", "carlitto", "modular", "communication", "arduino"],
            ensureVisible: ["raspberry"]
        },
        cpp: {
            hide: ["raspberry"],
            ensureVisible: ["betto", "carlitto", "modular", "communication", "arduino"]
        }
    }
};
