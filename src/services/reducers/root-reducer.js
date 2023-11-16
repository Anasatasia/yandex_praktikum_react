import {
    CURRENT_BURGER, DELETE_ITEM,
    INGREDIENTS_LIST, MOVE_INGREDIENT,
    ORDER, ORDER_NUMBER, RESET_ORDER
} from "../actions";

import {initialState} from "../initial-state";

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case INGREDIENTS_LIST:
            return {
                ...state,
                ingredients: action.ingredients
            }
        case CURRENT_BURGER:
            return {
                ...state,
                current_burger: action.current_burger
            }
        case ORDER:
            return {
                ...state,
                order_ingredients: {
                    counts: {
                        ...state.order_ingredients.counts,
                        [state.order_ingredients.buns._id]: action.item.type === "bun" ? 0 : 1,
                        [action.item._id]: action.item.type === "bun" ? 1 : (state.order_ingredients.counts[action.item._id] || 0 ) + 1
                    },
                    buns: action.buns,
                    ingredients: action.order_ingredients,
                    sum: action.sum
                }
            }
        case RESET_ORDER: {
            return {
                ...state,
                order_ingredients: {
                    counts: {},
                    buns: {},
                    ingredients: [],
                    sum: 0
                }
            }
        }
        case ORDER_NUMBER: {
            return {
                ...state,
                order_number: action.order_number
            }
        }
        case DELETE_ITEM:
            return {
                ...state,
                order_ingredients: {
                    ...state.order_ingredients,
                    ingredients: [...state.order_ingredients.ingredients].filter(item => item.uniqueId !== action.uniqueId),
                    sum: action.sum,
                    counts: {
                        ...state.order_ingredients.counts,
                        [action.item._id]: state.order_ingredients.counts[action.item._id] - 1
                    }
                }
            }
        case MOVE_INGREDIENT:
            const prevItems = [...state.order_ingredients.ingredients];
        prevItems.splice(action.toIndex, 0,prevItems.splice(action.fromIndex,1)[0]);
            return {
                ...state,
                order_ingredients: {
                    ...state.order_ingredients,
                    ingredients: prevItems
                }
            }
        default:
            return state
    }
}
export default rootReducer;