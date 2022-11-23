import currency from 'currency.js';

const KRW = (
    value: currency.Any,
    options: currency.Options = {
        symbol: '원',
        precision: 0,
        pattern: `# !`,
        negativePattern: `- # !`,
    },
) => currency(value, { ...options });

const USD = (value: currency.Any) => currency(value);

const JPY = (value: currency.Any) =>
    currency(value, { precision: 0, symbol: '¥' });

const EURO = (value: currency.Any) =>
    currency(value, { symbol: '€', decimal: ',', separator: '.' });

export { KRW, USD, JPY, EURO };
