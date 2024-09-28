import Hint from '../../components/Hint/hint'
import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import Scene from '../../components/Scene/scene';
import Categories from '../../components/Categories/categories';
import useAPI from '/src/useAPI';
import {UserContext} from '../../UserContext';


function Menu() {

    const categories = useAPI({ url: "categories" });
    const user = useContext(UserContext);

    const [language, setLanguage] = useState(user.state.learnedLanguage);

    const handleChange = (event) => {
        setLanguage(event.target.value);

        user.state.learnedLanguage = event.target.value;
    };

    return (
        <Scene type="basic">
            <section className='info'>
                <div>
                    <label htmlFor="language">Wybierz język: </label>
                    <select id="language" value={language} onChange={handleChange} >
                        <option value="">--Choose a language--</option>
                        <option value="angielski">Angielski</option>
                        <option value="francuski">Francuski</option>
                        <option value="hiszpański">Hiszpański</option>
                        <option value="niemiecki">Niemiecki</option>
                    </select>
                </div>
            </section>

            <section className='content'>
                {categories.categories ? <Categories categories={categories.categories}/>  
                : <span className='loader loader--medium'></span>}
                <Hint delay="2" left character="cat" text="W co zagramy?"/>
            </section>

            <section className='action'>
                <Link className="button" to={'/game'}>Start Gry</Link>
            </section>

            <div className='background'>
                <div className="pikarzyki shadow">
                    <img src="/img/pikarzyki.png" alt="pikarzyki" />
                </div>
            </div>
        </Scene>
    )
}

export default Menu
