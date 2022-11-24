import { pipe, reduce } from '@fxts/core';

const getLinkTarget = (target: 'CURRENT' | 'NEW') =>
    target === 'CURRENT' ? '_self' : '_blank';

const breakWord = (
    words: string,
    division: string,
    substitute: string,
): string =>
    pipe(
        words.split(division),
        reduce((a, b) => a + substitute + b),
    );

export { getLinkTarget, breakWord };
