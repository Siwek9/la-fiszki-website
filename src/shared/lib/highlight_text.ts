import type {TextHighlight} from '@/shared/lib/text_highlight';

export default function highlightText(text: string, highlight?: TextHighlight): string {
    let toReturn = text;
    if (highlight == undefined) {
        return toReturn;
    }

    highlight.forEach((highlightRule) => {
        const element = document.createElement('span');
        element.textContent = '$1';

        Object.entries(highlightRule.style).forEach(([style, styleValue]) => {
            if (styleValue != undefined) {
                element.style.setProperty(style, styleValue);
            }
        });
        if (highlightRule.replace != null) {
            toReturn = toReturn.replace(highlightRule.regex, highlightRule.replace.replace('$1', element.outerHTML));
        } else {
            toReturn = toReturn.replace(highlightRule.regex, element.outerHTML);
        }
    });
    return toReturn;
}
