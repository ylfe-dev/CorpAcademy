import Hint from '../../components/Hint'
import { Outlet, Link } from "react-router-dom";
import Scene from '../../components/Scene';

function Menu (){  
    return (
        <Scene type="basic"> 
            <section className='info'>
            </section>
        
            <section className='content'>
                <Hint character="cat" text="W co zagramy?"/>
            </section>
            
            <section className='action'>
                <Link className="button" to={'/game'}>Start Gry</Link>
            </section>
        </Scene>      

        )
       
}

export default Menu


