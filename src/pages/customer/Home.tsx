import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faTruck, faStar, faBars } from "@fortawesome/free-solid-svg-icons"; // Added faBars
import { Book } from "../../types/book";
import { getBook } from "../../services/bookService";
import BookCard from "../../shared/components/BoodCard";
import { ICategory } from "../../types/category";
import { getCategory } from "../../services/categoryService";

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getBooks = async () => {
    const data = await getBook();
    setBooks(data);
  };
  const getCategories = async () => {
    const data = await getCategory();
    setCategories(data);
  };
  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  const filteredBooks = selectedCategoryId
    ? books.filter((book) => book.categories?.id?.toString() === selectedCategoryId)
    : books;

  return (
    <div className="bg-gray-100">
      <div className="flex gap-5">
        {/* Mobile Menu Button */}
        <div className="hidden p-2">
          <button title="menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-transparent border-none p-0"
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
          {isMobileMenuOpen && (
            <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 p-0" style={{ width: '64%' }}>
              <div className="h-full overflow-y-auto">
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-4 text-gray-800">Danh mục</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className={`cursor-pointer hover:text-blue-600 ${
                          selectedCategoryId === category.id ? "font-bold text-blue-600" : ""
                        }`}
                        onClick={() => {
                          setSelectedCategoryId(
                            selectedCategoryId === category.id ? null : category.id
                          );
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-60 hidden lg:block p-7 bg-white">
          <h3 className="text-base font-semibold mb-4 text-gray-800">Danh mục</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`cursor-pointer hover:text-blue-600 ${
                  selectedCategoryId === category.id ? "font-bold text-blue-600" : ""
                }`}
                onClick={() =>
                  setSelectedCategoryId(
                    selectedCategoryId === category.id ? null : category.id
                  )
                }
              >
                {category.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <h1 className="hidden text-xl font-bold mb-4 p-5 bg-white">Nhà Sách Tiki</h1>

          {/* Danh mục nổi bật */}
          <section className=" hidden mb-6 p-5 bg-white">
            <h2 className="text-lg font-semibold mb-2">Khám phá theo danh mục</h2>
            <div className="flex gap-4 overflow-x-auto">
              {categories.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    setSelectedCategoryId(
                      selectedCategoryId === item.id ? null : item.id
                    )
                  }
                  className="w-40 flex-shrink-0 text-center cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <p className="truncate">{item.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Lọc sản phẩm */}
          <section className="mb-4 px-5 bg-white p-5">
            <h2 className="text-lg font-semibold mb-2">Tất cả sản phẩm</h2>
            <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
              <span className="text-red-500 font-bold">NEW</span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faTruck} /> Giao siêu tốc 2H
              </span>
              <span className="flex items-center gap-1 text-pink-500 font-semibold">
                <FontAwesomeIcon icon={faBolt} /> TOP DEAL
              </span>
              <span className="text-green-600 font-semibold">FREESHIP XTRA</span>
              <span className="flex items-center gap-1 text-yellow-500">
                <FontAwesomeIcon icon={faStar} /> Từ 4 sao
              </span>
            </div>
          </section>

          {/* Danh sách sản phẩm */}
          <div className="flex flex-wrap -mx-2 px-5">
            {filteredBooks.map((book) => (
              <div key={book._id} className="w-1/2 sm:w-1/2 md:w-1/4 px-2 mb-4">
                <BookCard book={book} />
              </div>
            ))}
            {filteredBooks.length === 0 && (
              <p className="text-center text-gray-500 w-full py-8">Không có sản phẩm nào.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
