import Hint from '../../components/Hint/hint'
import { Outlet, Link } from "react-router-dom";
import Scene from '../../components/Scene/scene';
import Categories from '../../components/Categories/categories';

function Menu (){  
    return (
        <Scene type="basic"> 
            <section className='info'>
            </section>
        
            <section className='content'>
                <Categories categories={[
                    { name: '🏖️' }, 
                    { name: '🚃' }, 
                    { name: '🛤️' },
                    { name: '🏞️' },
                    { name: '🏙️' },
                    { name: '🏜️' },
                    { name: '🏝️' },
                    { name: '🏔️' },
                    { name: '🏟️' },
                    { name: '🏠' },
                    { name: '🏛️' },
                    { name: '🏰' },
                    { name: '🏚️' },
                    { name: '🏗️' },
                    { name: '🏭' },
                    { name: '🏢' },
                    { name: '🏬' },
                    { name: '🏣' },
                    { name: '🏥' },
                    { name: '🏦' },
                    { name: '🏪' },
                    { name: '🏫' },
                    { name: '🏩' },
                    { name: '🏨' },                    
                    ]}/>
                <Hint left character="cat" text="W co zagramy?"/>
            </section>
            
            <section className='action'>
                <Link className="button" to={'/game'}>Start Gry</Link>
            </section>
        </Scene>      
        )
}

export default Menu


