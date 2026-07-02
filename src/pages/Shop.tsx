import { useState, useEffect } from "react";
import type { Product, ShopProps } from "../types/product";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useToastStore } from "../store/toastStore";
import { apiUrl } from "../lib/api";

// Product data for the shop
const products: Product[] = [
  {
    id: 1,
    name: "Đu đủ",
    price: 13,
    originalPrice: 15,
    discount: 20,
    rating: 4.5,
    reviews: 25,
    images: [
      "./assets/images/product/Papaya-first.png",
      "./assets/images/product/Papaya-second.png"
    ],
    description: "Đu đủ tươi",
    weight: "150 Gram",
    type: "Thực vật",
    brand: "TemplateRise",
    packageQuantity: 1,
    manufacturer: "TemplateRise",
    netQuantity: "340.0 Gram",
    dimensions: "9.6 x 7.49 x 18.49 cm"
  },
  {
    id: 2,
    name: "Ớt Snibs",
    price: 9,
    originalPrice: 10,
    discount: 10,
    rating: 4.5,
    reviews: 20,
    images: [
      "./assets/images/product/Snibs-Peppers-first.png",
      "./assets/images/product/Snibs-Peppers-second.png"
    ],
    description: "Ớt cay",
    weight: "100 Gram",
    type: "Thực vật",
    brand: "TemplateRise",
    packageQuantity: 1,
    manufacturer: "TemplateRise",
    netQuantity: "200.0 Gram",
    dimensions: "8.0 x 6.0 x 15.0 cm"
  },
  {
    id: 3,
    name: "Dâu tây",
    price: 18,
    originalPrice: 19,
    discount: 5,
    rating: 4.5,
    reviews: 35,
    images: [
      "./assets/images/product/Strawberry-first.png",
      "./assets/images/product/Strawberry-second.png"
    ],
    description: "Dâu tây ngọt",
    weight: "200 Gram",
    type: "Thực vật",
    brand: "TemplateRise",
    packageQuantity: 1,
    manufacturer: "TemplateRise",
    netQuantity: "400.0 Gram",
    dimensions: "10.0 x 8.0 x 12.0 cm"
  },
  {
    id: 4,
    name: "Dừa tươi",
    price: 13,
    originalPrice: 15,
    discount: 30,
    rating: 4.5,
    reviews: 18,
    images: [
      "./assets/images/product/Tender-Coconut-first.png",
      "./assets/images/product/Tender-Coconut-second.png"
    ],
    description: "Dừa tươi",
    weight: "500 Gram",
    type: "Thực vật",
    brand: "TemplateRise",
    packageQuantity: 1,
    manufacturer: "TemplateRise",
    netQuantity: "500.0 Gram",
    dimensions: "12.0 x 12.0 x 15.0 cm"
  },
  {
    id: 5,
    name: "Cà chua",
    price: 6,
    originalPrice: 7,
    discount: 30,
    rating: 4.5,
    reviews: 40,
    images: [
      "./assets/images/product/Tomato-first.png",
      "./assets/images/product/Tomato-second.png"
    ],
    description: "Cà chua tươi",
    weight: "250 Gram",
    type: "Thực vật",
    brand: "TemplateRise",
    packageQuantity: 1,
    manufacturer: "TemplateRise",
    netQuantity: "500.0 Gram",
    dimensions: "8.0 x 8.0 x 10.0 cm"
  },
  {
    id: 6,
    name: "Bí ngòi vàng",
    price: 6,
    originalPrice: 9,
    discount: 30,
    rating: 4.5,
    reviews: 15,
    images: [
      "./assets/images/product/Zucchini-Yellow-first.png",
      "./assets/images/product/Zucchini-Yellow-second.png"
    ],
    description: "Bí ngòi vàng",
    weight: "200 Gram",
    type: "Thực vật",
    brand: "TemplateRise",
    packageQuantity: 1,
    manufacturer: "TemplateRise",
    netQuantity: "400.0 Gram",
    dimensions: "15.0 x 5.0 x 5.0 cm"
  }
];

