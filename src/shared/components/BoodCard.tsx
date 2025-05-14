import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Book } from "../../types/book";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BookCard = ({ book }: { book: Book }) => {
  const hasPrice =
    book.current_seller && typeof book.current_seller.price === "number";
  const hasOriginalPrice =
    typeof book.original_price === "number" && book.original_price > 0;

  const discount =
    hasPrice && hasOriginalPrice
      ? Math.round(
          ((book.original_price - book.current_seller.price) /
            book.original_price) *
            100
        )
      : 0;

  return (
    <Link to={`/books/${book._id}`}>
      <div className="bg-white rounded-lg p-3 h-full relative hover:shadow-lg transition-all">
        {/* Hình ảnh */}
        <div className="relative">
          <img
            src={book.images?.[0]?.thumbnail_url || "/no-image.png"}
            alt={book.name}
            className="h-64 object-contain mx-auto mb-2"
          />
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-1 py-[2px] rounded font-semibold">
            CHÍNH HÃNG
          </div>
        </div>

        {/* Giá */}
        <div className="text-red-600 font-bold text-base">
          {hasPrice
            ? `${book.current_seller.price.toLocaleString()}₫`
            : "Đang cập nhật"}

          {hasOriginalPrice && (
            <span className="text-sm text-gray-500 ml-2 line-through">
              {book.original_price.toLocaleString()}₫
            </span>
          )}

          {discount > 0 && (
            <span className="ml-2 text-xs text-white bg-gray-500 px-1 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Tác giả + tên sách */}
        <div className="text-xs text-gray-600 mt-2">
          {book.authors?.map((a) => a.name).join(", ") || "Không rõ"}
        </div>
        <div className="text-sm font-medium line-clamp-2">{book.name}</div>

        {/* Rating + đã bán */}
        <div className="flex items-center text-xs text-gray-500 mt-1 gap-1 mb-[20px]">
          <span>{book.rating_average || 4.5}</span>
          <FontAwesomeIcon icon={faStar} className="text-amber-300" />
          <span>{book.quantity_sold?.text || "Chưa có dữ liệu"}</span>
        </div>

        {/* Giao siêu tốc */}
        <div className="text-[10px] mt-2 font-bold text-red-500 absolute bottom-3 left-2">
          NOW <span className="text-gray-600 font-normal ml-1">Giao siêu tốc 2h</span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
