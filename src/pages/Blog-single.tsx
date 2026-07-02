type BlogsingleProps = {
  setCurrentPage: (page: string) => void;
};

function Blogsingle({ setCurrentPage: _ }: BlogsingleProps){
    return(
<div>
 
  <main>
    {/* Blog Section */}
    <div className="blog-section">
      <div className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="#!">Trang chủ</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Chi tiết bài viết</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="max-width mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="blog-single px-3 mb-4">
                    <div className="blog-single-img">
                      <img src="./assets/images/blog-2.png" className="w-100" alt="blog" />
                    </div>
                    <div className="blog-single-desc mt-4">
                      <h1 className="blog-title"><a href="#">Bí quyết kết hợp thực phẩm mỗi ngày cho cuộc sống khỏe mạnh hơn</a></h1>
                      <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-1 row-cols-md-1 blog-info mt-4">
                        <div><i className="bi bi-calendar" /><span className="ms-2">12 Tháng 11, 2023</span></div>
                        <div className="d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-person" /><span className="ms-2">Bởi: Devide</span></div>
                        <div className="mt-2 d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-chat" /><span className="ms-2">2 bình luận</span></div>
                      </div>
                      <p className="mt-4">Một chế độ ăn uống cân bằng không chỉ giúp bạn giữ được vóc dáng lý tưởng mà còn tăng cường sức khỏe, phòng chống nhiều loại bệnh tật. Hãy ưu tiên bổ sung đa dạng các loại thực phẩm vào thực đơn như rau củ tươi, các loại hạt dinh dưỡng và protein chất lượng. Việc lắng nghe cơ thể để cân đối giữa các nhóm dưỡng chất chính là chìa khóa để có một năng lượng tràn trề suốt cả ngày dài.</p>
                      <blockquote className="blockquote">
                        <svg viewBox="0 0 512 512" fill="#fff" width={80}  className="quote-icon">
                          <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                        </svg>
                        <p className="quote">Dinh dưỡng đúng cách hôm nay chính là khoản đầu tư sinh lời nhất cho sức khỏe ngày mai.</p>
                      </blockquote>
                      <p className="mt-4">Hãy để mỗi bữa ăn là một trải nghiệm tuyệt vời và đáng nhớ cho cả gia đình bằng việc tự chuẩn bị và nấu nướng những nguyên liệu chất lượng ngay từ hôm nay nhé!</p> 
                    </div>
                    <div className="blog-single-share mt-5">
                      <div className="clear-both d-block d-sm-block d-md-flex d-lg-flex justify-content-between">
                        <div>
                          <p>Thẻ (Tag)</p>
                          <ul className="float-left list-inline tag-option"> 
                            <li className="list-inline-item mb-2"><a href="#">Sức khỏe</a></li>
                            <li className="list-inline-item mb-2"><a href="#">Nấu ăn</a></li>
                            <li className="list-inline-item mb-2"><a href="#">Dinh dưỡng</a></li>
                          </ul>
                        </div>
                        <div>
                          <p>Chia sẻ</p>
                          <ul className="float-right list-inline share-link">
                            <li className="list-inline-item"><a href="#" target="_blank"><span className="bi bi-facebook" /></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><span className="bi bi-twitter" /></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><span className="bi bi-whatsapp" /></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><span className="bi bi-linkedin" /></a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="clear-both" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="comment-area mt-4 mb-5  border-top pt-5">
                      <h4 className="mb-4">2 Bình luận</h4>
                      <ul className="comment-tree list-unstyled">
                        <li className="mb-5 border-bottom pb-3">
                          <div className="comment-area-box">
                            <div className="d-flex">
                              <div className="comment-thumb">
                                <img  src="./assets/images/blog-2.png" className="img-fluid" />
                              </div>
                              <div className="ms-4">
                                <div className="comment-info">
                                  <h5 className="mb-1">Devide</h5>
                                  <span>Vương quốc Anh</span>
                                  <span className="date-comm">| Đăng ngày 7 tháng 5, 2023</span>
                                </div>
                                <div className="comment-content mt-2">
                                  <p>Bài viết rất hữu ích. Cảm ơn bạn!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="mb-5 border-bottom pb-3">
                          <div className="comment-area-box">
                            <div className="d-flex">
                              <div className="comment-thumb">
                                <img  src="./assets/images/blog-1.png" className="img-fluid" />
                              </div>
                              <div className="ms-4">
                                <div className="comment-info">
                                  <h5 className="mb-1">Sarah</h5>
                                  <span>Hoa Kỳ</span>
                                  <span className="date-comm">| Đăng ngày 8 tháng 5, 2023</span>
                                </div>
                                <div className="comment-content mt-2">
                                  <p>Thật tuyệt vời khi được đọc bài viết này.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <form className="comment-form my-5" id="comment-form">
                      <h4 className="mb-4">Viết bình luận</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <input className="form-control bg-light border-0 py-2" type="text" name="name" id="name" placeholder="Tên của bạn:" />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-group">
                            <input className="form-control bg-light border-0 py-2" type="text" name="mail" id="mail" placeholder="Địa chỉ Email:" />
                          </div>
                        </div>
                      </div>
                      <textarea className="form-control mb-4 bg-light border-0 py-2" name="comment" id="comment" cols={30} rows={5} placeholder="Nhập bình luận" spellCheck="false" defaultValue={""} />
                      <button className="btn btn-msg btn-round-full btn-primary" type="submit">Gửi bình luận</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Blog Section */}
  </main>

</div>
)
}
export default Blogsingle