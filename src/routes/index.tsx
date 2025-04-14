import { createBrowserRouter } from "react-router-dom";

import CustomerLayout from "../shared/layout/CustomerLayout";
import HomePage from "../pages/customer/Home";
import BookDetail from "../pages/customer/BookDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "books/:id", element: <BookDetail /> },
    ]
  },
  // Có thể thêm layout khác cho admin tại đây
]);

export default router;
