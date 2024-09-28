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


    return (
        <Scene type="basic">

            <section className='content'>
                <Hint character="cat" text="To było szybkie" />
                <Hint character="rat" delay="4" text="Można lepiej" />
            </section>

            <section>
                <h2 class="title">Wyzwanie ukończone!</h2>

                <div className='summary-table'>
                    
                    <fieldset className='summary-table__item'>
                        <legend className='summary-table__title'>
                            Dokładność
                        </legend>
                        🎯{params.accuracy}
                    </fieldset>
                    <fieldset className='summary-table__item'>
                        <legend className='summary-table__title'>Zegarek</legend>
                        ⏰{formatTime(params.time)}
                    </fieldset>
                    <fieldset className='summary-table__item'>
                        <legend className='summary-table__title'>Punkty</legend>
                        🏆{params.points}%
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
