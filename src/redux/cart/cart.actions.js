import { CartActionTypes } from "./cart.types";

const { TOGGLE_CART_HIDDEN } = CartActionTypes;

export const toggleCartHidden = () => {
    return {
        type: TOGGLE_CART_HIDDEN
    }
}