import "./categories.scss";
import { Link } from "react-router-dom";

function Categories({ title = "Kategorie", categories, onCategoryDelete }) {
  function deleteCategory(e, id) {
    e.preventDefault();
    onCategoryDelete(id);
  }console.log(categories)

  return (
    <>
      <div className="categories">
        <h2 className="title">{title}</h2>
        <ul className="categories__list">
          {categories
            ? categories.map((category) => (
                <Link
                  level={category.currentLevel}
                  className={category.currentLevel>1 ? "level" : ""}
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
