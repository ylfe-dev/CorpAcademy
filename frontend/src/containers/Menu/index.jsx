import Hint from '../../components/Hint'
import { Outlet, Link } from "react-router-dom";

function Menu (){  
    return (
        <section className='menu center'>
            <Hint character="cat" text="W co zagramy?"/>
            <Link className="button" to={'/game'}>Start Gry</Link>
        </section>
        )
       
}

export default Menu


