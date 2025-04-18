import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/logo.jfif";
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

const Header = () => {
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

      {/* Main header - Logo | Search & categories | Icon Nav */}
     {/* Khối chứa logo, search, icon NAV - tất cả trên 1 hàng */}  
        <div className="flex items-center justify-between px-6 py-3 space-x-6">
        {/* Logo */}
        <Link to="/">
            <img src={Logo} alt="Logo" className="w-20" />
        </Link>

        {/* Search bar */}
        <div className="flex flex-1 max-w-3xl">
            <input
            type="text"
            placeholder="100% hàng thật"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
            Tìm kiếm
            </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700 text-sm">
            <a href="#" className="flex items-center space-x-1 hover:text-blue-600">
            <FontAwesomeIcon icon={faHouse} />
            <span>Trang chủ</span>
            </a>
           {/* Dropdown Tài khoản */}
            <div className="relative group">
              <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer">
                <FontAwesomeIcon icon={faUser} />
                <span>Tài khoản</span>
              </div>

              {/* Nội dung dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity z-50">
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
              </div>
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

        {/* Categories (một dòng riêng dưới search) */}
        <div className="px-6 pb-2">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {categories.map((item, index) => (
            <a key={index} href="#" className="hover:text-blue-600 capitalize">
                {item}
            </a>
            ))}
        </div>
        </div>

      {/* Commitment bar */}
      <div className="px-6 py-2 border-t border-gray-300 flex flex-wrap items-center gap-6 text-sm text-gray-700">
        <span className=" font-bold text-blue-600">Cam kết</span>
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
