import Hint from "../../components/Hint/hint";
import { Link } from "react-router-dom";
import Scene from "../../components/Scene/scene";
import Categories from "../../components/Categories/categories";
import useAPI from "/src/useAPI";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { fetchFromApi } from "../../useAPI";

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
        <div>
          <label htmlFor="language">Wybierz język: </label>
          <select id="language" value={language} onChange={handleChange}>
            <option value="">--Choose a language--</option>
            <option value="angielski">Angielski</option>
            <option value="francuski">Francuski</option>
            <option value="hiszpański">Hiszpański</option>
            <option value="niemiecki">Niemiecki</option>
          </select>
        </div>
      </section>

      <section className="content">
        {categories.categories ? (
          <>
            <Categories
              categories={predefinedCategories}
              onCategoryDelete={deleteCategory}
            />

            {userDefinedCategories && (
              <Categories
                title={"Twoje kategorie"}
                categories={userDefinedCategories}
                onCategoryDelete={deleteCategory}
              />
            )}

            <button className="button" onClick={() => addCategory()}>
              Dodaj własną kategorie
            </button>
          </>
        ) : (
          <span className="loader loader--medium"></span>
        )}
        <Hint delay="2" left character="cat" text="W co zagramy?" />
      </section>

      <section className="action">
        <Link className="button" to={"/game"}>
          Start Gry
        </Link>
      </section>
    </Scene>
  );
}

export default Menu;
