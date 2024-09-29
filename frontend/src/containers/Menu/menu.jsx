import Hint from "../../components/Hint/hint";
import { Link } from "react-router-dom";
import Scene from "../../components/Scene/scene";
import Categories from "../../components/Categories/categories";
import useAPI from "/src/useAPI";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../UserContext";
import { fetchFromApi } from "../../useAPI";
import './menu.scss'

function Menu() {
    const [data, setData] = useAPI({ url: "categories" });
    const user = useContext(UserContext);
    const [language, setLanguage] = useState(user.current.learnedLanguage);
    const gameplay = useRef(getGameplay());


    useEffect(()=>{
        console.log(data)
        console.log("❌");
    },[data])

    const handleChange = (event) => {
        setLanguage(event.target.value);
        user.current.learnedLanguage = event.target.value;
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
  data?.categories?.filter((c) => !c.isUserDefinedCategory) ?? [];

  const userDefinedCategories =
  data?.categories?.filter((c) => c.isUserDefinedCategory) ?? [];

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
            <label htmlFor="gb">
              <img src="./img/flags/gb.svg" width="40" alt="gb" />
            </label>
            <input
                type="radio"
                value="francuski"
                checked={language === "francuski"}
                onChange={handleChange}
                name="language"
                id="fr"
              />
            <label htmlFor="fr">
              <img src="./img/flags/fr.svg" width="40" alt="fr" />
            </label>
            <input
                type="radio"
                value="hiszpański"
                checked={language === "hiszpański"}
                onChange={handleChange}
                name="language"
                id="es"
              />
            <label htmlFor="es">
              <img src="./img/flags/es.svg" width="40" alt="es" />
            </label>
            <input
                type="radio"
                value="niemiecki"
                checked={language === "niemiecki"}
                onChange={handleChange}
                name="language"
                id="de"
              />
            <label htmlFor="de">
              <img src="./img/flags/de.svg" width="40" alt="de" />
            </label>
          </div>
        </div>
      </section>

      <section className="content">
        {data?.categories ? (
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
        {gameplay.current.sentences && gameplay.current.sentences.length ? 
            <Link className="button" to={"/game"}>
            Dokończ {gameplay.current.sentences.length} gry!
            </Link>
        : null}
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



const getGameplay = () => {
    try {
        const last_sentences = JSON.parse(localStorage.getItem("sentences"));
        return last_sentences
    } catch(error){
        console.error(error)
        return null;
    }
}
