import React, {useEffect, useRef, useState} from 'react';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import ingredientsStyle from "./burger-ingredients.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {CURRENT_BURGER} from "../../services/actions";

function BurgerIngredients() {
    const currentBurger = useDispatch();
    const [openedPopup, setOpenedPopup] = useState(null);
    const [buns, setBuns] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [mains, setMains] = useState([]);
    const ingredients = useSelector(state => {
        return state.ingredients
    });
    const [currentTab, setCurrentTab] = useState('bun');
    const ingredientsRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const handleScroll = () => {
        const bunDistance = Math.abs(ingredientsRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
        const sauceDistance = Math.abs(ingredientsRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
        const mainDistance = Math.abs(ingredientsRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
        const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
        const currentHeader = minDistance === bunDistance ? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
        setCurrentTab(prevState => (currentHeader === prevState.current ? prevState.current : currentHeader))
    }
    useEffect(() => {
        setBuns(ingredients.filter((item) => item.type === 'bun'))
        setSauces(ingredients.filter((item) => item.type === 'sauce'))
        setMains(ingredients.filter((item) => item.type === 'main'))
    }, [ingredients])

    return(
        <section className={ingredientsStyle.ingredients}>
            <div className={ingredientsStyle.navigation__container}>
                <p className="text text_type_main-large">
                    Соберите бургер
                </p>
                <nav className={ingredientsStyle.navigation}>
                    <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
                        Начинки
                    </Tab>
                </nav>
            </div>
            <section ref={ingredientsRef} onScroll={handleScroll} className={ingredientsStyle.ingredients__container}>
                <div id={"bun"}>
                    <p ref={bunRef} className="text text_type_main-medium">Булки</p>
                    <section className={ingredientsStyle.list}>
                        {buns.length > 0 && buns.map((bun) => (
                            <BurgerIngredient onClick={() => {currentBurger({
                                type: CURRENT_BURGER,
                                current_burger: bun
                            });
                                setOpenedPopup(true);}} key={bun._id} {...bun}/>))}
                    </section>
                </div>
                <div id={"sauce"}>
                    <p ref={sauceRef} className="text text_type_main-medium">Соусы</p>
                    <section className={ingredientsStyle.list}>
                        {sauces.length > 0 && sauces.map((sauce) => (
                            <BurgerIngredient onClick={() => {
                                currentBurger({
                                type: CURRENT_BURGER,
                                        current_burger: sauce
                            }
                                );
                            setOpenedPopup(true)}} key={sauce._id} {...sauce}/>))}
                    </section>
                </div>
                <div id={"main"}>
                    <p ref={mainRef} className="text text_type_main-medium">Начинки</p>
                    <section className={ingredientsStyle.list}>
                        {mains.length > 0 && mains.map((main) => (
                            <BurgerIngredient onClick={() => {currentBurger({
                                type: CURRENT_BURGER,
                                current_burger: main
                            });
                                setOpenedPopup(true);}} key={main._id} {...main}/>))}
                    </section>
                </div>
            </section>
            {openedPopup && <Modal closeModal={() => {setOpenedPopup(false)}}>
                <IngredientDetails />
            </Modal>}
        </section>
    )
}

export default BurgerIngredients;