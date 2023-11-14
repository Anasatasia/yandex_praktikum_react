import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css"
import {useCallback, useState} from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {MOVE_INGREDIENT, ORDER} from "../../services/actions";
import {postOrder} from "../../services/actions/post-order";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

function BurgerConstructor() {
    const order = useSelector(state => {return state.order_ingredients})
    const dispatch = useDispatch();
    const makeOrder = (dispatch) => {
        dispatch(postOrder(order.ingredients, order.buns));
        setOpenedPopup(true);
    }
    const moveItem = useCallback((dragIdx, idx) => {
        dispatch({
            type: MOVE_INGREDIENT,
            toIndex: idx,
            fromIndex: dragIdx
        })
    }, [dispatch])
    const [{ isOver }, dropRef] = useDrop({
        accept: 'ingredient',
        drop: (item) => {
            let max_index = 0;
            order.ingredients.forEach((item) => {
                max_index = Math.max(max_index, item.index_in_order + 1);
            })
            item.index_in_order = max_index;
            dispatch({
                type: ORDER,
                sum: order.sum + (item.type === "bun" ? (2 * item.price - (Object.keys(order.buns).length !== 0 ? 2 * order.buns.price : 0)) : item.price),
                buns: item.type === "bun" ? item : order.buns,
                order_ingredients: item.type === "bun" ? [...order.ingredients] : [...order.ingredients, item],
                item: item

            })
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    const [openedPopup, setOpenedPopup] = useState(false);
    return(
        <section className={burgerConstructorStyles.order}>
            <div className={burgerConstructorStyles.positions} ref={dropRef}>
                <div className={burgerConstructorStyles.position}>
                    {Object.keys(order.buns).length !== 0 && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={order.buns.name + ' верх'}
                        price={order.buns.price}
                        thumbnail={order.buns.image}
                    />}
                </div>
                <div className={burgerConstructorStyles.order__main}>
                    {order.ingredients.map((item, index) => (
                        <BurgerConstructorItem moveItem={moveItem} key={index} item={item} index={index}/>
                    ))}
                </div>
                <div className={burgerConstructorStyles.position}>
                    {Object.keys(order.buns).length !== 0 && <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={order.buns.name + ' низ'}
                        price={order.buns.price}
                        thumbnail={order.buns.image}
                    />}
                </div>
                {isOver}
            </div>
            <div className={burgerConstructorStyles.result}>
                <div className={burgerConstructorStyles.price}>
                    <p className="text text_type_main-medium">{order.sum}</p>
                    <CurrencyIcon type={"primary"} />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => makeOrder(dispatch)}>Оформить заказ</Button>
            </div>
            {openedPopup && <Modal closeModal={() => setOpenedPopup(false)} openedPopup={openedPopup}>
                <OrderDetails />
            </Modal>}
        </section>
    )
}

export default BurgerConstructor;