// src/pages/OrderSuccess.tsx
import { Link, useLocation } from "react-router-dom";

const Confirm = () => {
  const location = useLocation();
  const { total = 0, orderId = "M123456789", bookName = "Sách bất kỳ" } = location.state || {};

  return (
    <div className="bg-gray-50 py-10 px-4 min-h-screen flex flex-col items-center">
      <div className="bg-white rounded shadow p-6 w-full max-w-2xl">
        <div className="bg-blue-100 rounded p-6 text-center">
          <h2 className="text-xl font-bold text-blue-700">Yay, đặt hàng thành công!</h2>
          <p className="mt-2 text-sm text-gray-700">Chuẩn bị tiền mặt {total.toLocaleString()}₫</p>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Phương thức thanh toán</span>
            <span>Thanh toán tiền mặt</span>
          </div>
          <div className="flex justify-between font-bold text-red-600">
            <span>Tổng cộng</span>
            <span>{total.toLocaleString()}₫</span>
          </div>
        </div>

        <Link
          to="/"
          className="block text-center mt-6 border border-blue-600 text-blue-600 rounded py-2 hover:bg-blue-50"
        >
          Quay về trang chủ
        </Link>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Mã đơn hàng: <strong>{orderId}</strong></p>
        <p>Giao thứ 6, trước 13h, 28/03</p>
        <p>{bookName}</p>
      </div>
    </div>
  );
};

export default Confirm;
