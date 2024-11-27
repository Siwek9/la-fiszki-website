import {getHTMLInputElement} from './get_html_input_element';

export default async function readFileContent(event: Event): Promise<string> {
    return new Promise<string>((resolve) => {
        const files = getHTMLInputElement(event).files;
        if (files == null) {
            return resolve('');
        }

        const reader = new FileReader();
        reader.readAsText(files[0], 'UTF-8');
        reader.onload = function (event) {
            const value = event.target?.result;
            if (typeof value == 'string') {
                return resolve(value as unknown as string);
            }
        };
        getHTMLInputElement(event).value = '';
    });
}
