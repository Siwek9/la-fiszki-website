import escapeStringRegexp from 'escape-string-regexp';

export default function convertDelimiterToUse(delimiter: string): string {
    delimiter = delimiter.replaceAll('\\n', '\n');
    delimiter = delimiter.replaceAll('\\r', '\r');
    delimiter = delimiter.replaceAll('\\t', '\t');
    return escapeStringRegexp(delimiter);
}
