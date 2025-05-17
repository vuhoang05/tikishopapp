
import { useNavigate } from "react-router-dom";
import { useCart } from "../../useContext/CardContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (bookId: string, value: number) => {
    if (value < 1) return;
    updateQuantity(bookId, value);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.book.current_seller.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <div className="text-gray-600">Chưa có sản phẩm nào trong giỏ.</div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(({ book, quantity }) => (
              <div key={book.id} className="flex items-center justify-between border p-4 rounded bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={book.images?.[0]?.thumbnail_url || "/no-image.png"}
                    alt={book.name}
                    className="w-20 h-28 object-cover border"
                  />
                  <div>
                    <div className="font-semibold">{book.name}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {book.current_seller.price.toLocaleString()}₫
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span>Số lượng:</span>
                      <input title="bum"
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(book._id, Number(e.target.value))
                        }
                        className="w-16 px-2 py-1 border rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-red-600 font-bold">
                    {(book.current_seller.price * quantity).toLocaleString()}₫
                  </p>
                  <button
                    onClick={() => removeFromCart(book._id)}
                    className="text-sm text-blue-500 hover:underline mt-2"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng đơn và chuyển tới thanh toán */}
          <div className="mt-6 text-right">
            <p className="text-lg font-semibold mb-2">
              Tạm tính: <span className="text-red-600">{total.toLocaleString()}₫</span>
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
