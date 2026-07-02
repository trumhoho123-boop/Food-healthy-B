type AboutProps = {
  setCurrentPage: (page: string) => void;
};

function About({ setCurrentPage: _ }: AboutProps){
    return(
<main>
  <div className="contact-section">
    <div className="mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* breadcrumb */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="#!">Trang chủ</a></li>
                <li className="breadcrumb-item active" aria-current="page">Về chúng tôi</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-100 mt-5">
      <div className="container">
        <div className="text-center">
          <h1>Về chúng tôi</h1>
        </div>
        <div className="mt-100">
          <div className="row">
            <div className="col-lg-5 shine">
              <img src="./assets/images/teamwork.png" className="about-img" alt="about" />
            </div>
            <div className="col-lg-7">
              <div className="about-details mt-3">
                <div className="about-short-des mt-4">
                  <p>Chúng tôi tự hào là nhà cung cấp thực phẩm sạch hàng đầu, mang đến cho khách hàng những sản phẩm tươi ngon và bổ dưỡng nhất. Sứ mệnh của chúng tôi là nâng cao chất lượng cuộc sống thông qua việc cung cấp thực phẩm an toàn, có nguồn gốc rõ ràng và thân thiện với môi trường. Chúng tôi tin rằng một bữa ăn ngon bắt đầu từ những nguyên liệu chất lượng.</p>
                  <p>Với đội ngũ nhân viên tâm huyết và giàu kinh nghiệm, chúng tôi cam kết kiểm soát chặt chẽ từ khâu nuôi trồng, thu hoạch đến chế biến và vận chuyển. Mỗi sản phẩm đến tay người tiêu dùng đều là kết tinh của sự tận tâm và trách nhiệm. Hãy để chúng tôi đồng hành cùng bạn trong mỗi bữa ăn, góp phần xây dựng một lối sống khỏe mạnh và bền vững cho cả gia đình.</p>
                </div>
              </div>
            </div>
          </div>     
        </div>
        {/* Feature Section */}
        <div className="feature-section mt-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="white-bg">
                  <div className="row">
                    <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3">
                      <div className="feature-item">
                        <div className="feature-icon">
                          <img src="./assets/images/icon/delivery-truck.png" className="w-100" alt="biểu tượng xe tải giao hàng" />
                        </div>
                        <div className="feature-info pt-3 ps-2">
                          <h4>Giao hàng miễn phí</h4>
                          <p>Cho đơn hàng trên&nbsp;<strong>$50.</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3">
                      <div className="feature-item">
                        <div className="feature-icon">
                          <img src="./assets/images/icon/loan.png" className="w-100" alt="biểu tượng hoàn tiền" />
                        </div>
                        <div className="feature-info pt-3 ps-2">
                          <h4>Hoàn tiền</h4>
                          <p>Hoàn tiền trong 7 ngày.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3">
                      <div className="feature-item">
                        <div className="feature-icon">
                          <img src="./assets/images/icon/credit-card.png" className="w-100" alt="biểu tượng thẻ tín dụng" />
                        </div>
                        <div className="feature-info pt-3 ps-2">
                          <h4>Thanh toán an toàn</h4>
                          <p>Thanh toán an toàn 100%.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3">
                      <div className="feature-item">
                        <div className="feature-icon">
                          <img src="./assets/images/icon/customer-service.png" className="w-100" alt="biểu tượng dịch vụ khách hàng" />
                        </div>
                        <div className="feature-info pt-3 ps-2">
                          <h4>Hỗ trợ trực tuyến</h4>
                          <p>Đảm bảo chất lượng sản phẩm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Feature Section */}
      </div>
    </div>
  </div> 
</main>

)
}
export default About;