export default interface HTMLInputEvent extends Event {
    currentTarget: HTMLInputElement & EventTarget;
}
