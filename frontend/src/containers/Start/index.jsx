import { useEffect, useState } from 'react';
import Hint from '../../components/Hint'
import { Outlet, Link } from "react-router-dom";
import './style.scss'
import Scene from '../../components/Scene';

function Start(){
    const [input, setInput] = useState("")
    

    return (
        <Scene type="basic"> 
            <section className='info'>
            </section>
        
            <section className='content'>
                <Hint character="rat" text="Kosmiczna technologia zagraża światu. Ekrany dotykowe opanowały nasze umysły. Już teraz potrzebujemy nowego pokolenia, które będzie w stanie stawić czoła wyzwaniom przyszłości." />
                <Hint character="cat" right text="Ja nazywam się Fat Cat, a ten wyżej to Smart Rat, wspólnie pomożemy Ci nauczyć się pisać na klawiaturze, korzystać z myszki, a nawet programować w Pythonie. Zostań mistrzem klawiatury i uratuj świat!"/>
            </section>
            
            <section className='action'>
                <Link className="button" to={'/menu'}>Dalej</Link>
            </section>
        </Scene>
        )
       
}

export default Start

