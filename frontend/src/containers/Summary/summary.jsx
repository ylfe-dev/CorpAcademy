import Hint from '../../components/Hint/hint'
import { useContext } from 'react';
import { Link } from "react-router-dom";
import Scene from '../../components/Scene/scene';
import { SummaryContext } from '../../contexts/SummaryContext';

function Summary() {

    //{ wordsMistakes, words, sentenceMistakes, sentence, sentenceTime }

    const summaryContext = useContext(SummaryContext);

    //const categories = useAPI({url:"categories"})

    console.log(summaryContext)

    return (
        <Scene type="basic">

            <section className='info'>
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
