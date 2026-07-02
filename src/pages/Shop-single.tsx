import { useState, useEffect } from "react";
import type { Product, ShopsingleProps } from "../types/product";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";

function Shopsingle({ product, setCurrentPage }: ShopsingleProps) {
  // Default product data (Apple) if no product is passed
  const defaultProduct: Product = {
    id: 1,
    name: "Táo",
    price: 32,
    originalPrice: 35,
    discount: 20,
    rating: 4.5,
    reviews: 30,
    images: [
      "./assets/images/product/Apple-first.png",
      "./assets/images/product/Apple-second.png",
      "./assets/images/product/apple-third.png",
      "./assets/images/product/apple-four.png"
    ],
    description: "Fresh and juicy apples",
    weight: "150 Grams",
    type: "Vegetarian",
    brand: "TemplateRise",
    packageQuantity: 1,
    manufacturer: "TemplateRise",
    netQuantity: "340.0 Gram",
    dimensions: "9.6 x 7.49 x 18.49 cm"
  };

  const displayProduct = product || defaultProduct;

  // Store and state for cart
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(displayProduct, quantity);
    useToastStore.getState().showToast("Sản phẩm đã được thêm vào giỏ hàng!", "success");
  };

  useEffect(() => {
    // Fix lỗi owl-carousel cho phần sản phẩm liên quan
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      setTimeout(() => {
        if ($.fn.owlCarousel) {
          $('.product-slider').owlCarousel('destroy').owlCarousel({ margin: 20, loop: false, responsive: { 0: { items: 2 }, 600: { items: 3 }, 1000: { items: 4 } }});
        }
      }, 150);
    }
  }, []);

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill" />);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half" />);
    }
    return stars;
  };

  return (
    <div>
      <div className="product-details">
        <main>
          <div className="mt-4">
            <div className="container">
              {/* row */}
              <div className="row">
                {/* col */}
                <div className="col-12">
                  {/* breadcrumb */}
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                        <a href="#" onClick={() => setCurrentPage("Home")}>Trang chủ</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#" onClick={() => setCurrentPage("Shop")}>Trái cây</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        {displayProduct.name}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <section className="mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-xl-5 pe-lg-50">
                  <div className="border rounded" id="product-img-active">
                    <img
                      src={displayProduct.images[0]}
                      className="w-100 rounded"
                      alt={displayProduct.name}
                    />
                  </div>
                  <div className="product-tools mt-3">
                    <div
                      className="thumbnails row g-3 slider-nav"
                      id="productThumbnails"
                      aria-label="Carousel Pagination"
                    >
                      {displayProduct.images.map((image, index) => (
                        <div key={index} className="col-3">
                          <div className="thumbnails-img border rounded">
                            <img
                              src={image}
                              className="w-100 rounded"
                              alt={`${displayProduct.name} - Image ${index + 1}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-xl-7">
                  <div className="ps-lg-10 mt-5 mt-md-0">
                    <h1 className="mb-1">{displayProduct.name}</h1>
                    <div className="mb-4">
                      <small className="text-warning">
                        {renderStars(displayProduct.rating)}
                      </small>
                      <a href="#" className="ms-2 text-decoration-none text-muted">
                        ({displayProduct.reviews} đánh giá)
                      </a>
                    </div>
                    <div className="fs-4">
                      <span className="fw-bold text-dark">${displayProduct.price}</span>
                      <span className="text-muted">
                        <s>${displayProduct.originalPrice}</s>
                      </span>
                      <span>
                        <small className="fs-6 ms-2 text-danger">
                          Giảm {displayProduct.discount}%
                        </small>
                      </span>
                    </div>
                    {/* hr */}
                    <hr className="my-4" />
                    <div className="mb-5">
                      <div className="pound-section mb-4">
                        <div className="pound-custom-radios ">
                          <div className="pound-item">
                            <input
                              type="radio"
                              id="pound-1"
                              name="size"
                              defaultValue="s"
                              defaultChecked
                            />
                            <label htmlFor="pound-1">
                              <span>200kg</span>
                            </label>
                          </div>
                          <div className="pound-item">
                            <input
                              type="radio"
                              id="pound-2"
                              name="size"
                              defaultValue="m"
                            />
                            <label htmlFor="pound-2">
                              <span>300kg</span>
                            </label>
                          </div>
                          <div className="pound-item">
                            <input
                              type="radio"
                              id="pound-3"
                              name="size"
                              defaultValue="l"
                            />
                            <label htmlFor="pound-3">
                              <span>500g</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-action">
                      <div className="qty-container">
                        <button
                          className="qty-btn-minus count-decreament"
                          type="button"
                          onClick={handleDecrement}
                        >
                          <i className="bi bi-dash" />
                        </button>
                        <input
                          type="number"
                          name="qty"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="input-qty input-cornered"
                          min="1"
                        />
                        <button
                          className="qty-btn-plus count-increament"
                          type="button"
                          onClick={handleIncrement}
                        >
                          <i className="bi bi-plus" />
                        </button>
                      </div>
                      <div className="mt-4">
                        <a
                          href="#"
                          onClick={handleAddToCart}
                          className="btn btn-cart btn-primary"
                        >
                          <i className="bi bi-bag me-2" />
                          Thêm vào giỏ
                        </a>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="single-product-list">
                      <strong>Danh mục :</strong>
                      <a href="#0" className="ms-2">Rau củ</a>
                      <a href="#0" className="ms-2">Trái cây</a>
                      <a href="#0" className="ms-2">Hữu cơ</a>
                    </div>
                    <hr className="my-4" />
                    <div className="social-share">
                      <strong>Chia sẻ :</strong>
                      <a href="#0" className="facebook">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="#0" className="instagram">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="#0" className="twitter">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="#0" className="whatsapp">
                        <i className="bi bi-whatsapp" />
                      </a>
                    </div>
                    <hr className="my-4" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-100">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav nav-pills nav-lb-tab" id="myTab" role="tablist">
                    {/* nav item */}
                    <li className="nav-item" role="presentation">
                      {/* btn */}
                      <button
                        className="nav-link active"
                        id="product-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#product-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="product-tab-pane"
                        aria-selected="true"
                      >
                        Chi tiết sản phẩm
                      </button>
                    </li>
                    {/* nav item */}
                    <li className="nav-item" role="presentation">
                      {/* btn */}
                      <button
                        className="nav-link"
                        id="reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#reviews-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="reviews-tab-pane"
                        aria-selected="false"
                        tabIndex={-1}
                      >
                        Đánh giá
                      </button>
                    </li>
                  </ul>
                  {/* tab content */}
                  <div className="tab-content" id="myTabContent">
                    {/* tab pane */}
                    <div
                      className="tab-pane fade show active"
                      id="product-tab-pane"
                      role="tabpanel"
                      aria-labelledby="product-tab"
                      tabIndex={0}
                    >
                      <div className="my-5">
                        <div className="mb-5">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <table className="table table-striped">
                                {/* table */}
                                <tbody>
                                  <tr>
                                    <th>Trọng lượng</th>
                                    <td>{displayProduct.weight}</td>
                                  </tr>
                                  <tr>
                                    <th>Loại</th>
                                    <td>{displayProduct.type}</td>
                                  </tr>
                                  <tr>
                                    <th>Thương hiệu</th>
                                    <td>{displayProduct.brand}</td>
                                  </tr>
                                  <tr>
                                    <th>Quy cách đóng gói</th>
                                    <td>{displayProduct.packageQuantity}</td>
                                  </tr>
                                  <tr>
                                    <th>Nhà sản xuất</th>
                                    <td>{displayProduct.manufacturer}</td>
                                  </tr>
                                  <tr>
                                    <th>Khối lượng tịnh</th>
                                    <td>{displayProduct.netQuantity}</td>
                                  </tr>
                                  <tr>
                                    <th>Kích thước sản phẩm</th>
                                    <td>{displayProduct.dimensions}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="reviews-tab-pane"
                      role="tabpanel"
                      aria-labelledby="reviews-tab"
                      tabIndex={0}
                    >
                      <div className="my-5">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-5">
                              <div className="d-flex border-bottom pb-2 mb-2">
                                <div>
                                  <h6 className="mb-1">Devid1</h6>
                                  <p className="small">
                                    <span className="text-muted">01 January 2000</span>
                                    <span className="text-primary ms-3 fw-bold">
                                      Đã xác minh
                                    </span>
                                  </p>
                                  <div className="mb-2">
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                  </div>
                                  <p>Sản phẩm rất tốt</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-5">
                              <div className="d-flex border-bottom pb-2 mb-2">
                                <div>
                                  <h6 className="mb-1">Devid2</h6>
                                  <p className="small">
                                    <span className="text-muted">01 January 2000</span>
                                    <span className="text-primary ms-3 fw-bold">
                                      Đã xác minh
                                    </span>
                                  </p>
                                  <div className="mb-2">
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-fill text-warning" />
                                    <i className="bi bi-star-half text-warning" />
                                  </div>
                                  <p>Sản phẩm rất tốt</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="my-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h3>Sản phẩm liên quan</h3>
                </div>
              </div>
              <div className="product mt-4">
                <div className="owl-carousel product-slider">
                  <div className="card product-card mx-2 mb-3">
                    <a href="shop-single.html">
                      <img
                        src="./assets/images/product/Tomato-first.png"
                        className="card-img-top image-first"
                        alt="eCommerce Template"
                      />
                      <img
                        src="./assets/images/product/Tomato-second.png"
                        className="card-img-top image-second"
                        alt="eCommerce Template"
                      />
                    </a>
                    <div className="card-body pt-0">
                      <div className="icons">
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Wishlist"
                        >
                          <i className="bi bi-heart" />{" "}
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Quick view"
                        >
                          <i className="bi bi-eye" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Compare"
                        >
                          <i className="bi bi-arrow-left-right" />{" "}
                        </a>
                      </div>
                      <span className="discount-badge">20% OFF</span>
                    </div>
                    <div className="product-price px-3 pb-2">
                      <h5 className="card-title">
                        <a href="shop-single.html">Cà chua</a>
                      </h5>
                      <div className="mb-2">
                        <small className="text-warning">
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-half" />
                        </small>
                      </div>
                      <div className="d-block">
                        <span className="sell-price">$12.00</span>
                        <span className="text-muted strike-through">
                          <s>$15.00</s>
                        </span>
                      </div>
                    </div>
                    <div className="product-footer">
                      <a
                        href="cart.html"
                        className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart"
                      >
                        Thêm vào giỏ
                      </a>
                    </div>
                  </div>
                  <div className="card product-card mx-2 mb-3">
                    <a href="shop-single.html">
                      <img
                        src="./assets/images/product/Orange-first.png"
                        className="card-img-top image-first"
                        alt="eCommerce Template"
                      />
                      <img
                        src="./assets/images/product/Orange-second.png"
                        className="card-img-top image-second"
                        alt="eCommerce Template"
                      />
                    </a>
                    <div className="card-body pt-0">
                      <div className="icons">
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Wishlist"
                        >
                          <i className="bi bi-heart" />{" "}
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Quick view"
                        >
                          <i className="bi bi-eye" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Compare"
                        >
                          <i className="bi bi-arrow-left-right" />{" "}
                        </a>
                      </div>
                      <span className="discount-badge">10% OFF</span>
                    </div>
                    <div className="product-price px-3 pb-2">
                      <h5 className="card-title">
                        <a href="shop-single.html">Cam</a>
                      </h5>
                      <div className="mb-2">
                        <small className="text-warning">
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-half" />
                        </small>
                      </div>
                      <div className="d-block">
                        <span className="sell-price">$9.00</span>
                        <span className="text-muted strike-through">
                          <s>$10.00</s>
                        </span>
                      </div>
                    </div>
                    <div className="product-footer">
                      <a
                        href="cart.html"
                        className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart"
                      >
                        Thêm vào giỏ
                      </a>
                    </div>
                  </div>
                  <div className="card product-card mx-2 mb-3">
                    <a href="shop-single.html">
                      <img
                        src="./assets/images/product/Strawberry-first.png"
                        className="card-img-top image-first"
                        alt="eCommerce Template"
                      />
                      <img
                        src="./assets/images/product/Strawberry-second.png"
                        className="card-img-top image-second"
                        alt="eCommerce Template"
                      />
                    </a>
                    <div className="card-body pt-0">
                      <div className="icons">
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Wishlist"
                        >
                          <i className="bi bi-heart" />{" "}
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Quick view"
                        >
                          <i className="bi bi-eye" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Compare"
                        >
                          <i className="bi bi-arrow-left-right" />{" "}
                        </a>
                      </div>
                      {/* <span class="discount-badge">5% OFF</span> */}
                    </div>
                    <div className="product-price px-3 pb-2">
                      <h5 className="card-title">
                        <a href="shop-single.html">Dâu tây</a>
                      </h5>
                      <div className="mb-2">
                        <small className="text-warning">
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-half" />
                        </small>
                      </div>
                      <div className="d-block">
                        <span className="sell-price">$10.00</span>
                        <span className="text-muted strike-through">
                          <s>$12.00</s>
                        </span>
                      </div>
                    </div>
                    <div className="product-footer">
                      <a
                        href="cart.html"
                        className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart"
                      >
                        Thêm vào giỏ
                      </a>
                    </div>
                  </div>
                  <div className="card product-card mx-2 mb-3">
                    <a href="shop-single.html">
                      <img
                        src="./assets/images/product/Apple-first.png"
                        className="card-img-top image-first"
                        alt="eCommerce Template"
                      />
                      <img
                        src="./assets/images/product/Apple-second.png"
                        className="card-img-top image-second"
                        alt="eCommerce Template"
                      />
                    </a>
                    <div className="card-body pt-0">
                      <div className="icons">
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Wishlist"
                        >
                          <i className="bi bi-heart" />{" "}
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Quick view"
                        >
                          <i className="bi bi-eye" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Compare"
                        >
                          <i className="bi bi-arrow-left-right" />{" "}
                        </a>
                      </div>
                      <span className="discount-badge">30% OFF</span>
                    </div>
                    <div className="product-price px-3 pb-2">
                      <h5 className="card-title">
                        <a href="shop-single.html">Táo</a>
                      </h5>
                      <div className="mb-2">
                        <small className="text-warning">
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-half" />
                        </small>
                      </div>
                      <div className="d-block">
                        <span className="sell-price">$12.00</span>
                        <span className="text-muted strike-through">
                          <s>$15.00</s>
                        </span>
                      </div>
                    </div>
                    <div className="product-footer">
                      <a
                        href="cart.html"
                        className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart"
                      >
                        Thêm vào giỏ
                      </a>
                    </div>
                  </div>
                  <div className="card product-card mx-2 mb-3">
                    <a href="shop-single.html">
                      <img
                        src="./assets/images/product/Zucchini-Yellow-first.png"
                        className="card-img-top image-first"
                        alt="eCommerce Template"
                      />
                      <img
                        src="./assets/images/product/Zucchini-Yellow-second.png"
                        className="card-img-top image-second"
                        alt="eCommerce Template"
                      />
                    </a>
                    <div className="card-body pt-0">
                      <div className="icons">
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Wishlist"
                        >
                          <i className="bi bi-heart" />{" "}
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Quick view"
                        >
                          <i className="bi bi-eye" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Compare"
                        >
                          <i className="bi bi-arrow-left-right" />{" "}
                        </a>
                      </div>
                      <span className="discount-badge">10% OFF</span>
                    </div>
                    <div className="product-price px-3 pb-2">
                      <h5 className="card-title">
                        <a href="shop-single.html">Bí ngòi vàng</a>
                      </h5>
                      <div className="mb-2">
                        <small className="text-warning">
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-half" />
                        </small>
                      </div>
                      <div className="d-block">
                        <span className="sell-price">$12.00</span>
                        <span className="text-muted strike-through">
                          <s>$15.00</s>
                        </span>
                      </div>
                    </div>
                    <div className="product-footer">
                      <a
                        href="cart.html"
                        className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart"
                      >
                        Thêm vào giỏ
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Shopsingle;