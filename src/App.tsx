
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";
import { CartProvider } from "./useContext/CardContext";
import { AuthProvider } from "./useContext/AuthContext";
function App(){
  return(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
  )
}

export default App;