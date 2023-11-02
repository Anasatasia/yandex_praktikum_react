import React from 'react';
import burgerIngredientStyle from "./burger-ingredient.module.css"
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
function BurgerIngredient({onClick, name, image, price}) {
    return(
        <section className={burgerIngredientStyle.ingredient} onClick={onClick}>
            <div className={burgerIngredientStyle.counter}>
                <Counter count={1} size={"default"} extraClass="m-1"/>
            </div>
            <img className={burgerIngredientStyle.image} alt={name} src={image}/>
            <div className={burgerIngredientStyle.price}>
                <p className="text text_type_main-default">{price}</p>
                <CurrencyIcon type={"primary"} />
            </div>
            <p className="text text_type_main-default">{name}</p>
        </section>
    )
}

BurgerIngredient.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    onClick: PropTypes.func
};

export default BurgerIngredient;