import { User } from "../types/user";
import instance from "./apiService";
// Interface phản hồi sau khi đăng nhập
export interface AuthResponse {
  token: string;
  user: User;
}
// Đăng ký
export const register = async (
  email: string,
  password: string,
  role: string = "user"
): Promise<void> => {
  await instance.post("/auth/register", { email, password, role });
};

// Đăng nhập
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res: AuthResponse = await instance.post("/auth/login", { email, password });

  localStorage.setItem("accessToken", res.token);
  localStorage.setItem("user", JSON.stringify(res.user)); // res.user phải chứa fullName, phone, address...
  return res;
};
// Đăng xuất
export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

// Lấy token
export const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

// Lấy thông tin người dùng hiện tại
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) as User : null;
};
// Kiểm tra đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
