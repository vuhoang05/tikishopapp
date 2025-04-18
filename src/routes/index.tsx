import { createBrowserRouter } from "react-router-dom";

import CustomerLayout from "../shared/layout/CustomerLayout";
import HomePage from "../pages/customer/Home";
import BookDetail from "../pages/customer/BookDetail";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cart", element: <Cart /> },
      { path: "books/:id", element: <BookDetail /> },
      { path: "checkout", element: <Checkout /> },
    ]
  },
  // Có thể thêm layout khác cho admin tại đây
]);


export default router;


