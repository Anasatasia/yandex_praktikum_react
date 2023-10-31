import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css"
import {useEffect} from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
const modalRoot = document.getElementById("react-modals");

function Modal({setOpenedPopup, openedPopup, children}) {
    function closePopupByEsc(evt) {
        if (evt.key === "Escape") {
            setOpenedPopup(false)
        }
    }
    useEffect(() => {
        if (openedPopup) {
            window.addEventListener("keydown", closePopupByEsc)
        }
        else {
            window.removeEventListener("keydown", closePopupByEsc)
        }
    }, [openedPopup])
    return ReactDOM.createPortal(
        (
            <>
                {openedPopup &&
                    <ModalOverlay>
                        <section className={modalStyles.popup}>
                            <div className={modalStyles.popup__button}>
                                <CloseIcon type={"primary"} onClick={() => setOpenedPopup(false)}/>
                            </div>
                            {children}
                        </section>
                    </ModalOverlay>
                }
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    setOpenedPopup: PropTypes.func,
    openedPopup: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
        ]
    ),
    children: PropTypes.element

}
export default Modal;