
import { useState } from "react";
import { useCart } from "../../useContext/CardContext";
import { useAuth } from "../../useContext/AuthContext";

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState("fast");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const shippingFee = shippingMethod === "fast" ? 25000 : 16000;
  const shippingDiscount = shippingMethod === "fast" ? 25000 : 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.current_seller.price * item.quantity,
    0
  );

  const voucherDiscount = 59000; // giả lập mã giảm giá trực tiếp
  const total = subtotal + shippingFee - voucherDiscount - shippingDiscount;

  const handleOrder = () => {
    alert("Đặt hàng thành công!");
    clearCart();
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Col left (2/3) */}
      <div className="md:col-span-2 space-y-6">
        {/* Hình thức giao hàng */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="font-semibold text-lg mb-4">Chọn hình thức giao hàng</h2>
          <label className="flex items-center gap-3 mb-3">
            <input
              type="radio"
              checked={shippingMethod === "fast"}
              onChange={() => setShippingMethod("fast")}
            />
            <span>NOW Giao siêu tốc 2h -25K</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={shippingMethod === "save"}
              onChange={() => setShippingMethod("save")}
            />
            <span>Giao tiết kiệm -16K</span>
          </label>

          {/* Danh sách sản phẩm */}
          <div className="mt-4 border-t pt-4">
            {cartItems.map((item) => (
              <div key={item.book._id} className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={item.book.images?.[0]?.thumbnail_url || "/no-image.png"}
                    alt={item.book.name}
                    className="w-12 h-16 border"
                  />
                  <div>
                    <div className="font-medium text-sm">{item.book.name}</div>
                    <div className="text-xs text-gray-500">SL: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-red-500 font-semibold text-sm">
                  {(item.book.current_seller.price * item.quantity).toLocaleString()}₫
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hình thức thanh toán */}
        <div className="bg-white p-5 rounded shadow">
          
          <h2 className="font-semibold text-lg mb-4">Chọn hình thức thanh toán</h2>
          <label className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>Thanh toán tiền mặt</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={paymentMethod === "viettel"}
              onChange={() => setPaymentMethod("viettel")}
            />
            <span>Viettel Money</span>
          </label>
        </div>
      </div>

      {/* Col right (1/3) */}
      <div className="bg-white p-5 rounded shadow space-y-4">
        {/* Thông tin người nhận */}
      <div className="text-sm leading-relaxed border-t pt-4">
        <div className="font-semibold">
          {user?.fullName || "Chưa có tên"}{" "}
          <span className="text-gray-500 ml-2">{user?.phone || "Chưa có số điện thoại"}</span>
        </div>
        <div>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs mr-2">
            Văn phòng
          </span>
          {user?.address || "Chưa có địa chỉ"}
        </div>
      </div>

        <h2 className="font-semibold text-lg">Đơn hàng</h2>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Tổng tiền hàng</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển</span>
            <span>{shippingFee.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Giảm giá trực tiếp</span>
            <span>-{voucherDiscount.toLocaleString()}₫</span>
          </div>
          {shippingDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Giảm giá vận chuyển</span>
              <span>-{shippingDiscount.toLocaleString()}₫</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-semibold text-red-600">
            <span>Tổng tiền thanh toán</span>
            <span>{total.toLocaleString()}₫</span>
          </div>
        </div>
        <button
          onClick={handleOrder}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default Checkout;
