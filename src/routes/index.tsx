import { createBrowserRouter } from "react-router-dom";

import CustomerLayout from "../shared/layout/CustomerLayout";
import AdminLayout from "../shared/layout/AdminLayout";
import HomePage from "../pages/customer/Home";
import BookDetail from "../pages/customer/BookDetail";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import BookForm from "../pages/admin/BookForm";
import Login from "../pages/customer/Login";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      { path: "books/:id", element: <BookDetail /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "book", element: <BookForm /> },
    ],
  },
]);
export default router;
