import type {FlashcardsSet} from '@/shared/lib/FlashcardsSet';
import * as st from 'simple-runtypes';
import {ReadyToBeExported} from '@/shared/lib/SetOfFlashcardsValidators';

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
