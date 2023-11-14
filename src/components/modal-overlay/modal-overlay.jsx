import modalOverlayStyles from "./modal-overlay.module.css"
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {CURRENT_BURGER} from "../../services/actions";
function ModalOverlay({closeModal, children}) {
    const deleteCurrentBurger = useDispatch();
    function closePopupOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            closeModal();
            deleteCurrentBurger({
                type: CURRENT_BURGER,
                current_burger: {}
            })
        }
    }
    return(
        <section className={modalOverlayStyles.overlay} onClick={closePopupOverlay}>
            {children}
        </section>
    )
}
ModalOverlay.propTypes = {
    children: PropTypes.element
}
export default ModalOverlay;