import {INGREDIENTS_LIST} from "./index";
import {URL} from "../../utils/constants"
import {checkResponse} from "../../utils/utils";
export function getIngredients() {
    return function (dispatch) {
        fetch(URL + "/ingredients")
            .then(checkResponse)
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
