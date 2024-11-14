export default class Flashcard {
    constructor(front: Array<string>, back: Array<string>) {
        this.front = front;
        this.back = back;
    }
    front: Array<string>;
    back: Array<string>;
}
