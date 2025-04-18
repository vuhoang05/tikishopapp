
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";
import { CartProvider } from "./useContext/CardContext";
function App(){
  return(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
  )
}

export default App;