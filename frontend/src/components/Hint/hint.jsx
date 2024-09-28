import { useEffect, useState } from 'react';
import './hint.scss'

function Hint ({text, character}){

    return (
        <div className={"hint " + (character == "cat" ? "" : "hint--reverse" )}>
            <div className={characteData(character).class}>
                <img src={characteData(character).src} alt={characteData(character).alt} />
                    <b noise={characteData(character).noise}></b>
                </div>
                <div className='hint__text'><span>{text}</span>
            </div>
        </div>
    )
}

export default Hint

const characteData = (name) => {
    switch(name){
        case "cat": return {src:"./img/fat%20cat%20face.png", noise:"meow", alt:"fat cat face", class:"fat-cat-face"};
        case "rat": return {src:"./img/smart%20rat%20face.png", noise:"pi", alt:"smart rat face", class:"smart-rat-face"};
        default: return {src:"./img/fat%20cat%20face.png", noise:"meow", alt:"fat cat face", class:"fat-cat-face"};
    }
}
