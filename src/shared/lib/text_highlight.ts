export type TextHighlight = Array<{
    detectRegex: RegExp;
    highlightRegex?: RegExp;
    style: {color?: string; 'background-color'?: string};
    replace?: string;
}>;
