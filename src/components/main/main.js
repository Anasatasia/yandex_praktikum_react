import React from 'react';
import mainStyles from "./main.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
function Main() {
    return (
        <main className={mainStyles.main}>
            <BurgerIngredients></BurgerIngredients>
            <BurgerConstructor></BurgerConstructor>
        </main>
        )
}

export default Main;