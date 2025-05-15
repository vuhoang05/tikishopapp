import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../useContext/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();


  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await login(email, password);
    loginSuccess(res.user, res.token); // <-- cập nhật Context
    navigate("/");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
      alert("Sai email hoặc mật khẩu");
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl flex">
        {/* Form bên trái */}
        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-xl font-semibold mb-2">Đăng nhập bằng email</h2>
          <p className="text-sm text-gray-500 mb-4">
            Nhập email và mật khẩu tài khoản Tiki
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="abc@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-3"
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-1"
              required
            />
            <div className="text-right text-sm text-blue-500 mb-4 cursor-pointer">
              Quên mật khẩu?
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white rounded py-2 w-full font-semibold hover:bg-red-600"
            >
              Đăng nhập
            </button>
          </form>

          <div className="text-center text-sm mt-4">
            Chưa có tài khoản?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 font-medium cursor-pointer"
            >
              Tạo tài khoản
            </span>
          </div>
        </div>

        {/* Ảnh/Promo bên phải */}
        <div className="hidden sm:flex flex-col items-center justify-center w-1/2 bg-[#f5f5fa] p-6">
          <img
            src="/tiki-bot.png"
            alt="Tiki bot"
            className="w-28 h-28 object-contain mb-2"
          />
          <p className="text-center text-sm text-blue-600 font-semibold">
            Mua sắm tại Tiki
            <br />
            Siêu ưu đãi mỗi ngày
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
