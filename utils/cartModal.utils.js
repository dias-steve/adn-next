import { setShowCartModal } from "../redux/CartModal/cartModal.actions";

export const handleSetShowCartModal = (show, dispatch) => {
    dispatch(
        setShowCartModal(show)
    )
}