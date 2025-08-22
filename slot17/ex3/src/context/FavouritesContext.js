import React, { createContext, useReducer } from "react";

export const FavouritesContext = createContext();

const initialState = {
  favourites: [],
};

function favouritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVOURITE":
      // tránh add trùng sản phẩm
      if (state.favourites.some((f) => f.id === action.payload.id)) {
        return state;
      }
      return { ...state, favourites: [...state.favourites, action.payload] };

    case "REMOVE_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.filter((f) => f.id !== action.payload),
      };

    case "CLEAR_FAVOURITES":
      return { ...state, favourites: [] };

    default:
      return state;
  }
}

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  const addToFavourites = (product) => {
    dispatch({ type: "ADD_FAVOURITE", payload: product });
  };

  const removeFromFavourites = (id) => {
    dispatch({ type: "REMOVE_FAVOURITE", payload: id });
  };

  const clearFavourites = () => {
    dispatch({ type: "CLEAR_FAVOURITES" });
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites: state.favourites,
        addToFavourites,
        removeFromFavourites,
        clearFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
