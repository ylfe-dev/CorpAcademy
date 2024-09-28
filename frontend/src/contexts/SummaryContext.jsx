import { createContext } from 'react';

export const SummaryContextDefault = {
    mistakesInWords: 0,
    wordCount: 0,
    // sentenceMistakes: 0,
    // sentenceTime: 0
};

export const SummaryContext = createContext(null);