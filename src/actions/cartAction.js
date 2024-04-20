import { cartService } from "../service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const types = {
  GET_CART_ITEMS: "GET_CART_ITEMS",
  SET_IS_LOADING: "SET_IS_LOADING",
};

const addToCart = ({ userId, item }) => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });

    try {
      const state = getState();
      let cart = JSON.parse(await AsyncStorage.getItem("carts")) || [];
      const existingItemIndex = cart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.userId === userId
      );
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].count += 1;
      } else {
        const newCartItem = {
          userId,
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          count: 1, // Initialize count to 1 for new items
        };
        cart.push(newCartItem);
      }

      // Update AsyncStorage
      await AsyncStorage.setItem("carts", JSON.stringify(cart));

      // Dispatch the updated cart items to Redux store
      dispatch({
        type: types.GET_CART_ITEMS,
        payload: cart,
      });

      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    } catch (error) {
      console.error("Error while adding item:", error);
      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    }
  };
};

const removeFromCart = ({ foodId, userId }) => {
  return async (dispatch) => {
    try {
      let cart = JSON.parse(await AsyncStorage.getItem("carts")) || [];

      // Find the index of the item to be removed in the cart array
      const itemIndex = cart.findIndex(
        (cartItem) => cartItem.id === foodId && cartItem.userId === userId
      );

      // If the item exists in the cart, remove it
      if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.count > 1) {
          // If count is greater than 1, decrease count by one
          item.count--;
        } else {
          // If count is 1, remove the item from the cart array
          cart.splice(itemIndex, 1);
        }

        // Save the updated cart to AsyncStorage
        await AsyncStorage.setItem("carts", JSON.stringify(cart));

        // Dispatch the updated cart items to Redux store
        dispatch({
          type: types.GET_CART_ITEMS,
          payload: cart,
        });
      }
    } catch (error) {
      console.error("Error while removing item:", error);
    }
  };
};

const getCartItems = () => {
  return (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    cartService
      .getCartItems()
      .then((cartResponse) => {
        dispatch({
          type: types.GET_CART_ITEMS,
          payload: cartResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

export default { types, addToCart, removeFromCart, getCartItems };
