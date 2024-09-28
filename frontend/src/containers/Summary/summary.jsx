import Hint from '../../components/Hint/hint'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {  Link } from "react-router-dom";
import Scene from '../../components/Scene/scene';
import Categories from '../../components/Categories/categories';
import useAPI from '/src/useAPI';


function Summary ({wordsMistakes, words, sentenceMistakes, sentence, sentenceTime}){  

    //const categories = useAPI({url:"categories"})

    return (
        <Scene type="basic"> 
            <section className='info'>
            </section>
        
            <section className='content'>
                
                <Hint left character="cat" text="W co zagramy?"/>
            </section>
            
            <section className='action'>
                <Link className="button" to={'/game'}>koniec</Link>
            </section>
        </Scene>      
        )
}

export default Summary
