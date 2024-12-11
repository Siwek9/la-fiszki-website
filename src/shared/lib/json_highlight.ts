import type {TextHighlight} from './text_highlight';

const jsonHighlight: TextHighlight = [
    {
        detectRegex: /(".*?\s*:)/g, // key
        highlightRegex: /(".*?")/g,
        style: {
            color: '#007acc',
        },
    },
    {
        detectRegex: /(".*?")/g, // string
        style: {
            color: '#d69d85',
        },
    },
    {
        detectRegex: /(\d+)/g, // number
        style: {
            color: '#b5cea8',
        },
    },
    {
        detectRegex: /(true|false)/g, // boolean
        style: {
            color: '#569cd6',
        },
    },
    {
        detectRegex: /(null)/g, // null
        style: {
            color: '#9cdcfe',
        },
    },
];

export default jsonHighlight;
