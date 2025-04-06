import type {Flashcard} from './flashcard';
import type {SideName} from './side_name';

export type FlashcardsSet = {
    name: string;
    author: string;
    sideName: SideName;
    version: string;
    flashcards: Array<Flashcard>;
};
