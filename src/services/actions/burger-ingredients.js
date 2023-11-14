import {INGREDIENTS_LIST} from "./index";
import {URL} from "../../utils/constants"
export function getIngredients() {
    return function (dispatch) {
        fetch(URL + "/ingredients")
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => {
                console.log(res)
                dispatch({
                    type: INGREDIENTS_LIST,
                    ingredients: res.data
                })
            })
            .catch(console.error)
    }
}
