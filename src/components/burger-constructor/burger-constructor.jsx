import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css"
import {useCallback, useState} from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {CURRENT_BURGER, MOVE_INGREDIENT, ORDER} from "../../services/actions";
import {postOrder} from "../../services/actions/post-order";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor() {
    const order = useSelector(state => {return state.order_ingredients})
    const dispatch = useDispatch();
    const makeOrder = () => {
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
            item.uniqueId = uuidv4() //unique;
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
    const closeIngredientModal = () => {
        dispatch({
            type: CURRENT_BURGER,
            current_burger: {}
        });
        setOpenedPopup(false);
    }
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
                        <BurgerConstructorItem moveItem={moveItem} key={item.uniqueId} item={item} index={index}/>
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
                <Button htmlType="button" type="primary" size="large" onClick={makeOrder}>Оформить заказ</Button>
            </div>
            {openedPopup && <Modal closeModal={closeIngredientModal}>
                <OrderDetails />
            </Modal>}
        </section>
    )
}

export default BurgerConstructor;