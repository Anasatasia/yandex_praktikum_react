import modalOverlayStyles from "./modal-overlay.module.css"
import PropTypes from "prop-types";
function ModalOverlay({closeModal, children}) {
    function closePopupOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            closeModal();
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