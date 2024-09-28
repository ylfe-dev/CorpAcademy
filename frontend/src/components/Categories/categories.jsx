import './categories.scss'
import { Link } from "react-router-dom";

function Categories({ categories }) {
    console.log(categories)
    return (
        <>
            <h2 className="title">Kategorie</h2>
            <div className="categories">
                <ul className="categories__list">
                    {categories ? categories.map(category => <Link key={category.id} to={'/game/' + category.id}><li className="categories__item">{category.icon}</li></Link>)
                        : null}
                </ul>

            </div>
        </>
    )
}

export default Categories