import { useState } from "react";
import { apiUrl } from "../lib/api";

type ContactProps = {
  setCurrentPage: (page: string) => void;
};

function Contact({ setCurrentPage: _ }: ContactProps) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !message) {
      setError("Vui lòng điền đầy đủ các thông tin bắt buộc (Tên, Email và Tin nhắn).");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/contacts"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Gọi API Contact thất bại:", data);
        throw new Error(data.message || "Gửi phản hồi thất bại!");
      }

      console.log("Gọi API Contact thành công. Dữ liệu phản hồi:", data);
      setSuccess("Gửi phản hồi thành công! Cảm ơn ý kiến của bạn.");
      setName("");
      setSurname("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error("Lỗi khi kết nối hoặc xử lý API Contact:", err);
      setError(err.message || "Lỗi kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="contact-section">
        <div className="mt-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="#!" onClick={(e) => { e.preventDefault(); _("Home"); }}>Trang chủ</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Liên hệ</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section className="py-5 bg-gray-100 mt-5">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-xs-4 col-md-4 text-center text-md-start mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <i className="bi bi-geo-alt icon" />
                </div>
                <h3 className="h5">Địa chỉ</h3>
                <p className="text-muted"> 123 Đường Chính<br />Hà Nội, Việt Nam<br /><strong>Việt Nam</strong></p>
              </div>
              <div className="col-xs-4 col-md-4 text-center text-md-start mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <i className="bi bi-telephone icon" />
                </div>
                <h3 className="h5">Tổng đài</h3>
                <ul className="list-unstyled text-muted">
                  <li>+33 555 444 333</li>
                  <li>+33 555 444 333</li>
                </ul>
              </div>
              <div className="col-xs-4 col-md-4 text-center text-md-start mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <i className="bi bi-envelope icon" />
                </div>
                <h3 className="h5">Hỗ trợ điện tử</h3>
                <ul className="list-unstyled text-muted">
                  <li>support@example.com</li>
                  <li>hr@example.com</li>
                </ul>
              </div>
            </div>

            <div className="row mt-50">
              <div className="col-md-12 mb-5 mb-md-0">
                <div className="shadow-sm p-4 rounded bg-white">
                  <h4 className="mb-4">Gửi phản hồi cho chúng tôi</h4>

                  {error && <div className="alert alert-danger py-2">{error}</div>}
                  {success && <div className="alert alert-success py-2">{success}</div>}

                  <form className="form" id="contact-form" onSubmit={handleSubmit}>
                    <div className="controls">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-4">
                            <label className="form-label" htmlFor="name">Tên của bạn <span className="text-danger">*</span></label>
                            <input
                              className="form-control bg-light border-0 py-2"
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Nhập tên của bạn"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-4">
                            <label className="form-label" htmlFor="surname">Họ của bạn</label>
                            <input
                              className="form-control bg-light border-0 py-2"
                              type="text"
                              name="surname"
                              id="surname"
                              placeholder="Nhập họ của bạn"
                              value={surname}
                              onChange={(e) => setSurname(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label" htmlFor="email">Email của bạn <span className="text-danger">*</span></label>
                        <input
                          className="form-control bg-light border-0 py-2"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Nhập email của bạn"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label" htmlFor="message">Tin nhắn của bạn <span className="text-danger">*</span></label>
                        <textarea
                          className="form-control bg-light border-0 py-2"
                          rows={4}
                          name="message"
                          id="message"
                          placeholder="Nhập tin nhắn"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contact;
