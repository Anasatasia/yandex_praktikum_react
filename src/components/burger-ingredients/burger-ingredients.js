import React, {useEffect, useState} from 'react';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import ingredientsStyle from "./burger-ingredients.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
const URL = "https://norma.nomoreparties.space/api/ingredients ";

function getIngredients() {
    return fetch(URL)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
}


function BurgerIngredients() {
    const [currentBurger, setCurrentBurger] = useState(null);
    const [buns, setBuns] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [mains, setMains] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
            .then((data) => setIngredients(data.data))
            .catch(console.error)
    }, [])

    useEffect(() => {
        setBuns(ingredients.filter((item) => item.type === 'bun'))
        setSauces(ingredients.filter((item) => item.type === 'sauce'))
        setMains(ingredients.filter((item) => item.type === 'main'))
    }, [ingredients])

    const [current, setCurrent] = React.useState('one')
    return(
        <section className={ingredientsStyle.ingredients}>
            <div className={ingredientsStyle.navigation__container}>
                <p className="text text_type_main-large">
                    Соберите бургер
                </p>
                <nav className={ingredientsStyle.navigation}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </nav>
            </div>
            <section className={ingredientsStyle.ingredients__container}>
                <div>
                    <p className="text text_type_main-medium">Булки</p>
                    <section className={ingredientsStyle.list}>
                        {buns.length > 0 && buns.map((bun) => (
                            <BurgerIngredient onClick={() => setCurrentBurger(bun)} key={bun._id} {...bun}/>))}
                    </section>
                </div>
                <div>
                    <p className="text text_type_main-medium">Соусы</p>
                    <section className={ingredientsStyle.list}>
                        {sauces.length > 0 && sauces.map((sauce) => (
                            <BurgerIngredient onClick={() => setCurrentBurger(sauce)} key={sauce._id} {...sauce}/>))}
                    </section>
                </div>
                <div>
                    <p className="text text_type_main-medium">Начинки</p>
                    <section className={ingredientsStyle.list}>
                        {mains.length > 0 && mains.map((main) => (
                            <BurgerIngredient onClick={() => setCurrentBurger(main)} key={main._id} {...main}/>))}
                    </section>
                </div>
            </section>
            {currentBurger && <Modal openedPopup={currentBurger} closeModal={() => {setCurrentBurger(false)}}>
                <IngredientDetails  image={currentBurger.image} name={currentBurger.name} calories={currentBurger.calories} carbohydrates={currentBurger.carbohydrates}
                                    fat={currentBurger.fat} proteins={currentBurger.proteins}
                />
            </Modal>}
        </section>
    )
}

export default BurgerIngredients;