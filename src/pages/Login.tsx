import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { apiUrl } from "../lib/api";

type LoginProps = {
  setCurrentPage: (page: string) => void;
};

function Login({ setCurrentPage }: LoginProps) {
  const loginUser = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const emailNormalized = email.trim();

    if (!emailNormalized || !password) {
      setError("Vui lòng nhập đầy đủ Email và Mật khẩu.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailNormalized, password }),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        console.error("Đăng nhập thất bại (API trả về lỗi):", data);
        throw new Error(
          response.status === 502
            ? "Không kết nối được Backend Server. Hãy chạy npm run dev ở thư mục gốc rồi thử lại."
            : data.message || "Tài khoản hoặc mật khẩu không đúng!"
        );
      }

      console.log("Đăng nhập thành công! Thông tin User nhận từ API:", data);
      setSuccess("Đăng nhập thành công!");
      loginUser(data.user);

      setTimeout(() => {
        if (String(data.user.role).toLowerCase() === "admin") {
          setCurrentPage("Admin");
        } else {
          setCurrentPage("Home");
        }
      }, 1000);
    } catch (err: any) {
      console.error("Lỗi khi kết nối hoặc xử lý API Login:", err);
      setError(err.message || "Lỗi kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="mt-100 login-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-sm-4 mb-4">
              <div className="item shadow-sm p-4 rounded bg-white">
                <div className="mb-4">
                  <h1>Đăng nhập</h1>
                  <p className="text-muted">Nếu bạn đã có tài khoản, vui lòng đăng nhập.</p>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {success && <div className="alert alert-success py-2">{success}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="formSigninEmail" className="form-label">Email<span className="text-danger">*</span></label>
                      <input 
                        type="email" 
                        className="form-control bg-light border-0 py-2" 
                        id="formSigninEmail" 
                        placeholder="Nhập Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="formSigninPassword" className="form-label">Mật khẩu<span className="text-danger">*</span></label>
                      <input 
                        type="password" 
                        className="form-control bg-light border-0 py-2" 
                        id="formSigninPassword" 
                        placeholder="Nhập mật khẩu" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary px-4"
                        disabled={loading}
                      >
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                      </button>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('Forgot'); }} className="text-primary">Quên mật khẩu?</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="item shadow-sm p-4 rounded bg-white h-100 d-flex flex-column justify-content-between">
                <div className="mb-4">
                  <h2>Khách hàng mới</h2>
                  <p className="text-muted">Đăng ký tài khoản để trải nghiệm mua sắm tuyệt vời hơn! Tận hưởng thanh toán nhanh hơn, lưu nhiều địa chỉ nhận hàng và dễ dàng theo dõi đơn đặt hàng của bạn.</p>
                </div>
                <div>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('SignUp'); }} className="btn btn-primary btn-top">Tạo tài khoản</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
