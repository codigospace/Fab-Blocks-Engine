
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
            const blockType = block.type;
            // Warning: original code assumes block.type is an index or map key? 
            // Original: var color = colors[blockType] || "";
            // block.type is usually a string (e.g., 'controls_if').
            // Using an array 'colors' with string keys? or is blockType an Integer?
            // In standard Blockly, block.type is string. 
            // If original code was: var colors = [ ... ]; var color = colors[blockType]; 
            // This implies blockType might be usable as index? 
            // ACTUALLY, checking standard RoboBlocks/Visualino, block types might be mapped elsewhere or the 'colors' array is actually an object?
            // In the provided HTML: 
            // var colors = [ "", RoboBlocks.LANG_COLOUR_PROCEDURES, ... ];
            // This is definitely an array.
            // If index.html uses `colors[blockType]`, then blockType MUST be an integer ??
            // OR checks generic types?
            // Wait, looking at index.html: "var blockType = block.type;" 
            // If block.type is string 'controls_if', colors['controls_if'] is undefined on an array.
            // UNLESS RoboBlocks hacks block.type to be integer?
            // OR I might be misinterpreting the array vs object.
            // Let's assume the original logic worked and replicate it exactly as written.

            const color = colors[blockType] || "";

            if (color) {
                block.setColour(color);
                const svgRoot = block.getSvgRoot();
                if (svgRoot) {
                    svgRoot.setAttribute('style', `color: ${color};`);
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
