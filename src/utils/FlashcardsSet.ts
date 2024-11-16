import type {Flashcard} from './Flashcard';
import type {SideName} from './SideName';

export type FlashcardsSet = {
    name: string;
    author: string;
    sideName: SideName;
    flashcards: Array<Flashcard>;
};

// export default class FlashcardsSet {
//     constructor(name: string, author: string, sideName: SideName, flashcards: Array<Flashcard>) {
//         this.name = name;
//         this.author = author;
//         this.sideName = sideName;
//         this.flashcards = flashcards;
//     }
//     constructor(flashcardSetContent: {
//         name: string;
//         author: string;
//         sideName: {
//             front: string;
//             back: string;
//         };
//         flashcards: Array<{front: string; back: string}>;
//     }) {}
//     name: string;
//     author: string;
//     sideName: SideName;
//     flashcards: Array<Flashcard>;
// }