function Shop({ setCurrentPage, navigateToProduct }: ShopProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl("/api/products"));
        if (!response.ok) {
          throw new Error("Không thể tải danh sách sản phẩm.");
        }
        const data = await response.json();
        setProductList(data);
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi.");
        // Fallback to static products in case backend is not running yet
        setProductList(products);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
      <main>
        <div className="shop-section">
          {/* section*/}
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
                        <a href="#!" onClick={() => setCurrentPage("Home")}>Trang chủ</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#!">Cửa hàng</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Trái cây
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* section */}
          <div className="mb-5 mt-50">
            {/* container */}
            <div className="container">
              {/* row */}
              <div className="row gx-10">
                {/* col */}
                <aside className="col-lg-3 col-md-4 mb-2">
                  <div className="offcanvas offcanvas-start offcanvas-collapse w-md-50" tabIndex={-1} id="offcanvasCategory" aria-labelledby="offcanvasCategoryLabel">
                    <div className="offcanvas-header d-lg-none border-bottom ml-2">
                      <h5 className="offcanvas-title" id="offcanvasCategoryLabel">Bộ lọc</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                    </div>
                    <div className="offcanvas-body ps-lg-2 pt-lg-0">
                      <div className="mb-4 border-bottom pb-3">
                        {/* price */}
                        <h5 className="mb-3">Giá</h5>
                        <div>
                          {/* range */}
                          <div id="priceRange" className="mb-4" />
                          <small className="text-muted">Khoảng giá:</small>
                          <span id="priceRange-value" className="small" />
                        </div>
                      </div>
                      <div className="my-4 border-bottom pb-3">
                        <h5 className="mb-3">Trọng lượng</h5>
                        {/* form check */}
                        <div className="form-check mb-2">
                          {/* input */}
                          <input className="form-check-input" type="checkbox" id="tWhite" defaultChecked />
                          <label className="form-check-label" htmlFor="tWhite">200kg</label>
                        </div>
                        {/* form check */}
                        <div className="form-check mb-2">
                          {/* input */}
                          <input className="form-check-input" type="checkbox" id="tBlue" />
                          <label className="form-check-label" htmlFor="tBlue">300kg</label>
                        </div>
                        {/* form check */}
                        <div className="form-check mb-2">
                          {/* input */}
                          <input className="form-check-input" type="checkbox" id="tBlack" />
                          <label className="form-check-label" htmlFor="tBlack">500g</label>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h5 className="mb-3">Đánh giá</h5>
                        <div>
                          {/* form check */}
                          <div className="form-check mb-2">
                            {/* input */}
                            <input className="form-check-input" type="checkbox" defaultChecked id="ratingFive" />
                            <label className="form-check-label" htmlFor="ratingFive">
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                            </label>
                          </div>
                          {/* form check */}
                          <div className="form-check mb-2">
                            {/* input */}
                            <input className="form-check-input" type="checkbox" id="ratingFour" />
                            <label className="form-check-label" htmlFor="ratingFour">
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star text-warning" />
                            </label>
                          </div>
                          {/* form check */}
                          <div className="form-check mb-2">
                            {/* input */}
                            <input className="form-check-input" type="checkbox" id="ratingThree" />
                            <label className="form-check-label" htmlFor="ratingThree">
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star text-warning" />
                              <i className="bi bi-star text-warning" />
                            </label>
                          </div>
                          {/* form check */}
                          <div className="form-check mb-2">
                            {/* input */}
                            <input className="form-check-input" type="checkbox" id="ratingTwo" />
                            <label className="form-check-label" htmlFor="ratingTwo">
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star text-warning" />
                              <i className="bi bi-star text-warning" />
                              <i className="bi bi-star text-warning" />
                            </label>
                          </div>
                          {/* form check */}
                          <div className="form-check mb-2">
                            {/* input */}
                            <input className="form-check-input" type="checkbox" id="ratingOne" />
                            <label className="form-check-label" htmlFor="ratingOne">
                              <i className="bi bi-star-fill text-warning" />
                              <i className="bi bi-star text-warning" />
                              <i className="bi bi-star text-warning" />
                              <i className="bi bi-star text-warning" />
                              <i className="bi bi-star text-warning" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
                <section className="col-lg-9 col-md-12">
                  <div className="d-flex">
                    <div className="d-flex align-items-center justify-content-between me-2 mt-1">
                      <div className="d-lg-none">
                        <a className="btn border px-4 text-muted py-2" data-bs-toggle="offcanvas" href="#offcanvasCategory" role="button" aria-controls="offcanvasCategory">
                          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter me-2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                          </svg>
                        Bộ lọc
                        </a>
                      </div>
                    </div>
                    <div className="d-flex mt-2 mt-lg-0">
                      <div className="me-2 flex-grow-1">
                        {/* select option */}
                        <select className="nice-option">
                        <option selected>Hiển thị: 50</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                        </select>
                      </div>
                      <div>
                        {/* select option */}
                        <select className="nice-option">
                        <option selected>Sắp xếp: Nổi bật</option>
                        <option value="Low to High">Giá: Thấp đến Cao</option>
                        <option value="High to Low">Giá: Cao đến Thấp</option>
                        <option value="Release Date">Mới nhất</option>
                        <option value="Avg. Rating">Đánh giá trung bình</option>
                        </select>
                      </div>
                    </div>
                  </div>
                   <div className="product">
                    <div className="row g-4 row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-1">
                      {loading ? (
                        <div className="col-12 text-center py-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                          </div>
                          <p className="mt-2 text-muted">Đang tải danh sách sản phẩm...</p>
                        </div>
                      ) : error && productList.length === 0 ? (
                        <div className="col-12 text-center py-5">
                          <p className="text-danger">{error}</p>
                        </div>
                      ) : productList.length === 0 ? (
                        <div className="col-12 text-center py-5">
                          <p className="text-muted">Không tìm thấy sản phẩm nào.</p>
                        </div>
                      ) : (
                        productList.map((product) => (
                          <div key={product.id} className="col">
                            <div className="card product-card">
                              <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigateToProduct(product);
                              }}
                            >
                              <img
                                src={product.images[0]}
                                className="card-img-top image-first"
                                alt={product.name}
                              />
                              <img
                                src={product.images[1]}
                                className="card-img-top image-second"
                                alt={`${product.name} - second view`}
                              />
                            </a>
                            <div className="card-body pt-0">
                              <div className="icons">
                              <a href="#" onClick={(e) => { e.preventDefault(); addToWishlist(product); useToastStore.getState().showToast('Đã thêm vào danh sách yêu thích!', 'success'); }} data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist">
                                  <i className="bi bi-heart" />{" "}
                                </a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Xem nhanh">
                                  <i className="bi bi-eye" />
                                </a>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="So sánh">
                                  <i className="bi bi-arrow-left-right" />{" "}
                                </a>
                              </div>
                              <span className="discount-badge">GIẢM {product.discount}%</span>
                            </div>
                            <div className="product-price px-3 pb-2">
                              <h5 className="card-title">
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigateToProduct(product);
                                  }}
                                >
                                  {product.name}
                                </a>
                              </h5>
                              <div className="mb-2">
                                <small className="text-warning">
                                  {renderStars(product.rating)}
                                </small>
                              </div>
                              <div className="d-block">
                                <span className="sell-price">${product.price}</span>
                                <span className="text-muted strike-through">
                                  <s>${product.originalPrice}</s>
                                </span>
                              </div>
                            </div>
                            <div className="product-footer">
                              <a href="#" onClick={(e) => { e.preventDefault(); addToCart(product, 1); useToastStore.getState().showToast('Sản phẩm đã được thêm vào giỏ hàng!', 'success'); }} className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">
                                Thêm vào giỏ hàng
                              </a>
                            </div>
                          </div>
                        </div>
                      )))}
                    </div>
                  </div>
                  {/* row */}
                  <div className="row mt-5">
                    <div className="col">
                      {/* nav */}
                      <nav>
                        <ul className="pagination">
                          <li className="page-item disabled">
                            <a className="page-link mx-1" href="#" aria-label="Previous">
                              <i className="bi bi-arrow-left-short" />
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link mx-1 active" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link mx-1" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link mx-1" href="#">
                              ...
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link mx-1" href="#">
                              12
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link mx-1" href="#" aria-label="Next">
                              <i className=" bi bi-arrow-right-short " />
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Shop;
