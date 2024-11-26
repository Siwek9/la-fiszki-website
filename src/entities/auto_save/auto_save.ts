import calculateVersion from '@/shared/lib/CalculateVersion';
import fixOutdatedSets from '@/shared/lib/fix_outdated_sets';
import type {FlashcardsSet} from '@/shared/lib/flashcards_set';

const SAVE_NAME = 'last_save';

export function doesSaveExists(): boolean {
    return getSetFromSave() !== undefined;
}

export function saveSet(set: FlashcardsSet) {
    localStorage.setItem(SAVE_NAME, JSON.stringify(set));
}

export function removeSet() {
    localStorage.removeItem(SAVE_NAME);
}

export function getSetFromSave(): FlashcardsSet | undefined {
    const value = localStorage.getItem(SAVE_NAME);

    if (value === null) {
        return undefined;
    }

    const version = calculateVersion(value);

    if (version == undefined) {
        return undefined;
    }

    return fixOutdatedSets(JSON.parse(value), version);
}

// DONT USE THEM - cookies functions ONLY for backwards compatibility

export function setCookie(cookieName: string, cookieValue: object | string | number, expirationDays: number) {
    const d = new Date();
    d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

export function deleteCookie(cookieName: string) {
    setCookie(cookieName, '', -1);
}

export function getCookie(cookieName: string) {
    const nameEQ = cookieName + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
