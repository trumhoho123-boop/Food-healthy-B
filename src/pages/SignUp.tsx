import { useState } from "react";
import { apiUrl } from "../lib/api";

type SignUpProps = {
  setCurrentPage: (page: string) => void;
};

function SignUp({ setCurrentPage }: SignUpProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !password) {
      setError("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Đăng ký thất bại (API trả về lỗi):", data);
        throw new Error(data.message || "Đã xảy ra lỗi đăng ký!");
      }

      console.log("Đăng ký tài khoản thành công! Dữ liệu trả về từ API:", data);
      setSuccess("Đăng ký tài khoản thành công! Đang chuyển hướng đăng nhập...");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        setCurrentPage("Login");
      }, 2000);
    } catch (err: any) {
      console.error("Lỗi khi kết nối hoặc xử lý API Register:", err);
      setError(err.message || "Không thể kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="mt-100 login-section">
        <div className="container">
          <div className="row justify-content-center align-items-center px-3">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="item shadow-sm p-4 rounded bg-white">
                <div className="mb-4">
                  <h1>Tạo tài khoản</h1>
                  <p className="text-muted">Đăng ký thành viên để nhận nhiều ưu đãi hơn.</p>
                </div>
                
                {error && <div className="alert alert-danger py-2">{error}</div>}
                {success && <div className="alert alert-success py-2">{success}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="formFirstName" className="form-label">Tên <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 py-2" 
                        id="formFirstName" 
                        placeholder="Nhập Tên" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="formLastName" className="form-label">Họ <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 py-2" 
                        id="formLastName" 
                        placeholder="Nhập Họ" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required 
                      />
                    </div>
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
                      <label htmlFor="formSigninPassword" className="form-label">Mật khẩu <span className="text-danger">*</span></label>
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
                        {loading ? "Đang tạo..." : "Tạo tài khoản"}
                      </button>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Login"); }} className="text-primary">Đã có tài khoản?</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
