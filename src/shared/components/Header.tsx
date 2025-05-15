import { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jfif";
import { useAuth } from "../../useContext/AuthContext";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

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
        <div className="flex items-center space-x-6 text-gray-700 text-sm">
          <Link to="/" className="flex items-center space-x-1 hover:text-blue-600">
            <FontAwesomeIcon icon={faHouse} />
            <span>Trang chủ</span>
          </Link>

          {/* Tài khoản */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer">
              <FontAwesomeIcon icon={faUser} />
              <span>{isLoggedIn ? user?.email : "Tài khoản"}</span>
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                {isLoggedIn ? (
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="border-l h-6" />
          <Link to="/cart" className="relative hover:text-blue-600">
            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Danh mục */}
      <div className="px-6 pb-2">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {categories.map((item, index) => (
            <a key={index} href="#" className="hover:text-blue-600 capitalize">
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Cam kết */}
      <div className="px-6 py-2 border-t border-gray-300 flex flex-wrap items-center gap-6 text-sm text-gray-700">
        <span className="font-bold text-blue-600">Cam kết</span>
        {commitmentItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-1">
            <FontAwesomeIcon icon={item.icon} className="text-blue-600" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
