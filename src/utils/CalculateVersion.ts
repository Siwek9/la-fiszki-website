import {preCardboardArrayVersion, PreVersioningVersion, Version0_1} from './SetOfFlashcardsValidators';
import SetOfFlashcardsVersion from './SetOfFlashcardsVersion';
import * as st from 'simple-runtypes';

export default function calculateVersion(set_of_flashcards: string): SetOfFlashcardsVersion | undefined {
    let dataJSON;
    try {
        dataJSON = JSON.parse(set_of_flashcards);
    } catch (e: unknown) {
        if (e instanceof SyntaxError) {
            console.error(e.message);
            return undefined;
        }
        throw e;
    }

    const version_string: undefined | string = dataJSON['version'];

    if (version_string == undefined) {
        if (st.use(preCardboardArrayVersion, dataJSON).ok) {
            return SetOfFlashcardsVersion.PreCardboardArray;
        } else if (st.use(PreVersioningVersion, dataJSON).ok) {
            return SetOfFlashcardsVersion.PreVersioning;
        }
    } else {
        switch (version_string) {
            case '0.1':
                if (st.use(Version0_1, dataJSON).ok) {
                    return SetOfFlashcardsVersion.Version0_1;
                }
                break;
            default:
                return undefined;
        }
        return undefined;
    }
    return undefined;
}
