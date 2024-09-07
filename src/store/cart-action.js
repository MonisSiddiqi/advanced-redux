import { replaceCart } from "./cart-slice";
import { showNotification } from "./notification-slice";

export const putCartDataAction = (payload) => {
  return (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Fetching...",
        message: "Fetching cart data",
      })
    );

    const putCartData = async () => {
      const { hasChanged, ...payloadWithoutHasChanged } = payload;

      await fetch(process.env.REACT_APP_FIREBASE_DATABASE_URL, {
        method: "PUT",
        body: JSON.stringify(payloadWithoutHasChanged),
      });

      dispatch(
        showNotification({
          status: "success",
          title: "Success",
          message: "Fetched cart data successfully",
        })
      );
    };

    putCartData().catch((err) =>
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed",
        })
      )
    );
  };
};

export const getCartDataAction = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      const response = await fetch(process.env.REACT_APP_FIREBASE_DATABASE_URL);
      const data = response.json();
      return data;
    };

    try {
      const data = await fetchCartData();
      dispatch(replaceCart(data));
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Failed",
          message: "Fetching cart data failed",
        })
      );
    }

    fetchCartData().catch((error) => {
      dispatch(
        showNotification({
          status: "error",
          title: "Failed",
          message: "Fetching cart data failed",
        })
      );
    });
  };
};
