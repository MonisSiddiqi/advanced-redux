import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../../store/cart-slice";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { id, title, price, description } = props;

  const cart = useSelector((state) => state.cart.products);

  const alreadyInCart = cart.find((item) => item.id === id);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(add(props));
  };

  const handleRemoveFromCart = () => {
    dispatch(remove(props));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          {alreadyInCart ? (
            <button className="secondary" onClick={handleRemoveFromCart}>
              Remove from Cart
            </button>
          ) : (
            <button className="primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
