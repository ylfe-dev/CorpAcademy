import Hint from '../../components/Hint'
import { Outlet, Link } from "react-router-dom";
import Scene from '../../components/Scene';

function NotFound (){
    
    return (
        <Scene type="basic"> 
            <section className='info'>
            </section>
        
            <section className='content'>
                <Hint character="cat" text="Zgubiłeś się?"/>
                <Hint character="rat" text="Wracaj do gry!" right/>
            </section>
            
            <section className='action'>
                <Link className="button" to={'/'}>Tak zagubiłem się, wracam do gry</Link>
            </section>
        </Scene>
    )
       
}

export default NotFound


