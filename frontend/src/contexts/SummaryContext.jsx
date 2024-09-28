import { createContext } from 'react';

export const SummaryContextDefault = {
    mistakesInWords: 0,
    sentenceCount: 0,
    sentence: ""
    // sentenceMistakes: 0,
    // sentenceTime: 0
};

export const SummaryContext = createContext(null);