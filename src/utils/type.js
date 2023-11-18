import PropTypes from "prop-types";

export const ingredientPropTypes = PropTypes.shape({
    type: PropTypes.string,
    _id: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
});