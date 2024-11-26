import type {Flashcard} from './Flashcard';
import type {SideName} from './SideName';

export type FlashcardsSet = {
    name: string;
    author: string;
    sideName: SideName;
    version: string;
    flashcards: Array<Flashcard>;
};
