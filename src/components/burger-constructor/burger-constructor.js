import {ConstructorElement, DragIcon, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css"
import {useState} from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const selectedIngredients = [
    {
       text: "Мини-салат Экзо-Плантаго",
        price: 4400,
        image: "https://code.s3.yandex.net/react/code/salad.png"
    },
    {
        text: "Кристаллы марсианских альфа-сахаридов",
        price: 762,
        image: "https://code.s3.yandex.net/react/code/core.png"
    },
    {
        text: "Говяжий метеорит (отбивная)",
        price: 3000,
        image: "https://code.s3.yandex.net/react/code/meat-04.png"
    },
    {
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        price: 988,
        text: "Филе Люминесцентного тетраодонтимформа"
    },
    {
        text: "Мини-салат Экзо-Плантаго",
        price: 4400,
        image: "https://code.s3.yandex.net/react/code/salad.png"
    },
    {
        text: "Кристаллы марсианских альфа-сахаридов",
        price: 762,
        image: "https://code.s3.yandex.net/react/code/core.png"
    },
    {
        text: "Говяжий метеорит (отбивная)",
        price: 3000,
        image: "https://code.s3.yandex.net/react/code/meat-04.png"
    },
    {
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        price: 988,
        text: "Филе Люминесцентного тетраодонтимформа"
    }
]

const FindSum = () => {
    let ans = 0;
    selectedIngredients.forEach((selectedIngredient) => {
        ans += selectedIngredient.price;
    })
    return ans;
}
function BurgerConstructor() {
    const [openedPopup, setOpenedPopup] = useState(false);
    return(
        <section className={burgerConstructorStyles.order} style={{overflow: 'hidden'}}>
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
                    <p className="text text_type_main-medium">{FindSum()}</p>
                    <CurrencyIcon type={"primary"} />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => setOpenedPopup(true)}>Оформить заказ</Button>
            </div>
            {openedPopup && <Modal setOpenedPopup={setOpenedPopup} openedPopup={openedPopup}>
                <OrderDetails />
            </Modal>}
        </section>
    )
}

export default BurgerConstructor;