import orderDetailsStyles from "./order-details.module.css"
import doneIcon from "./../../images/done.png"
function OrderDetails() {
    return(
        <section className={orderDetailsStyles.container}>
            <div className={orderDetailsStyles.title}>
                <p className="text text_type_digits-large">
                    034536
                </p>
                <p className="text text_type_main-medium">
                    идентификатор заказа
                </p>
            </div>
            <img className={orderDetailsStyles.image} src={doneIcon} alt={"Завершенный заказ"}/>
            <div className={orderDetailsStyles.subtitle}>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
        </section>
    )
}

export default OrderDetails;