import { RoboBlocks } from '/static/roboblocks.js';

/**
 * Adapter for RoboBlocks
 * Encapsulates direct interactions with the global RoboBlocks object.
 */
export const RoboBlocksAdapter = {
    load: (config) => {
        if (RoboBlocks) {
            RoboBlocks.load(config);
        } else {
            console.error("RoboBlocks module not loaded");
        }
    },

    getColors: () => {
        if (!RoboBlocks) return [];
        // Mapping as defined in original index.html
        return [
            "",
            RoboBlocks.LANG_COLOUR_PROCEDURES,
            RoboBlocks.LANG_COLOUR_CONTROL,
            RoboBlocks.LANG_COLOUR_LOGIC,
            RoboBlocks.LANG_COLOUR_MATH,
            RoboBlocks.LANG_COLOUR_VARIABLES,
            RoboBlocks.LANG_COLOUR_TEXT,
            RoboBlocks.LANG_COLOUR_COMMUNICATION,
            RoboBlocks.LANG_COLOUR_MODULAR,
            RoboBlocks.LANG_COLOUR_BETTO,
            RoboBlocks.LANG_COLOUR_BQ,
            RoboBlocks.LANG_COLOUR_ADVANCED,
            RoboBlocks.LANG_COLOUR_LCD,
            RoboBlocks.LANG_COLOUR_SERVO,
            RoboBlocks.LANG_COLOUR_RASPBERRY,
            RoboBlocks.BACKGROUND_COLOUR_TOOLBOX,
            RoboBlocks.BACKGROUND_COLOUR_CANVAS,
            RoboBlocks.BACKGROUND_COLOUR_CODE,
            RoboBlocks.TITLE_COLOR,
            RoboBlocks.COMMENT_COLOR,
            RoboBlocks.STRING_COLOR,
            RoboBlocks.LITERAL_COLOR,
            RoboBlocks.KEYWORD_COLOR,
            RoboBlocks.NUMBER_COLOR
        ];
    },

    getColorConstants: () => {
        if (!RoboBlocks) return {};
        return {
            BACKGROUND_COLOUR_TOOLBOX: RoboBlocks.BACKGROUND_COLOUR_TOOLBOX,
            BACKGROUND_COLOUR_CANVAS: RoboBlocks.BACKGROUND_COLOUR_CANVAS,
            BACKGROUND_COLOUR_CODE: RoboBlocks.BACKGROUND_COLOUR_CODE,
            TITLE_COLOR: RoboBlocks.TITLE_COLOR,
            COMMENT_COLOR: RoboBlocks.COMMENT_COLOR,
            STRING_COLOR: RoboBlocks.STRING_COLOR,
            LITERAL_COLOR: RoboBlocks.LITERAL_COLOR,
            KEYWORD_COLOR: RoboBlocks.KEYWORD_COLOR,
            NUMBER_COLOR: RoboBlocks.NUMBER_COLOR
        };
    }
};
