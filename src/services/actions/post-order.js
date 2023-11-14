import {ORDER_NUMBER, RESET_ORDER} from "./index";

import {URL} from "../../utils/constants"
export function postOrder(ingredientsList, buns) {
    let ingredientsListId = [];
    ingredientsList.forEach((item) => {
        ingredientsListId.push(item._id);
    })
    ingredientsListId.push(buns._id);
    return function (dispatch) {
        fetch(URL + "/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'ingredients': ingredientsListId})
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(res => {
                if (res.success) {
                    console.log(res);
                    dispatch({
                        type: ORDER_NUMBER,
                        order_number: res.order.number
                    })
                }
            })
            .then(() => {
                dispatch({
                    type: RESET_ORDER
                })
            })
            .catch(console.error)
    }
}