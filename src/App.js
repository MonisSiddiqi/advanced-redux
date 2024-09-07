import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { showNotification } from "./store/notification-slice";

let isInitial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(
      showNotification({
        status: "pending",
        title: "Fetching...",
        message: "Fetching cart data",
      })
    );

    const fetchData = async () => {
      await fetch(process.env.REACT_APP_FIREBASE_DATABASE_URL, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      dispatch(
        showNotification({
          status: "success",
          title: "Success",
          message: "Fetched cart data successfully",
        })
      );
    };

    fetchData().catch((err) =>
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed",
        })
      )
    );
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
