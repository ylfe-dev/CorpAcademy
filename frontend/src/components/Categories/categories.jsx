import { useEffect, useState } from 'react';
import './categories.scss'
import {  Link } from "react-router-dom";

function Categories ({ categories }){
    console.log(categories)
    return (
        <>
            <div className="categories">
                <h2>Kategorie</h2>
                <ul className="categories__list">
                    {categories ? categories.map(category => <Link key={category.id} to={'/game/'+category.id}><li className="categories__item">{category.icon}</li></Link>)
                    : null}
                </ul>
                
            </div>
        </>
    )
}

export default Categories