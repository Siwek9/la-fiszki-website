import type {FlashcardsSet} from './flashcards_set';

export default function createEmptyFlashcardsSet(): FlashcardsSet {
    return {
        name: 'New Set of Flashcards',
        author: 'Unknown',
        version: '0.1',
        sideName: {
            front: 'Unknown',
            back: 'Unknown',
        },
        flashcards: [
            {
                front: [''],
                back: [''],
            },
        ],
    };
}
