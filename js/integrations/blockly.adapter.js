
/**
 * Adapter for Blockly
 * Encapsulates direct interactions with the global Blockly object.
 */
export const BlocklyAdapter = {
    inject: (elementId, options) => {
        const element = document.getElementById(elementId);
        if (!element) throw new Error(`Element ${elementId} not found`);
        return Blockly.inject(element, options);
    },

    createToolbox: () => {
        return Blockly.createToolbox();
    },

    loadBlocks: (xmlId) => {
        const workspace = Blockly.getMainWorkspace();
        const xmlElement = document.getElementById(xmlId);
        if (workspace && xmlElement) {
            Blockly.Xml.domToWorkspace(workspace, xmlElement);
        }
    },

    clearWorkspace: () => {
        const workspace = Blockly.getMainWorkspace();
        if (workspace) workspace.clear();
    },

    addChangeListener: (callback) => {
        Blockly.addChangeListener(callback);
    },

    getMainWorkspace: () => {
        return Blockly.getMainWorkspace();
    },

    fireUiEvent: (node, eventName) => {
        Blockly.fireUiEvent(node, eventName);
    },

    createLocalizedToolbox: (labelArray, lastLocale, currentLocale) => {
        return Blockly.createLocalizedToolbox(labelArray, lastLocale, currentLocale);
    }
};
