import { createBrowserRouter } from "react-router-dom";

import CustomerLayout from "../shared/layout/CustomerLayout";
import HomePage from "../pages/customer/Home";
import BookDetail from "../pages/customer/BookDetail";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import AdminLayout from "../shared/layout/AdminLayout";
import BookForm from "../pages/admin/BookForm";
import Login from "../pages/customer/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      { path: "books/:id", element: <BookDetail /> },
      { path: "checkout", element: <Checkout /> },
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "book", element: <BookForm /> },
      
      
    ]
  },
  // Có thể thêm layout khác cho admin tại đây
]);


export default router;


