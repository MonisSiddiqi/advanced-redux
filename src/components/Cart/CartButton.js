import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { toggleCart } from "../../store/cart-slice";

const CartButton = (props) => {
  const cart = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cart.length}</span>
    </button>
  );
};

export default CartButton;
