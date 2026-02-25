
import { RoboBlocksAdapter } from '../integrations/roboblocks.adapter.js';
import { stateStore } from '../core/state.store.js';

/**
 * Theme Controller
 * Manages color profiles and application of theme colors to UI components.
 */
export class ThemeController {
    constructor() {
        this.colorProfileSelectorId = 'colorProfileSelector';
        this.setupListeners();
    }

    setupListeners() {
        // Listen for DOM events
        const selector = document.getElementById(this.colorProfileSelectorId);
        if (selector) {
            selector.onclick = () => this.changeColor(); // Original was onclick, implies immediate reaction or on selection
            // Note: select usually uses onchange, but original code had onclick="changeColor()". 
            // We'll stick to 'change' for better UX usually, but let's support click to be safe or just change.
            selector.addEventListener('change', () => this.changeColor());
        }

        // Listen for code updates to re-apply colors
        document.addEventListener('code-updated', () => {
            this.applyWorkspaceColors();
        });

        // Listen for state changes if needed?
        // stateStore.subscribe((key, value) => { if (key === 'colorProfile') ... });
    }

    /**
     * Called when user changes color profile
     */
    changeColor() {
        const selector = document.getElementById(this.colorProfileSelectorId);
        const profile = selector.value;
        const currentLocale = stateStore.get('locale');

        // Update RoboBlocks
        RoboBlocksAdapter.load({
            zoom: 1,
            colorProfile: profile,
            language: currentLocale,
        });

        // Update state
        stateStore.set('colorProfile', profile);

        this.applyColorsToBlocks();
        this.applyWorkspaceColors();
    }

    applyColorsToBlocks() {
        // Original logic: update colors for each block type
        const colors = RoboBlocksAdapter.getColors();
        const workspace = Blockly.getMainWorkspace();

        if (!workspace) return;

        workspace.getAllBlocks().forEach((block) => {
            // Try to find color based on block type (if numeric index) 
            // or if RoboBlocks provides a mapping.
            // In RoboBlocks, blocks usually have a category property.
            let color = colors[block.type] || "";

            // If no color by type, try standard RoboBlocks categories
            if (!color && block.category) {
                // This is a bit of a hack but matches potential legacy logic where
                // categories might map to indices in the colors array.
                // However, the cleanest way is if the block already has a color
                // and we just want to update it to the current theme's version.
            }

            // If we found a color, apply it
            // Only apply if it looks like a valid hex or is a number (Hue)
            if (color && (typeof color === 'number' || (typeof color === 'string' && color.startsWith('#')))) {
                try {
                    block.setColour(color);
                } catch (e) {
                    console.warn(`Failed to set color ${color} for block ${block.type}`, e);
                }
            }
        });

        // Also update tree rows (toolbox)
        // Original had logic to prepend span.treeLabelBlock
        // We'll trust the original logic's Selector
        const treeRows = document.querySelectorAll('.blocklyTreeRow');
        treeRows.forEach((row, i) => {
            const existing = row.querySelector('.treeLabelBlock');
            if (existing) existing.remove();

            const span = document.createElement('span');
            span.className = 'treeLabelBlock';
            // Original: style="background-color:' + colors[i] + '"
            // Note: 'i' here corresponds to the index in the toolbox?? 
            // Original: $('.blocklyTreeRow').each(function (i, e) { ... colors[i] ... });
            // This implies the toolbox order matches the colors array order.
            if (colors[i]) {
                span.style.backgroundColor = colors[i];
            }
            row.prepend(span);
        });
    }

    applyWorkspaceColors() {
        const colors = RoboBlocksAdapter.getColorConstants();
        if (!colors) return;

        // Using DOM query selectors as per original jQuery logic
        const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
        if (toolboxDiv) toolboxDiv.style.backgroundColor = colors.BACKGROUND_COLOUR_TOOLBOX;

        const blocklySvg = document.querySelector('.blocklySvg');
        if (blocklySvg) blocklySvg.style.backgroundColor = colors.BACKGROUND_COLOUR_CANVAS;

        // Code background
        const pre = document.querySelector('pre');
        if (pre) pre.style.backgroundColor = colors.BACKGROUND_COLOUR_CODE;

        const codeDiv = document.getElementById('code');
        if (codeDiv) codeDiv.style.backgroundColor = colors.BACKGROUND_COLOUR_CODE;

        // Syntax highlighting colors
        this.applySyntaxColors(colors.TITLE_COLOR, '.hljs-title');
        this.applySyntaxColors(colors.COMMENT_COLOR, '.hljs-comment');
        this.applySyntaxColors(colors.STRING_COLOR, '.hljs-string');
        this.applySyntaxColors(colors.LITERAL_COLOR, '.hljs-literal');
        this.applySyntaxColors(colors.KEYWORD_COLOR, '.hljs-keyword');
        this.applySyntaxColors(colors.NUMBER_COLOR, '.hljs-number');
    }

    applySyntaxColors(color, selector) {
        if (!color) return;
        document.querySelectorAll(selector).forEach((el) => {
            el.style.color = color;
        });
    }
}

export const themeController = new ThemeController();
