import {ConstructorElement, DragIcon, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css"
import {useState} from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {selectedIngredients} from "../../utils/constants";

const findSum = () => {
    let ans = 0;
    selectedIngredients.forEach((selectedIngredient) => {
        ans += selectedIngredient.price;
    })
    return ans;
}
function BurgerConstructor() {
    const [openedPopup, setOpenedPopup] = useState(false);
    return(
        <section className={burgerConstructorStyles.order}>
            <div className={burgerConstructorStyles.positions}>
                <div className={burgerConstructorStyles.position}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                </div>
                <div className={burgerConstructorStyles.order__main}>
                    {selectedIngredients.map((item, index) => (
                        <div key={index} className={burgerConstructorStyles.position}>
                            <DragIcon type={"primary"} />
                            <ConstructorElement
                                text={item.text}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    ))}
                </div>
                <div className={burgerConstructorStyles.position}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                </div>
            </div>
            <div className={burgerConstructorStyles.result}>
                <div className={burgerConstructorStyles.price}>
                    <p className="text text_type_main-medium">{findSum()}</p>
                    <CurrencyIcon type={"primary"} />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => setOpenedPopup(true)}>Оформить заказ</Button>
            </div>
            {openedPopup && <Modal closeModal={() => setOpenedPopup(false)} openedPopup={openedPopup}>
                <OrderDetails />
            </Modal>}
        </section>
    )
}

export default BurgerConstructor;