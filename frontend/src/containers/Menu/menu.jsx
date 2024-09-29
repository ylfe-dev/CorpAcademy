import Hint from "../../components/Hint/hint";
import { Link } from "react-router-dom";
import Scene from "../../components/Scene/scene";
import Categories from "../../components/Categories/categories";
import useAPI from "/src/useAPI";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { fetchFromApi } from "../../useAPI";
import './menu.scss'

function Menu() {
  const categories = useAPI({ url: "categories" });
  const user = useContext(UserContext);
  const [language, setLanguage] = useState(user.state.learnedLanguage);

  const handleChange = (event) => {
    setLanguage(event.target.value);

    user.state.learnedLanguage = event.target.value;
  };

  async function deleteCategory(id) {
    await fetchFromApi({ url: "categories/" + id, user, method: "DELETE" });
    window.location.reload();
  }

  async function addCategory() {
    const categoryName = prompt("Podaj nazwę kategorii");

    if (!categoryName) {
      console.log("❌ no category name provided");
      return;
    }

    await fetchFromApi({
      url: "categories",
      user,
      method: "POST",
      data: { name: categoryName },
    });
    window.location.reload();
  }

  const predefinedCategories =
    categories.categories?.filter((c) => !c.isUserDefinedCategory) ?? [];

  const userDefinedCategories =
    categories.categories?.filter((c) => c.isUserDefinedCategory) ?? [];

  return (
    <Scene type="basic">
      <section className="info">
        <div className="change-language">
          <h4>Wybierz język: </h4>
          <div className="change-language__list">
          <input
                type="radio"
                value="angielski"
                checked={language === "angielski"}
                onChange={handleChange}
                name="language"
                id="gb"
              /> 
            <label for="gb">
              🇬🇧
            </label>
            <input
                type="radio"
                value="francuski"
                checked={language === "francuski"}
                onChange={handleChange}
                name="language"
                id="fr"
              />
            <label for="fr">
              🇫🇷
            </label>
            <input
                type="radio"
                value="hiszpański"
                checked={language === "hiszpański"}
                onChange={handleChange}
                name="language"
                id="es"
              />
            <label for="es">
              🇪🇸
            </label>
            <input
                type="radio"
                value="niemiecki"
                checked={language === "niemiecki"}
                onChange={handleChange}
                name="language"
                id="de"
              />
            <label for="de">
              🇩🇪
            </label>
          </div>
        </div>
      </section>

      <section className="content">
        {categories.categories ? (
          <>
            <Categories
              categories={predefinedCategories}
              onCategoryDelete={deleteCategory}
            />

            {userDefinedCategories.length > 0 && (
              <Categories
                title={"Twoje kategorie"}
                categories={userDefinedCategories}
                onCategoryDelete={deleteCategory}
              />
            )}

            <button className="button" onClick={() => addCategory()}>
              + Dodaj
            </button>
          </>
        ) : (
          <span className="loader loader--medium"></span>
        )}
        <Hint delay="2" left character="cat" text="W co zagramy?" />
      </section>

      <section className="action">
        {/* <Link className="button" to={"/game"}>
          Start Gry
        </Link> */}
      </section>

      <div className="background">
      <div className="pikarzyki shadow">
          <img src="/img/pikarzyki.png" alt="smart rat" />
        </div>
      </div>
    </Scene>
  );
}

export default Menu;
