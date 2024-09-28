import { Link, useParams } from "react-router-dom";
import Scene from '../../components/Scene/scene';
import './summary.scss';
import Hint from '../../components/Hint/hint'

function Summary() {

    const params = useParams();

    console.log(params);

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    //const categories = useAPI({url:"categories"})

    return (
        <Scene type="basic">

            <section className='content'>
                <Hint character="cat" delay="4" text="To było szybkie" />
                <Hint character="rat" text="Można lepiej" />

            </section>

            <section className='info flex flex-column items-center w-full'>
                <div className='p-4 congratulations-text'>
                    Wyzwanie ukończone!
                </div>
                <div className='flex justify-between w-full'>
                    <fieldset className='result-box border-yellow flex-around'>
                        <legend className='text-center'>
                            Dokładność
                        </legend>
                        🎯{params.accuracy}
                    </fieldset>
                    <fieldset className='result-box border-blue flex-around'>
                        <legend className='text-center'>Zegarek</legend>
                        ⏰{formatTime(params.time)}
                    </fieldset>
                    <fieldset className='result-box border-green flex-around'>
                        <legend className='text-center'>Punkty</legend>
                        💯{params.points}%
                    </fieldset>
                </div>
            </section>

            <section className='action'>
                <Link className="button" to={'/game'}>Kontynuuj rozgrywkę</Link>
            </section>
        </Scene>
    )
}

export default Summary
