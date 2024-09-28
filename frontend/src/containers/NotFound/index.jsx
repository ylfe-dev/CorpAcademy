import Hint from '../../components/Hint'
import { Outlet, Link } from "react-router-dom";

function NotFound (){
    
    return (
        <section className='not-found center'>
            <Hint character="cat" text="Zgubiłeś się?"/>
            <Hint character="rat" text="Wracaj do gry!" right/>
            <Link className="button" to={'/'}>Tak zagubiłem się, wracam do gry</Link>
        </section>
    )
       
}

export default NotFound


