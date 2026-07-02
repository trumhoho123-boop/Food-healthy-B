type ForgotProps = {
  setCurrentPage: (page: string) => void;
};

function Forgot({ setCurrentPage }: ForgotProps){
    return(
<main>
  {/* section */}
  <section className="mt-100 login-section">
    <div className="container">
      {/* row */}
      <div className="row justify-content-center align-items-center px-3">
        {/* col */}
        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="item">
            <div className="mb-1">
              <h1>Quên mật khẩu?</h1>
              <p>Vui lòng cung cấp địa chỉ email liên kết với tài khoản của bạn, chúng tôi sẽ gửi liên kết qua email để đặt lại mật khẩu.</p>
            </div>
            <form>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="formForgetEmail" className="form-label">Địa chỉ Email</label>
                  <input type="email" className="form-control bg-light border-0 py-2" id="formForgetEmail" placeholder="Nhập Email" required />
                </div>
                <div className="col-12 d-flex justify-content-between mt-4">
                  {/* Sau khi reset, có thể chuyển về trang Login */}
                  <button type="button" onClick={() => setCurrentPage('Login')} className="btn btn-primary px-4">Đặt lại mật khẩu</button>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('Login'); }} className="btn btn-light px-4">Quay lại</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
)
}
export default Forgot