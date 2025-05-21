import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCartShopping,
  faCheckCircle,
  faTruckFast,
  faRotate,
  faBoxOpen,
  faTag,
  faBars, // Added for mobile menu
  faTimes, // Added for mobile menu close
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jfif";
import { useAuth } from "../../useContext/AuthContext";
import { useCart } from "../../useContext/CardContext";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const categories = [
    "điện gia dụng",
    "xe cộ",
    "mẹ & bé",
    "khỏe đẹp",
    "nhà cửa",
    "sách",
    "thể thao",
    "harry potter",
    "lịch treo tường 2024",
    "nguyễn nhật ánh",
  ];

  const commitmentItems = [
    { icon: faCheckCircle, text: "100% hàng thật" },
    { icon: faTruckFast, text: "Freeship mọi đơn" },
    { icon: faRotate, text: "Hoàn 200% nếu hàng giả" },
    { icon: faBoxOpen, text: "30 ngày đổi trả" },
    { icon: faTruckFast, text: "Giao nhanh 2h" },
    { icon: faTag, text: "Giá siêu rẻ" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Consider it large screen if width is >= 1024px
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-300">
      {/* Freeship banner */}
      <div className="bg-green-100 text-center text-sm text-green-700 py-1">
        Freeship đơn từ 45k, giảm nhiều hơn cùng{" "}
        <span className="text-blue-600 font-bold">FREESHIP XTRA</span>
      </div>

      {/* Main header */}
      <div className="flex items-center justify-between px-6 py-3 space-x-6">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-20" />
        </Link>

        {/* Mobile Menu Button */}
        {!isLargeScreen && (
          <button title="."
            className="lg:hidden" // Hide on large screens
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="text-xl text-gray-700" />
          </button>
        )}

        {/* Search */}
        <div className="flex flex-1 max-w-3xl">
          <input
            type="text"
            placeholder="Tìm sản phẩm"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
            Tìm kiếm
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 text-gray-700 text-sm"> {/* Reduced space-x */}
          <Link to="/" className="hidden md:flex items-center space-x-1 hover:text-blue-600">
            <FontAwesomeIcon icon={faHouse} />
            <span className="">Trang chủ</span>
          </Link>

          {/* Tài khoản */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="hidden md:flex items-center space-x-1 hover:text-blue-600 cursor-pointer">
              <FontAwesomeIcon icon={faUser} />
              <span className="hidden md:inline">{isLoggedIn ? user?.email : "Tài khoản"}</span>
            </div>

            {showDropdown && (
              <div className="absolute right-0 w-40 bg-white border rounded shadow-md z-50">
                {isLoggedIn ? (
                  <>
                  <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >Profile</Link>
                  {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    Admin page
                  </Link>
                )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    Đăng xuất
                  </button>
                  </>
                  
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Giỏ hàng */}
          <div className="">
            <Link to="/cart" className="relative hover:text-blue-600">
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 z-50 flex">
          <div className="bg-white w-64 h-full transform transition-transform duration-300 ease-in-out">
            {/* Mobile Menu Header */}
            <div className="flex justify-end p-4">
              <button title="mob" onClick={() => setIsMobileMenuOpen(false)}>
                <FontAwesomeIcon icon={faTimes} className="text-xl text-gray-700" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="px-4 space-y-4">
              <div className="border-b border-gray-300 pb-4">
                <h2 className="text-lg font-semibold text-gray-800">Danh mục</h2>
                <div className="flex flex-col gap-2">
                  {categories.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="hover:text-blue-600 capitalize text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h2 className="text-lg font-semibold text-gray-800">Tài khoản</h2>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false); // Close menu on logout
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Đăng xuất
                    </button>
                    <br/>
                    <Link
                      to="/profile"
                      className="hover:text-blue-600 text-gray-700"
                    > Profile</Link>
                  </>
                  
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="hover:text-blue-600 text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)} // Close menu
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="hover:text-blue-600 text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)} // Close menu
                    >
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 hover:text-blue-600 text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu
                >
                  <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                  <span>Giỏ hàng</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Danh mục (Desktop) */}
      {isLargeScreen && (
        <div className="px-6 pb-2">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {categories.map((item, index) => (
              <a key={index} href="#" className="hover:text-blue-600 capitalize">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Cam kết */}
    <div className="px-4 py-2 border-t border-gray-300 flex items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-700">
      <span className="font-bold text-blue-600 whitespace-nowrap">Cam kết</span>
      {commitmentItems.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <FontAwesomeIcon icon={item.icon} className="text-blue-600 text-[13px]" />
          <span className="truncate">{item.text}</span>
        </div>
      ))}
    </div>

    </header>
  );
};

export default Header;
