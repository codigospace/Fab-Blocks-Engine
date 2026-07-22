import { FabBlocks } from '/static/fabblocks.js';

/**
 * Adapter for FabBlocks
 * Encapsulates direct interactions with the global FabBlocks object.
 */
export const FabBlocksAdapter = {
    load: (config) => {
        if (FabBlocks) {
            FabBlocks.load(config);
        } else {
            console.error("FabBlocks module not loaded");
        }
    },

    getColors: () => {
        if (!FabBlocks) return [];
        // Mapping as defined in original index.html
        return [
            "",
            FabBlocks.LANG_COLOUR_PROCEDURES,
            FabBlocks.LANG_COLOUR_CONTROL,
            FabBlocks.LANG_COLOUR_LOGIC,
            FabBlocks.LANG_COLOUR_MATH,
            FabBlocks.LANG_COLOUR_VARIABLES,
            FabBlocks.LANG_COLOUR_TEXT,
            FabBlocks.LANG_COLOUR_COMMUNICATION,
            FabBlocks.LANG_COLOUR_MODULAR,
            FabBlocks.LANG_COLOUR_BETTO,
            FabBlocks.LANG_COLOUR_BQ,
            FabBlocks.LANG_COLOUR_ADVANCED,
            FabBlocks.LANG_COLOUR_LCD,
            FabBlocks.LANG_COLOUR_SERVO,
            FabBlocks.LANG_COLOUR_RASPBERRY,
            FabBlocks.BACKGROUND_COLOUR_TOOLBOX,
            FabBlocks.BACKGROUND_COLOUR_CANVAS,
            FabBlocks.BACKGROUND_COLOUR_CODE,
            FabBlocks.TITLE_COLOR,
            FabBlocks.COMMENT_COLOR,
            FabBlocks.STRING_COLOR,
            FabBlocks.LITERAL_COLOR,
            FabBlocks.KEYWORD_COLOR,
            FabBlocks.NUMBER_COLOR
        ];
    },

    getColorConstants: () => {
        if (!FabBlocks) return {};
        return {
            BACKGROUND_COLOUR_TOOLBOX: FabBlocks.BACKGROUND_COLOUR_TOOLBOX,
            BACKGROUND_COLOUR_CANVAS: FabBlocks.BACKGROUND_COLOUR_CANVAS,
            BACKGROUND_COLOUR_CODE: FabBlocks.BACKGROUND_COLOUR_CODE,
            TITLE_COLOR: FabBlocks.TITLE_COLOR,
            COMMENT_COLOR: FabBlocks.COMMENT_COLOR,
            STRING_COLOR: FabBlocks.STRING_COLOR,
            LITERAL_COLOR: FabBlocks.LITERAL_COLOR,
            KEYWORD_COLOR: FabBlocks.KEYWORD_COLOR,
            NUMBER_COLOR: FabBlocks.NUMBER_COLOR
        };
    }
};
