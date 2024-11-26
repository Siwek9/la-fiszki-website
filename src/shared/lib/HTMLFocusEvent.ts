export default interface HTMLInputEvent extends FocusEvent {
    currentTarget: HTMLInputElement & EventTarget;
}
