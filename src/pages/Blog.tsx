type BlogProps = {
  setCurrentPage: (page: string) => void;
};

function Blog({ setCurrentPage: _ }: BlogProps){
    return(
<div>
  {/* Blog Section */}
  <main>
    <div className="blog-section">
      <div className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="#!">Trang chủ</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Bài viết</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* section */}
      {/* section */}
      <section className="mt-5  mb-5">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 mb-5">
              <div className="blog-item">
                <div className="blog-wraper blog-item rounded">
                  <div className="blog-header">
                    <div className="mb-3">
                      <a href="blog-single.html">
                        <div className="img-zoom">
                          <img src="./assets/images/blog-1.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="blog-body pb-4">
                    <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-1 row-cols-md-1 blog-info">
                      <div><i className="bi bi-calendar" /><span className="ms-2">12 Tháng 11, 2023</span></div>
                      <div className="d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-person" /><span className="ms-2">Bởi: Devide</span></div>
                      <div className="mt-2 d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-chat" /><span className="ms-2">0 bình luận</span></div>
                    </div>
                    <div>
                      <h2 className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Bí quyết ăn uống lành mạnh và giữ gìn vóc dáng!</a>
                      </h2>
                      <div className="text-muted mt-3">
                        <a href="#" className="blog-btn">Đọc thêm</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-5">
              <div className="blog-item">
                <div className="blog-wraper blog-item rounded">
                  <div className="blog-header">
                    <div className="mb-3">
                      <a href="blog-single.html">
                        <div className="img-zoom">
                          <img src="./assets/images/blog-2.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="blog-body pb-4">
                    <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-1 row-cols-md-1 blog-info">
                      <div><i className="bi bi-calendar" /><span className="ms-2">12 Tháng 11, 2023</span></div>
                      <div className="d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-person" /><span className="ms-2">Bởi: Devide</span></div>
                      <div className="mt-2 d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-chat" /><span className="ms-2">0 bình luận</span></div>
                    </div>
                    <div>
                      <h2 className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Những cách chọn mua thực phẩm hữu cơ tươi ngon.</a>
                      </h2>
                      <div className="text-muted mt-3">
                        <a href="#" className="blog-btn">Đọc thêm</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-5">
              <div className="blog-item">
                <div className="blog-wraper blog-item rounded">
                  <div className="blog-header">
                    <div className="mb-3">
                      <a href="blog-single.html">
                        <div className="img-zoom">
                          <img src="./assets/images/blog-3.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="blog-body pb-4">
                    <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-1 row-cols-md-1 blog-info">
                      <div><i className="bi bi-calendar" /><span className="ms-2">12 Tháng 11, 2023</span></div>
                      <div className="d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-person" /><span className="ms-2">Bởi: Devide</span></div>
                      <div className="mt-2 d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-chat" /><span className="ms-2">0 bình luận</span></div>
                    </div>
                    <div>
                      <h2 className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Cách phân biệt trái cây sạch và an toàn cho sức khỏe.</a>
                      </h2>
                      <div className="text-muted mt-3">
                        <a href="#" className="blog-btn">Đọc thêm</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-5">
              <div className="blog-item">
                <div className="blog-wraper blog-item rounded">
                  <div className="blog-header">
                    <div className="mb-3">
                      <a href="blog-single.html">
                        <div className="img-zoom">
                          <img src="./assets/images/blog-4.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="blog-body pb-4">
                    <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-1 row-cols-md-1 blog-info">
                      <div><i className="bi bi-calendar" /><span className="ms-2">12 Tháng 11, 2023</span></div>
                      <div className="d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-person" /><span className="ms-2">Bởi: Devide</span></div>
                      <div className="mt-2 d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-chat" /><span className="ms-2">0 bình luận</span></div>
                    </div>
                    <div>
                      <h2 className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Tự tay làm những món sinh tố siêu ngon.</a>
                      </h2>
                      <div className="text-muted mt-3">
                        <a href="#" className="blog-btn">Đọc thêm</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-5">
              <div className="blog-item">
                <div className="blog-wraper blog-item rounded">
                  <div className="blog-header">
                    <div className="mb-3">
                      <a href="blog-single.html">
                        <div className="img-zoom">
                          <img src="./assets/images/blog-5.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="blog-body pb-4">
                    <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-1 row-cols-md-1 blog-info">
                      <div><i className="bi bi-calendar" /><span className="ms-2">12 Tháng 11, 2023</span></div>
                      <div className="d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-person" /><span className="ms-2">Bởi: Devide</span></div>
                      <div className="mt-2 d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-chat" /><span className="ms-2">0 bình luận</span></div>
                    </div>
                    <div>
                      <h2 className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Khám phá lợi ích của chế độ ăn toàn thực vật.</a>
                      </h2>
                      <div className="text-muted mt-3">
                        <a href="#" className="blog-btn">Đọc thêm</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-5">
              <div className="blog-item">
                <div className="blog-wraper blog-item rounded">
                  <div className="blog-header">
                    <div className="mb-3">
                      <a href="blog-single.html">
                        <div className="img-zoom">
                          <img src="./assets/images/blog-6.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="blog-body pb-4">
                    <div className="row row-cols-xl-2 row-cols-lg-2 row-cols-1 row-cols-md-1 blog-info">
                      <div><i className="bi bi-calendar" /><span className="ms-2">12 Tháng 11, 2023</span></div>
                      <div className="d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-person" /><span className="ms-2">Bởi: Devide</span></div>
                      <div className="mt-2 d-none d-sm-none d-md-none d-lg-block"><i className="bi bi-chat" /><span className="ms-2">0 bình luận</span></div>
                    </div>
                    <div>
                      <h2 className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Những cách trang trí món ăn đẹp mắt như nhà hàng.</a>
                      </h2>
                      <div className="text-muted mt-3">
                        <a href="#" className="blog-btn">Đọc thêm</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <nav>
                {/* pagination */}
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link mx-1" href="#" aria-label="Previous">
                      <i className="bi bi-arrow-left-short" />
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link mx-1 active" href="#">1</a></li>
                  <li className="page-item"><a className="page-link mx-1" href="#">2</a></li>
                  <li className="page-item"><a className="page-link mx-1" href="#">...</a></li>
                  <li className="page-item"><a className="page-link mx-1" href="#">12</a></li>
                  <li className="page-item">
                    <a className="page-link mx-1" href="#" aria-label="Next">
                      <i className="bi bi-arrow-right-short" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  {/* End Blog Section */}
 
</div>
)
}
export default Blog