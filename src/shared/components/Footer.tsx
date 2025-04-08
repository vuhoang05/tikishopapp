import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-sm text-gray-700 pt-8 border-t ">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 pb-8">
        {/* Cột 1: Hỗ trợ khách hàng */}
        <div>
          <h3 className="font-semibold mb-2">Hỗ trợ khách hàng</h3>
          <ul className="space-y-1">
            <li>Hotline: <strong className="text-black">1900-6035</strong></li>
            <li>(1000 đ/phút, 8-21h kể cả T7, CN)</li>
            <li>Các câu hỏi thường gặp</li>
            <li>Gửi yêu cầu hỗ trợ</li>
            <li>Hướng dẫn đặt hàng</li>
            <li>Phương thức vận chuyển</li>
            <li>Chính sách kiểm hàng</li>
            <li>Chính sách đổi trả</li>
            <li>Hướng dẫn trả góp</li>
            <li>Chính sách nhập khẩu</li>
            <li>Hỗ trợ: hotro@tiki.vn</li>
            <li>Báo lỗi bảo mật: security@tiki.vn</li>
          </ul>
        </div>

        {/* Cột 2: Về Tiki */}
        <div>
          <h3 className="font-semibold mb-2">Về Tiki</h3>
          <ul className="space-y-1">
            <li>Giới thiệu Tiki</li>
            <li>Tiki Blog</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật thanh toán</li>
            <li>Chính sách bảo mật thông tin cá nhân</li>
            <li>Chính sách giải quyết khiếu nại</li>
            <li>Điều khoản sử dụng</li>
            <li>Giới thiệu Tiki Xu</li>
            <li>Tiếp thị liên kết cùng Tiki</li>
            <li>Bán hàng doanh nghiệp</li>
            <li>Điều kiện vận chuyển</li>
          </ul>
        </div>

        {/* Cột 3: Hợp tác & Chứng nhận */}
        <div>
          <h3 className="font-semibold mb-2">Hợp tác và liên kết</h3>
          <ul className="space-y-1">
            <li>Quy chế hoạt động Sàn GDTMĐT</li>
            <li>Bán hàng cùng Tiki</li>
          </ul>
          <h3 className="font-semibold mt-4 mb-2">Chứng nhận bởi</h3>
          <div className="flex space-x-2">
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg" alt="bct" className="h-8" />
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/dmca.svg" alt="dmca" className="h-8" />
          </div>
        </div>

        {/* Cột 4: Thanh toán & Giao hàng */}
        <div>
          <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              "tiki",
              "visa",
              "mastercard",
              "jcb",
              "atm",
              "momo",
              "zalo",
              "vnpay",
              "tragop",
            ].map((logo, i) => (
              <img
                key={i}
                src={`https://frontend.tikicdn.com/_desktop-next/static/img/payment/${logo}.svg`}
                alt={logo}
                className="h-6"
              />
            ))}
          </div>

          <h3 className="font-semibold mt-4 mb-2">Dịch vụ giao hàng</h3>
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/tikinow.png"
            alt="TikiNOW"
            className="h-8"
          />
        </div>

        {/* Cột 5: Kết nối & App */}
        <div>
          <h3 className="font-semibold mb-2">Kết nối với chúng tôi</h3>
          <div className="flex space-x-3 mb-4">
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/social/facebook.svg" alt="fb" className="h-6" />
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/social/youtube.svg" alt="yt" className="h-6" />
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/social/zalo.svg" alt="zalo" className="h-6" />
          </div>
          <h3 className="font-semibold mb-2">Tải ứng dụng trên điện thoại</h3>
          <div className="flex space-x-2">
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
              alt="AppStore"
              className="h-10"
            />
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
              alt="GooglePlay"
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Thông tin công ty */}
      <div className="border-t py-4 px-6 text-center md:text-left text-xs text-gray-600">
        <p className="font-semibold">Công ty TNHH TIKI</p>
        <p>
          Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh
        </p>
        <p>
          Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư
          TP.HCM cấp lần đầu ngày 06/01/2010.
        </p>
        <p>Hotline: <a href="tel:19006035" className="text-blue-600">1900 6035</a></p>
      </div>

      {/* Thương hiệu nổi bật */}
      <div className="bg-gray-100 text-xs text-gray-500 text-center py-4 px-6">
        Thương Hiệu Nổi Bật:
        <br />
        vascara / dior / estee lauder / barbie / durex / bioderma / elly / skechers /
        nutifood / kindle / wacom / olay / similac / bitas / ...
      </div>
    </footer>
  );
};

export default Footer;
