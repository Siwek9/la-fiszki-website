import type {FlashcardsSet} from './FlashcardsSet';
import {preCardboardArrayVersion, PreVersioningVersion} from './SetOfFlashcardsValidators';
import SetOfFlashcardsVersion from './SetOfFlashcardsVersion';
// import * as st from 'simple-runtypes';

export default function fixOutdatedSets(
    setContent: unknown,
    version: SetOfFlashcardsVersion
): FlashcardsSet | undefined {
    // setContent;
    switch (version) {
        case SetOfFlashcardsVersion.PreCardboardArray:
            setContent = upgradeToPreVersioning(preCardboardArrayVersion(setContent));
        case SetOfFlashcardsVersion.PreVersioning:
            setContent = upgradeToVersion0_1(PreVersioningVersion(setContent));
        case SetOfFlashcardsVersion.Version0_1:
            return setContent as FlashcardsSet;
        default:
            return undefined;
    }
}

function upgradeToPreVersioning(setContent: {
    name: string;
    author: string;
    sideName: {front: string; back: string};
    cardboards: Array<{front: string; back: string}>;
}) {
    return {
        name: setContent.name,
        author: setContent.author,
        sideName: {...setContent.sideName},
        cardboards: [
            ...setContent.cardboards.map<{front: Array<string>; back: Array<string>}>((cardboard) => ({
                front: [cardboard.front],
                back: [cardboard.back],
            })),
        ],
    };
}

function upgradeToVersion0_1(setContent: {
    name: string;
    author: string;
    sideName: {front: string; back: string};
    cardboards: Array<{front: Array<string>; back: Array<string>}>;
}) {
    return {
        name: setContent.name.substring(0, 70),
        author: setContent.author.substring(0, 50),
        sideName: {front: setContent.sideName.front.substring(0, 30), back: setContent.sideName.back.substring(0, 30)},
        flashcards: [
            ...setContent.cardboards.map((cardboard) => {
                front: cardboard.front.map((front) => front.substring(0, 300));
                back: cardboard.back.map((back) => back.substring(0, 300));
            }),
        ],
        version: '0.1',
    };
}
