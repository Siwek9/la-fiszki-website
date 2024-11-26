import type {FlashcardsSet} from '@/shared/lib/flashcards_set';
import * as st from 'simple-runtypes';
import {ReadyToBeExported} from '@/shared/lib/flashcards_set_validators';

export function exportSet(set: FlashcardsSet) {
    if (!st.use(ReadyToBeExported, set).ok) {
        return;
    }

    const objectToExport = ReadyToBeExported(set);
    console.log(objectToExport);

    const file = new Blob([JSON.stringify(objectToExport)], {type: 'text/plain'});

    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.href = URL.createObjectURL(file);
    downloadAnchorNode.download = objectToExport.name += '.json';
    document.body.appendChild(downloadAnchorNode); // required for firefox

    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
