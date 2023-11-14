import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css"
import {useEffect} from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {CURRENT_BURGER} from "../../services/actions";
import {useDispatch} from "react-redux";
const modalRoot = document.getElementById("react-modals");

function Modal({closeModal, children}) {
    const deleteCurrentBurger = useDispatch();
    useEffect(() => {
        function closePopupByEsc(evt) {
            if (evt.key === "Escape") {
                closeModal();
                deleteCurrentBurger({
                    type: CURRENT_BURGER,
                    current_burger: {}
                })
            }
        }
        window.addEventListener("keydown", closePopupByEsc);
        return () => {
            window.removeEventListener("keydown", closePopupByEsc);
        };
    }, []);
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay closeModal={closeModal}>
                    <section className={modalStyles.popup}>
                        <div className={modalStyles.popup__button}>
                            <CloseIcon type={"primary"} onClick={() => {
                                closeModal();
                                deleteCurrentBurger({
                                    type: CURRENT_BURGER,
                                    current_burger: {}
                                });
                            }}/>
                        </div>
                        {children}
                    </section>
                </ModalOverlay>
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    setOpenedPopup: PropTypes.func,
    children: PropTypes.element

}
export default Modal;