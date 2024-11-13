export default class Flashcard {
  constructor(id: number, front: Array<string>, back: Array<string>) {
    this.id = id;
    this.front = front;
    this.back = back;
  }
  id: number;
  front: Array<string>;
  back: Array<string>;
}
