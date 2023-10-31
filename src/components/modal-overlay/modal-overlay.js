import modalOverlayStyles from "./modal-overlay.module.css"
import PropTypes from "prop-types";
function ModalOverlay({children}) {
    return(
        <section className={modalOverlayStyles.overlay}>
            {children}
        </section>
    )
}
ModalOverlay.propTypes = {

    children: PropTypes.element

}
export default ModalOverlay;