import ingredientDetailsStyles from "./ingredient-details.module.css"
import PropTypes from "prop-types";
function IngredientDetails({image, name, calories, carbohydrates, fat, proteins}) {
    return(
        <section className={ingredientDetailsStyles.details}>
            <p style={{textAlign: "left", width: "100%"}} className="text text_type_main-large">Детали ингредиента</p>
            <img className={ingredientDetailsStyles.image} src={image} alt={name}/>
            <p className="text text_type_main-medium">{name}</p>
            <div className={ingredientDetailsStyles.descriptions}>
                <div className={ingredientDetailsStyles.description}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{calories}</p>
                </div>
                <div className={ingredientDetailsStyles.description}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
                </div>
                <div className={ingredientDetailsStyles.description}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{fat}</p>
                </div>
                <div className={ingredientDetailsStyles.description}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
                </div>
            </div>
        </section>
    )
}

IngredientDetails.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
}

export default IngredientDetails;