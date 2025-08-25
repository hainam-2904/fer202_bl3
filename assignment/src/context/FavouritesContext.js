import React, { createContext, useReducer, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

const initialState = [];

function wishlistReducer(state, action) {
  switch (action.type) {
    case "SET_WISHLIST":
      return action.payload || [];
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((i) => i.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const WishlistProvider = ({ children }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [wishlist, dispatch] = useReducer(wishlistReducer, initialState);

  // initialize from auth.user if logged in, otherwise from localStorage
  useEffect(() => {
    if (user && Array.isArray(user.wishlist)) {
      dispatch({ type: "SET_WISHLIST", payload: user.wishlist });
    } else {
      const local = JSON.parse(localStorage.getItem("wishlist")) || [];
      dispatch({ type: "SET_WISHLIST", payload: local });
    }
  }, [user]);

  // persist local-only wishlist to localStorage whenever it changes and user is not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  // Add to wishlist: if logged in -> update account.wishlist on server, else local
  const addToWishlist = async (product) => {
    // avoid duplicates
    if (wishlist.some((i) => i.id === product.id)) return wishlist;

    const newList = [...wishlist, product];

    if (user && updateUser) {
      try {
        // send wishlist as array of product objects
        const updated = await updateUser({ wishlist: newList });
        dispatch({ type: "SET_WISHLIST", payload: updated.wishlist || [] });
        return updated.wishlist;
      } catch (err) {
        console.error("Failed to update wishlist on server", err);
        // fallback to local update
        dispatch({ type: "ADD", payload: product });
        return newList;
      }
    } else {
      dispatch({ type: "ADD", payload: product });
      return newList;
    }
  };

  const removeFromWishlist = async (productId) => {
    const newList = wishlist.filter((i) => i.id !== productId);

    if (user && updateUser) {
      try {
        const updated = await updateUser({ wishlist: newList });
        dispatch({ type: "SET_WISHLIST", payload: updated.wishlist || [] });
        return updated.wishlist;
      } catch (err) {
        console.error("Failed to update wishlist on server", err);
        dispatch({ type: "REMOVE", payload: productId });
        return newList;
      }
    } else {
      dispatch({ type: "REMOVE", payload: productId });
      return newList;
    }
  };

  const clearWishlist = async () => {
    if (user && updateUser) {
      try {
        const updated = await updateUser({ wishlist: [] });
        dispatch({ type: "SET_WISHLIST", payload: [] });
        return updated.wishlist;
      } catch (err) {
        console.error("Failed to clear wishlist on server", err);
        dispatch({ type: "CLEAR" });
        return [];
      }
    } else {
      dispatch({ type: "CLEAR" });
      return [];
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
