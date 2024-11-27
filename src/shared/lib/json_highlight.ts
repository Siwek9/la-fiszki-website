import type {TextHighlight} from './text_highlight';

const jsonHighlight: TextHighlight = [
    {
        regex: /("(.*?)")(?=\s*:)/g, // key
        style: {
            color: '#007acc',
        },
    },
    {
        regex: /: ("(.*?)")/g, // string
        style: {
            color: '#d69d85',
        },
        replace: ': $1',
    },
    {
        regex: /: (\d+)/g, // number
        style: {
            color: '#b5cea8',
        },
        replace: ': $1',
    },
    {
        regex: /: (true|false)/g, // boolean
        style: {
            color: '#569cd6',
        },
        replace: ': $1',
    },
    {
        regex: /: (null)/g, // null
        style: {
            color: '#9cdcfe',
        },
        replace: ': $1',
    },
];

export default jsonHighlight;
