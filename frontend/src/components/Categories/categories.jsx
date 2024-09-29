import "./categories.scss";
import { Link } from "react-router-dom";

function Categories({ title = "Kategorie", categories, onCategoryDelete }) {
  function deleteCategory(e, id) {
    e.preventDefault();
    onCategoryDelete(id);
  }

  return (
    <>
      <div className="categories">
        <h2 className="title">{title}</h2>
        <ul className="categories__list">
          {categories
            ? categories.map((category) => (
                <Link
                  key={category.id}
                  to={"/game/" + category.id}
                  style={{ position: "relative" }}
                >
                  <li className="categories__item">{category.icon}</li>
                  {category.isUserDefinedCategory && (
                    <div
                      onClick={(e) => deleteCategory(e, category.id)}
                      className="categories__delete"
                    >
                    +
                    </div>
                  )}
                </Link>
              ))
            : null}
        </ul>
      </div>
    </>
  );
}

export default Categories;
