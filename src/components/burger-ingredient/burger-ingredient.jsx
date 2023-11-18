import React from 'react';
import burgerIngredientStyle from "./burger-ingredient.module.css"
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
function BurgerIngredient({onClick, name, image, price, type, _id}) {
    const [{ isDragging }, dragRef] = useDrag({
        type: "ingredient",
        item: { type, name, image, price, _id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    const counts = useSelector(state => {
        return state.order_ingredients.counts[_id]
    })
    return(
        <section className={burgerIngredientStyle.ingredient} onClick={onClick} ref={dragRef}>
            {(counts !== 0) && (counts !== undefined) && <div className={burgerIngredientStyle.counter}>
                    <Counter count={counts} size={"default"} extraClass="m-1"/>
                </div>}
            <img className={burgerIngredientStyle.image} alt={name} src={image}/>
            <div className={burgerIngredientStyle.price}>
                <p className="text text_type_main-default">{price}</p>
                <CurrencyIcon type={"primary"} />
            </div>
            <p className="text text_type_main-default">{name}</p>
            {isDragging}
        </section>
    )
}

BurgerIngredient.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    onClick: PropTypes.func,
    type: PropTypes.string,
    _id: PropTypes.string
};

export default BurgerIngredient;