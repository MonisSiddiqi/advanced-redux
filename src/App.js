import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { getCartDataAction, putCartDataAction } from "./store/cart-action";

let isInitial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.hasChanged) {
      dispatch(putCartDataAction(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </>
  );
}

export default App;
