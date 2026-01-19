
/**
 * JST Registry
 * Stores and retrieves template functions per language.
 */
export const templates = {};

/**
 * Register a template function for a specific language and key.
 * @param {string} language - The programming language (e.g., 'cpp', 'python').
 * @param {string} key - The template key (e.g., 'advanced_conversion').
 * @param {Function} fn - The template function.
 */
export function register(language, key, fn) {
    if (!templates[language]) {
        templates[language] = {};
    }
    templates[language][key] = fn;
}

/**
 * Get a template function.
 * @param {string} language - The programming language.
 * @param {string} key - The template key.
 * @returns {Function|null} - The template function or null if not found.
 */
export function get(language, key) {
    return templates[language]?.[key] || null;
}
