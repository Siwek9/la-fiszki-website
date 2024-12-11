export type TextHighlight = Array<{
    regex: RegExp;
    style: {color?: string; 'background-color'?: string};
    replace?: string;
}>;
