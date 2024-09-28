import Hint from '../../components/Hint/hint'
import { useContext, useMemo } from 'react';
import { Link } from "react-router-dom";
import Scene from '../../components/Scene/scene';
import { SummaryContext } from '../../contexts/SummaryContext';

function Summary() {

    //{ wordsMistakes, words, sentenceMistakes, sentence, sentenceTime }

    const summaryContext = useContext(SummaryContext);
    const accuracy = useMemo(() => {
        return ~~((summaryContext.mistakesInWords / summaryContext.sentenceCount) * 100)
    }, [summaryContext]);

    //const categories = useAPI({url:"categories"})

    console.log(summaryContext)

    return (
        <Scene type="basic">

            <section className='info'>
                {summaryContext.sentence}

                Dokładność: {accuracy}%
            </section>

            <section className='content'>

                <Hint left character="cat" text="W co zagramy?" />
            </section>

            <section className='action'>
                <Link className="button" to={'/game'}>koniec</Link>
            </section>
        </Scene>
    )
}

export default Summary
