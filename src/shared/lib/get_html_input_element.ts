export function getHTMLInputElement(event: Event | FocusEvent) {
    return event.currentTarget! as HTMLInputElement;
}
