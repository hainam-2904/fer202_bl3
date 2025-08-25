import React, { createContext, useReducer } from "react";

export const ToastContext = createContext();

const initialState = {
  show: false,
  message: "",
  bg: "success",
};

function toastReducer(state, action) {
  switch (action.type) {
    case "SHOW_TOAST":
      return { show: true, message: action.payload.message, bg: action.payload.bg || "success" };
    case "HIDE_TOAST":
      return { ...state, show: false };
    default:
      return state;
  }
}

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const showToast = (message, bg = "success") => {
    dispatch({ type: "SHOW_TOAST", payload: { message, bg } });
  };
  const hideToast = () => dispatch({ type: "HIDE_TOAST" });

  return (
    <ToastContext.Provider value={{ state, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
