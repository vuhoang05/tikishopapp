import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faTruck, faTags, faStar } from "@fortawesome/free-solid-svg-icons";
import { Book } from "../../types/book";
import { getBook } from "../../services/bookService";

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  
  const getBooks = async () => {
    const data = await getBook()
    setBooks(data);
  }
  useEffect(() => {
    getBooks();
  }, [])

  const categories = [
    { title: "English Books", img: "https://salt.tikicdn.com/cache/280x280/ts/product/90/56/5d/90c183d6cb1c69616754db8993c09aa0.jpg" },
    { title: "Sách tiếng Việt", img: "https://salt.tikicdn.com/cache/280x280/ts/product/e1/51/f2/f45c1df46e3c6cbf813ed97ec1f0d1ff.jpg" },
    { title: "Văn phòng phẩm", img: "https://salt.tikicdn.com/cache/280x280/ts/product/00/cf/82/3c9a11ff3f2ce5a65e69b7a9aa2efc8e.jpg" },
    { title: "Quà lưu niệm", img: "https://salt.tikicdn.com/cache/280x280/ts/product/69/68/dc/879c6a5f5e26a21d2a4b5e7751588f3e.jpg" },
  ];

  const sidebarItems = [
    {
      title: "Khám phá theo danh mục",
      children: [
        "English Books", "Art & Photography", "Biographies & Memoirs", "Business & Economics",
        "How-to - Self Help", "Children's Books", "Dictionary", "Education - Teaching",
        "Fiction - Literature", "Magazines", "Medical Books", "Parenting & Relationships",
        "Reference", "Science - Technology", "History, Politics & Social Sciences",
        "Travel & Holidays", "Cookbooks, Food & Wine"
      ]
    },
    { title: "Sách tiếng Việt" },
    { title: "Văn phòng phẩm" },
    { title: "Quà lưu niệm" }
  ];

  const products = [
    {
      title: "Sách - Lão Tử Đạo Đức Kinh",
      author: "Ngô Tất Tố",
      price: 69000,
      discount: 30,
      img: "https://salt.tikicdn.com/cache/280x280/ts/product/bf/5a/1a/85286cbbbc0b6f2cfad6b2e9cfa7190a.jpg",
    },
    {
      title: "Cổ Học Tinh Hoa",
      author: "Nguyễn Văn Ngọc",
      price: 119000,
      discount: 29,
      img: "https://salt.tikicdn.com/cache/280x280/ts/product/56/34/47/5944e83dc1dfce01eb65fb91b342b65a.jpg",
    },
    {
      title: "Excel Dùng Trong Văn Phòng",
      author: "Nguyễn Quang Vinh",
      price: 169290,
      discount: 15,
      img: "https://salt.tikicdn.com/cache/280x280/ts/product/24/17/97/c38d71dbb14f8f6972f2322e5033b6a5.jpg",
    },
  ];

  return (
    <div className="bg-gray-100">
        <div className="flex px-6 py-4 gap-5">
        {/* Sidebar */}
            <aside className="w-60 hidden lg:block p-7 bg-white">
                {sidebarItems.map((section, idx) => (
                <div key={idx} className="mb-6">
                    <h3 className="text-sm font-semibold mb-2 text-gray-700">{section.title}</h3>
                    {section.children && (
                    <ul className="space-y-1 text-sm text-gray-600">
                        {section.children.map((item, index) => (
                        <li key={index} className="hover:text-blue-600 cursor-pointer">{item}</li>
                        ))}
                    </ul>
                    )}
                </div>
                ))}
            </aside>

        {/* Main content */}
            <main className="flex-1 ">
                <h1 className="text-xl font-bold mb-4 p-5 bg-white">Nhà Sách Tiki</h1>

                {/* Danh mục nổi bật */}
                <section className="mb-6 p-5 bg-white">
                <h2 className="text-lg font-semibold mb-2">Khám phá theo danh mục</h2>
                <div className="flex gap-4 overflow-x-auto">
                    {categories.map((item, index) => (
                    <div key={index} className="w-40 flex-shrink-0 text-center">
                        <img src={item.img} alt={item.title} className="rounded mb-2 h-28 object-cover mx-auto" />
                        <p>{item.title}</p>
                    </div>
                    ))}
                </div>
                </section>

                {/* Lọc sản phẩm */}
                <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Tất cả sản phẩm</h2>
                <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                    <span className="text-red-500 font-bold">NEW</span>
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faTruck} /> Giao siêu tốc 2H</span>
                    <span className="flex items-center gap-1 text-pink-500 font-semibold"><FontAwesomeIcon icon={faBolt} /> TOP DEAL</span>
                    <span className="text-green-600 font-semibold">FREESHIP XTRA</span>
                    <span className="flex items-center gap-1 text-yellow-500"><FontAwesomeIcon icon={faStar} /> Từ 4 sao</span>
                </div>
                </section>

                {/* Danh sách sản phẩm */}
                <div className="flex flex-wrap -mx-2">
                  {books.map((book) => (
                    <div key={book.id} className="w-1/2 md:w-1/4 px-2 mb-4">
                      <div className="border rounded-lg p-4 hover:shadow-md h-full">
                        <img
                          src={book.images?.[0]?.thumbnail_url || "/no-image.png"}
                          alt={book.name}
                          className="h-48 object-contain mb-2 mx-auto"
                        />
                        <h3 className="font-medium line-clamp-2 mb-1">{book.name}</h3>
                        <p className="text-sm text-gray-500 mb-1">
                          {book.authors?.map((a) => a.name).join(", ")}
                        </p>
                        <p className="text-red-600 font-bold">
                          {book.current_seller?.price?.toLocaleString()}₫
                          {book.original_price > book.current_seller?.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {book.original_price?.toLocaleString()}₫
                            </span>
                          )}
                        </p>
                        <div className="text-xs text-gray-400 mt-1">
                          {book.quantity_sold?.text || ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

            </main>
        </div>
    </div>
  );
};

export default HomePage;