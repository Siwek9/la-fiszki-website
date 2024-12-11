import type {TextHighlight} from '@/shared/lib/text_highlight';
import highlightWords from 'highlight-words';

export default function highlightText(text: string, highlight?: TextHighlight): string {
    const toReturn = text;
    if (highlight == undefined) {
        return toReturn;
    }

    const allChunks: Array<ChunkOfText> = [{text: text, isUsed: false, numberOfRegex: 0}];
    const replaceObjects: Array<string> = [];

    highlight.forEach((highlightRule, ruleIndex) => {
        for (let chunkIndex = 0; chunkIndex < allChunks.length; chunkIndex++) {
            const chunk = allChunks[chunkIndex];
            if (chunk.isUsed) continue;

            const partsOfChunk = highlightWords({text: chunk.text, query: `/${highlightRule.regex.source}/`});
            allChunks.splice(
                chunkIndex,
                1,
                ...partsOfChunk.map<ChunkOfText>((part) => ({
                    text: part.text,
                    isUsed: part.match,
                    numberOfRegex: ruleIndex,
                }))
            );

            chunkIndex += partsOfChunk.length;
        }
        const element = document.createElement('span');
        if (highlightRule.replace != undefined) {
            element.textContent = highlightRule.replace;
        } else {
            element.textContent = '$1';
        }
        Object.entries(highlightRule.style).forEach(([style, styleValue]) => {
            if (styleValue != undefined) {
                element.style.setProperty(style, styleValue);
            }
        });
        replaceObjects.push(element.outerHTML);
    });

    const returnLol = allChunks
        .map((chunk) => {
            if (chunk.isUsed) {
                chunk.text = chunk.text.replace(
                    highlight[chunk.numberOfRegex].regex,
                    replaceObjects[chunk.numberOfRegex]
                );
            }
            return chunk.text;
        })
        .join('');

    return returnLol;
}

type ChunkOfText = {
    text: string;
    isUsed: boolean;
    numberOfRegex: number;
};
