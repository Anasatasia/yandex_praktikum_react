import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DELETE_ITEM} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import burgerConstructorItemStyles from "./burger-constructor-item.module.css"
import {useDrag, useDrop} from "react-dnd";
import {useRef} from "react";
import {ingredientPropTypes} from "../../utils/type";
import PropTypes from "prop-types";
function BurgerConstructorItem({item, index, moveItem}) {
    const order = useSelector(state => {return state.order_ingredients})
    const dispatch = useDispatch();
    console.log(item);
    const ref = useRef(null);
    const id = item._id;
    const [, drop] = useDrop({
        accept: 'move_ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverRect = ref.current?.getBoundingClientRect();
            const hoverMidY = (hoverRect.bottom - hoverRect.top)/2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMidY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMidY) return;
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'move_ingredient',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });
    drag(drop(ref))
    return(
        <div ref={ ref } className={burgerConstructorItemStyles.position}>
            <DragIcon type={"primary"} />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => {
                    dispatch({
                        type: DELETE_ITEM,
                        uniqueId: item.uniqueId,
                        sum: order.sum - item.price,
                        item: item
                    })
                }
                }
            />
            {isDragging}
        </div>
    )
}

BurgerConstructorItem.propTypes = {
    item: ingredientPropTypes,
    index: PropTypes.number,
    moveItem: PropTypes.func
}

export default BurgerConstructorItem;