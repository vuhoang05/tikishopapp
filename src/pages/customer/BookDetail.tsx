import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book } from "../../types/book";
import { getBook, getBookById } from "../../services/bookService";
import { useCart } from "../../useContext/CardContext";
import BookCard from "../../shared/components/BoodCard";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionMaxLength = 300;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    getBookById(Number(id)).then((bookData) => {
      setBook(bookData);
      getBook().then((allBooks) => {
        const related = allBooks.filter(
          (b) =>
            b._id !== bookData._id &&
            b.categories?.id === bookData.categories?.id
        );
        setRelatedBooks(related);
      });
    });
  }, [id]);

  if (!book) return <div className="p-6">Đang tải chi tiết sách...</div>;

  const discount = Math.round(
    ((book.original_price - book.current_seller.price) / book.original_price) * 100
  );

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const displayedDescription = isDescriptionExpanded
    ? book.description
    : book.description?.slice(0, descriptionMaxLength) +
      (book.description && book.description.length > descriptionMaxLength ? "..." : "");

  const handleBuyNow = () => {
    const quantity = Number((document.querySelector("input[type=number]") as HTMLInputElement).value);
    addToCart(book, quantity);
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    const quantity = Number((document.querySelector("input[type=number]") as HTMLInputElement).value);
    addToCart(book, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cột trái: ảnh */}
        <div className="w-full lg:w-1/4 bg-white p-2">
          <img
            src={book.images?.[0]?.large_url || "/no-image.png"}
            alt={book.name}
            className="w-full object-contain border border-gray-300 rounded"
          />
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {book.images?.slice(0, 2).map((img, i) => (
              <img
                key={i}
                src={img.thumbnail_url}
                className="w-16 h-20 border border-gray-300 p-1 object-contain"
              />
            ))}
          </div>
          <div className="text-blue-500 mt-2 text-sm underline cursor-pointer">
            Xem tóm tắt nội dung sách
          </div>
        </div>

        {/* Cột giữa: thông tin sách */}
        <div className="flex-1 space-y-3">
          <div className="bg-white p-5">
            <h1 className="text-2xl font-bold">{book.name}</h1>
            <p className="text-sm text-gray-500">
              Tác giả:{" "}
              {book.authors?.map((a) => (
                <span key={a.id} className="text-blue-600">
                  {a.name}
                </span>
              ))}
            </p>

            <div className="flex flex-wrap items-end gap-2 text-xl font-bold text-red-600">
              {book.current_seller.price.toLocaleString()}₫
              <span className="text-sm text-gray-500 font-normal line-through">
                {book.original_price.toLocaleString()}₫
              </span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-[1px] rounded">
                -{discount}%
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Nhà bán:{" "}
              <span className="text-blue-600 font-medium">{book.current_seller.name}</span>
            </p>
          </div>
          <div className="block lg:hidden mt-4 flex flex-col gap-3 bg-white p-4">
            <div className="flex items-center gap-2">
              <span>Số lượng:</span>
              <input
                title="number"
                type="number"
                defaultValue={1}
                min={1}
                className="w-16 px-2 py-1 border rounded border-blue-600"
              />
            </div>
            <button onClick={handleBuyNow} className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600">
              Mua ngay
            </button>
            <button onClick={handleAddToCart} className="w-full border border-blue-600 py-2 rounded hover:bg-gray-100">
              Thêm vào giỏ
            </button>
            <button className="w-full border border-blue-600 py-2 rounded hover:bg-gray-100">
              Mua trước trả sau
            </button>
        </div>

          {/* Thông tin chi tiết */}
          <div className="bg-white p-5">
            <h2 className="text-lg font-semibold mb-2 mt-4">Thông tin chi tiết</h2>
            <div className="text-sm rounded">
              {book.specifications?.[0]?.attributes.map((attr, index) => (
                <div key={index} className="flex items-center py-2 px-4 border-b border-gray-200 last:border-b-0">
                  <div className="w-1/3 text-gray-400">{attr.name}</div>
                  <div className="flex-1">{attr.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mô tả */}
          <div className="mt-6 bg-white p-5">
            <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
            <div
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: displayedDescription || "" }}
            />
            {book.description && book.description.length > descriptionMaxLength && (
              <button onClick={toggleDescription} className="text-blue-500 text-sm text-center mt-2 cursor-pointer">
                {isDescriptionExpanded ? "Thu gọn" : "Xem thêm"}
              </button>
            )}
          </div>

          {/* Sản phẩm liên quan */}
          <div className="mt-6 bg-white p-5">
            <h2 className="text-lg font-semibold mb-2">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedBooks.length > 0 ? (
                relatedBooks.map((relatedBook) => (
                  <BookCard key={relatedBook._id} book={relatedBook} />
                ))
              ) : (
                <p className="text-gray-500 text-sm">Không có sản phẩm liên quan.</p>
              )}
            </div>
          </div>
        </div>

        {/* Cột phải: thao tác */}
        <div className="w-full hidden lg:flex lg:w-1/4 border border-gray-200 p-4 rounded shadow flex flex-col gap-4 bg-white">
          <p className="text-sm text-gray-600">Tạm tính</p>
          <p className="text-2xl text-red-600 font-bold">
            {book.current_seller.price.toLocaleString()}₫
          </p>

          <div className="flex items-center gap-2">
            <span>Số lượng:</span>
            <input
              title="number"
              type="number"
              defaultValue={1}
              min={1}
              className="w-16 px-2 py-1 border rounded border-blue-600"
            />
          </div>

          <button onClick={handleBuyNow} className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600">
            Mua ngay
          </button>
          <button onClick={handleAddToCart} className="w-full border border-blue-600 py-2 rounded hover:bg-gray-100">
            Thêm vào giỏ
          </button>
          <button className="w-full border border-blue-600 py-2 rounded hover:bg-gray-100">
            Mua trước trả sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
