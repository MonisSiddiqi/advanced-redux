import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  if (!cart.showCart) {
    return null;
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.products.length > 0 ? (
          cart.products.map(({ id, title, quantity, price }) => {
            const total = quantity * price;
            return (
              <CartItem key={id} item={{ id, title, quantity, total, price }} />
            );
          })
        ) : (
          <div>Cart is Empty</div>
        )}
      </ul>
    </Card>
  );
};

export default Cart;
