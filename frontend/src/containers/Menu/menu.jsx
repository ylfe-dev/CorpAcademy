import Hint from '../../components/Hint/hint'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {  Link } from "react-router-dom";
import Scene from '../../components/Scene/scene';
import Categories from '../../components/Categories/categories';
import useAPI from '/src/useAPI';


function Menu (){  

    const categories = useAPI({url:"categories"})

    return (
        <Scene type="basic"> 
            <section className='info'>
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
                    <img src="/img/pikarzyki.png" alt="pikarzyki"/>
                </div>
            </div>
        </Scene>      
        )
}

export default Menu
