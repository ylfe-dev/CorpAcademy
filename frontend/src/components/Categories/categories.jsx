import { useEffect, useState } from 'react';
import './categories.scss'

function Categories ({ categories }){
    return (
        <>
            <div className="categories">
                <h2>Kategorie</h2>

                <ul className="categories__list">
                    {categories.map((category, index) => <li className="categories__item" key={index}>{category.name}</li>)}
                </ul>
            </div>
        </>
    )
}

export default Categories