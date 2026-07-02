  function Footer(){
    return(
    <>
  {/* Footer Section */}
  <footer className="mt-100">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 mb-4 mb-md-0">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-12">
              <div className="footer_logo">
                <img loading="lazy" src="./assets/images/logo.png" className="logo" alt="cửa hàng" />
              </div>
              <div className="mt-4">
                <p>Lorem ipsum, hay còn được gọi là lipsum, là đoạn văn bản giả được sử dụng trong việc thiết kế bố cục in ấn, đồ họa hoặc thiết kế web.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-12">
              <div className="footer_newsletter pe-lg-5">
                <h4 className="text-uppercase">Bản tin</h4>
                <div className="input-group">
                  <input id="searchInput" className="form-control w-50" type="text" placeholder="Địa chỉ email của bạn" />
                  <button type="button" className="btn btn-primary bg-gradient">Đăng ký</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-3 mb-md-0">
          <div className="row">
            <div className="col-6">
              <div className="footer_menu">
                <h4 className="footer_title">Tài khoản của tôi</h4>
                <ul className="m-0 p-0 list-unstyled">
                  <li><a href="#">Đơn hàng</a></li>
                  <li><a href="#">Yêu thích</a></li>
                  <li><a href="#">Theo dõi đơn hàng</a></li>
                  <li><a href="#">Quản lý tài khoản</a></li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="footer_menu">
                <h4 className="footer_title">Thông tin</h4>
                <ul className="m-0 p-0 list-unstyled">
                  <li><a href="#">Về chúng tôi</a></li>
                  <li><a href="#">Chính sách đổi trả</a></li>
                  <li><a href="#">Chính sách bảo mật</a></li>
                  <li><a href="#">Câu hỏi thường gặp</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="footer_download">
            <div className="row">
              <div className="col-lg-6 col-lg-12">
                <h4 className="footer_title">Liên hệ</h4>
                <div className="footer_contact">
                  <p>
                    <span className="icn"><i className="bi bi-geo-alt" /></span>
                    Công ty Widgetify <br />
                    456 Đại lộ Gadget 
                    Techtown, TX 67890 <br />
                    Hoa Kỳ
                  </p>
                  <p className="phn">
                    <span className="icn"><i className="bi bi-telephone" /></span>
                    (987) 654-3210, (555) 123-4567
                  </p>
                  <p className="eml">
                    <span className="icn"><i className="bi bi-envelope" /></span>
                    info@example.com
                  </p>
                </div>
              </div>
              <div className="footer_social col-lg-6 col-lg-12">
                <div className="footer_icon d-flex mt-1">
                  <a href="#" className="facebook pe-3"><i className="bi bi-facebook" /></a>
                  <a href="#" className="twitter pe-3"><i className="bi bi-twitter" /></a>
                  <a href="#" className="instagram pe-3"><i className="bi bi-instagram" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* End Footer Section */}
  </>
    )
}
export default Footer