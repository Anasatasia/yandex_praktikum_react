import ingredientDetailsStyles from "./ingredient-details.module.css"
import {useSelector} from "react-redux";
function IngredientDetails() {
    const currentBurger = useSelector(state => {
        return state.current_burger
    })
    return(
        <section className={ingredientDetailsStyles.details}>
            <p className={"text text_type_main-large " + ingredientDetailsStyles.title}>Детали ингредиента</p>
            <img className={ingredientDetailsStyles.image} src={currentBurger.image} alt={currentBurger.name}/>
            <p className="text text_type_main-medium">{currentBurger.name}</p>
            <div className={ingredientDetailsStyles.descriptions}>
                <div className={ingredientDetailsStyles.description}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{currentBurger.calories}</p>
                </div>
                <div className={ingredientDetailsStyles.description}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{currentBurger.proteins}</p>
                </div>
                <div className={ingredientDetailsStyles.description}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{currentBurger.fat}</p>
                </div>
                <div className={ingredientDetailsStyles.description}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{currentBurger.carbohydrates}</p>
                </div>
            </div>
        </section>
    )
}
export default IngredientDetails;