import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import type { Product } from "../types/product";
import { useToastStore } from "../store/toastStore";

type HomeProps = {
  setCurrentPage: (page: string) => void;
};

function Home({ setCurrentPage }: HomeProps){
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  useEffect(() => {
    // Khởi tạo lại Owl Carousel khi component render lại để fix lỗi mất ảnh
    if (typeof window !== "undefined" && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      setTimeout(() => {
        if ($.fn.owlCarousel) {
          $('.banner-slider').owlCarousel('destroy').owlCarousel({ items: 1, loop: true, autoplay: true, nav: false, dots: true });
          $('.category-slider').owlCarousel('destroy').owlCarousel({ margin: 20, loop: true, responsive: { 0: { items: 2 }, 600: { items: 4 }, 1000: { items: 6 } }});
          $('.product-slider').owlCarousel('destroy').owlCarousel({ margin: 20, loop: false, responsive: { 0: { items: 2 }, 600: { items: 3 }, 1000: { items: 4 } }});
          $('.blog-slider').owlCarousel('destroy').owlCarousel({ margin: 20, loop: true, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } }});
        }
      }, 150);
    }
  }, []);

  // Sử dụng Event Delegation để bắt sự kiện click cho các HTML được code cứng
  const handleProductAction = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const actionBtn = target.closest('a');
    if (!actionBtn) return;

    const isAddToCart = actionBtn.classList.contains('btn-cart');
    const isWishlist = actionBtn.getAttribute('title') === 'Wishlist' || actionBtn.getAttribute('title') === 'Yêu thích';

    if (isAddToCart || isWishlist) {
      e.preventDefault();
      const card = actionBtn.closest('.product-card');
      if (card) {
        const title = card.querySelector('.card-title a')?.textContent?.trim() || 'Sản phẩm';
        const priceStr = card.querySelector('.sell-price')?.textContent?.replace('$', '') || '0';
        const originalPriceStr = card.querySelector('.strike-through s')?.textContent?.replace('$', '') || '0';
        const imgSrc1 = card.querySelector('.image-first')?.getAttribute('src') || '';
        const imgSrc2 = card.querySelector('.image-second')?.getAttribute('src') || '';
        
        let hash = 0; // Tạo một ID đơn giản dựa theo tên sản phẩm
        for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
        
        const product: Product = {
          id: Math.abs(hash),
          name: title,
          price: parseFloat(priceStr),
          originalPrice: parseFloat(originalPriceStr),
          discount: 0, rating: 5, reviews: 0,
          images: [imgSrc1, imgSrc2].filter(Boolean),
          description: title, weight: '1kg', type: 'Food', brand: 'TemplateRise', packageQuantity: 1, manufacturer: 'TemplateRise', netQuantity: '1kg', dimensions: '10x10 cm'
        };

        if (isAddToCart) {
          addToCart(product, 1);
          useToastStore.getState().showToast(`Đã thêm ${title} vào giỏ hàng!`, 'success');
        } else if (isWishlist) {
          addToWishlist(product);
          useToastStore.getState().showToast(`Đã thêm ${title} vào danh sách yêu thích!`, 'success');
        }
      }
    }
  };

    return(
<div onClick={handleProductAction}>
  
  {/* Banner Slider */}
  <div className="banner py-4">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-12 col-12">
          <div className="owl-carousel owl-theme banner-slider">
            <div> <img src="./assets/images/banner/1.png" className="rounded" alt="eCommerce Template" /> </div>
            <div> <img src="./assets/images/banner/2.png" className="rounded" alt="eCommerce Template" /> </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="mb-4 shine">
            <a href="#">
              <img src="./assets/images/banner/5.png" className="rounded w-100" alt="eCommerce Template" />
            </a>
          </div>
          <div className="text-center shine">
            <a href="#">
              <img src="./assets/images/banner/6.png" className="rounded w-100" alt="eCommerce Template" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Banner Slider */}  
  {/* Categories Section */}
  <div className="category-list mt-50">
    <div className="container">
      <div className="category-container">
        <div className="owl-carousel category-slider">
          <div className="item"> 
            <div>
              <a href="#">
                <img src="./assets/images/category/1.png" className="img-fluid" alt="eCommerce Template" /> 
                <span className="d-block category-title">Rau củ</span>
              </a>
            </div>
          </div>
          <div className="item"> 
            <div>
              <a href="#">
                <img src="./assets/images/category/2.png" className="img-fluid" alt="eCommerce Template" /> 
                <span className="d-block category-title">Trái cây</span>
              </a>
            </div>
          </div>
          <div className="item"> 
            <div>
              <a href="#">
                <img src="./assets/images/category/3.png" className="img-fluid" alt="eCommerce Template" /> 
                <span className="d-block category-title">Rau mầm &amp; Thái sẵn</span>
              </a>
            </div>
          </div>
          <div className="item"> 
            <div>
              <a href="#">
                <img src="./assets/images/category/4.png" className="img-fluid" alt="eCommerce Template" /> 
                <span className="d-block category-title">Thảo mộc</span>
              </a>
            </div>
          </div>
          <div className="item"> 
            <div>
              <a href="#">
                <img src="./assets/images/category/5.png" className="img-fluid" alt="eCommerce Template" /> 
                <span className="d-block category-title">Bó hoa</span>
              </a>
            </div>
          </div>
          <div className="item"> 
            <div>
              <a href="#">
                <img src="./assets/images/category/6.png" className="img-fluid" alt="eCommerce Template" /> 
                <span className="d-block category-title">Trái cây hữu cơ</span>
              </a>
            </div>
          </div>
          <div className="item"> 
            <div>
              <a href="#">
                <img src="./assets/images/category/7.png" className="img-fluid" alt="eCommerce Template" /> 
                <span className="d-block category-title">Trái cây sấy khô</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Categories Section */}
  {/* Offer Section */}
  <div className="offer-section mt-50">
    <div className="container">
      <div className="offer-container">
        <div className="shine">
          <a href="#">
            <img src="./assets/images/banner/3.png" className="w-100" alt="eCommerce Template" />
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* End Offer Section */}
  {/* Product Section */}
  <div className="product mt-100">
    <div className="container">
      <div className="d-block d-sm-block d-md-flex d-lg-flex justify-content-between">
        <h2 className="product-section-title">Sản phẩm bán chạy</h2>
        <div>
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-lastest-tab" data-bs-toggle="pill" data-bs-target="#pills-lastest" type="button" role="tab" aria-controls="pills-lastest" aria-selected="true">Mới nhất</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-popularity-tab" data-bs-toggle="pill" data-bs-target="#pills-popularity" type="button" role="tab" aria-controls="pills-popularity" aria-selected="false">Nổi bật</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-top-tab" data-bs-toggle="pill" data-bs-target="#pills-top" type="button" role="tab" aria-controls="pills-top" aria-selected="false">Đặc biệt</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-lastest" role="tabpanel" aria-labelledby="pills-lastest-tab" tabIndex={0}>
          <div className="product">
            <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-sm-2 row-cols-md-2 mt-1">
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Cauliflower-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Cauliflower-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Wishlist"); }} data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">20% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Súp lơ
                      </a>
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
                      <span className="text-muted strike-through"><s>$15.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Cart"); }} className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/potato-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/potato-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">10% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Khoai tây
                      </a>
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
                      <span className="sell-price">$8.00</span>
                      <span className="text-muted strike-through"><s>$9.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/onion-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/onion-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">5% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Hành tây
                      </a>
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
                      <span className="text-muted strike-through"><s>$10.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Mango-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Mango-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Xoài
                      </a>
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
                      <span className="sell-price">$30.00</span>
                      <span className="text-muted strike-through"><s>$35.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Watermelon-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Watermelon-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">10% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Dưa hấu
                      </a>
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
                      <span className="sell-price">$4.00</span>
                      <span className="text-muted strike-through"><s>$6.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="cart.html" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Carrot-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Carrot-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Cà rốt
                      </a>
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
                      <span className="sell-price">$6.00</span>
                      <span className="text-muted strike-through"><s>$7.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/banana-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/banana-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">10% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Chuối
                      </a>
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
                      <span className="sell-price">$8.00</span>
                      <span className="text-muted strike-through"><s>$9.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/coriander-leaves-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/coriander-leaves-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Rau mùi
                      </a>
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
                      <span className="sell-price">$3.00</span>
                      <span className="text-muted strike-through"><s>$5.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <a href="#" className="btn btn-lg btn-primary text-white px-5">Xem tất cả</a>
          </div>
        </div>
        <div className="tab-pane fade" id="pills-popularity" role="tabpanel" aria-labelledby="pills-popularity-tab" tabIndex={0}>
          <div className="product">
            <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-1">
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Apple-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Apple-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">20% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Táo
                      </a>
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
                      <span className="sell-price">$6.00</span>
                      <span className="text-muted strike-through"><s>$8.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Chilli-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Chilli-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">10% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Ớt
                      </a>
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
                      <span className="text-muted strike-through"><s>$15.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Coconut-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Coconut-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">5% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Dừa
                      </a>
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
                      <span className="sell-price">$14.00</span>
                      <span className="text-muted strike-through"><s>$15.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Cucumber-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Cucumber-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Dưa chuột
                      </a>
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
                      <span className="sell-price">$8.00</span>
                      <span className="text-muted strike-through"><s>$9.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Grapes-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Grapes-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">10% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Nho
                      </a>
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
                      <span className="sell-price">$21.00</span>
                      <span className="text-muted strike-through"><s>$24.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Lettuce-Romaine-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Lettuce-Romaine-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Xà lách Romaine
                      </a>
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
                      <span className="sell-price">$17.00</span>
                      <span className="text-muted strike-through"><s>$18.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Muskmelon-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Muskmelon-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Dưa lưới
                      </a>
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
                      <span className="text-muted strike-through"><s>$15.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Orange-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Orange-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Cam
                      </a>
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
                      <span className="sell-price">$16.00</span>
                      <span className="text-muted strike-through"><s>$18.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <a href="#" className="btn btn-lg btn-primary text-white px-5">Xem tất cả</a>
          </div>
        </div>
        <div className="tab-pane fade" id="pills-top" role="tabpanel" aria-labelledby="pills-top-tab" tabIndex={0}>
          <div className="product">
            <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-1">
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Papaya-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Papaya-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">20% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Đu đủ
                      </a>
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
                      <span className="sell-price">$13.00</span>
                      <span className="text-muted strike-through"><s>$15.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Snibs-Peppers-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Snibs-Peppers-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">10% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Ớt Snibs
                      </a>
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
                      <span className="text-muted strike-through"><s>$10.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Strawberry-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Strawberry-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">5% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Dâu tây
                      </a>
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
                      <span className="sell-price">$18.00</span>
                      <span className="text-muted strike-through"><s>$19.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Sweet-Corn-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Sweet-Corn-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Ngô ngọt
                      </a>
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
                      <span className="sell-price">$17.00</span>
                      <span className="text-muted strike-through"><s>$18.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Sweet-Potato-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Sweet-Potato-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">10% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Khoai lang
                      </a>
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
                      <span className="sell-price">$11.00</span>
                      <span className="text-muted strike-through"><s>$13.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Tender-Coconut-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Tender-Coconut-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Dừa tươi
                      </a>
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
                      <span className="sell-price">$13.00</span>
                      <span className="text-muted strike-through"><s>$15.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Tomato-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Tomato-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Cà chua
                      </a>
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
                      <span className="sell-price">$6.00</span>
                      <span className="text-muted strike-through"><s>$7.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card product-card">
                  <a href="shop-single.html">
                    <img src="./assets/images/product/Zucchini-Yellow-first.png" className="card-img-top image-first" alt="eCommerce Template" />
                    <img src="./assets/images/product/Zucchini-Yellow-second.png" className="card-img-top image-second" alt="eCommerce Template" />
                  </a>
                  <div className="card-body pt-0">
                    <div className="icons">
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                      <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
                    </div>
                    <span className="discount-badge">30% OFF</span>
                  </div>
                  <div className="product-price px-3 pb-2">
                    <h5 className="card-title"><a href="shop-single.html">
                        Bí ngòi vàng
                      </a>
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
                      <span className="sell-price">$6.00</span>
                      <span className="text-muted strike-through"><s>$9.00</s></span>
                    </div>
                  </div>
                  <div className="product-footer">
                    <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <a href="#" className="btn btn-lg btn-primary text-white px-5">View All</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Product Section End */}
  {/* Offer Section */}
  <div className="section-offer mt-100">
    <div className="container">
      <div className="section-offer-container shine" style={{backgroundImage: 'url("./assets/images/banner/4.png")'}}>
        <div className="section-offer-info">
          <p className="offer-info-dis">GIẢM THÊM 10% VỚI MÃ: QUEEN001</p>
          <p className="offer-info-title">Tiết kiệm 20% cho tất cả thực phẩm</p>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Shop"); }} className="btn-buy rounded">Mua Ngay</a>
        </div>
      </div>
    </div>
  </div>
  {/* Offer Section */}
  {/* Product Section */}
  <div className="product mt-100">
    <div className="container">
      <div>
        <h2 className="product-section-title">Hàng mới về</h2>
      </div>
      <div className="mt-5">
        <div className="owl-carousel product-slider">
          <div className="card product-card mx-2 mb-3">
            <a href="shop-single.html">
              <img src="./assets/images/product/Tomato-first.png" className="card-img-top image-first" alt="eCommerce Template" />
              <img src="./assets/images/product/Tomato-second.png" className="card-img-top image-second" alt="eCommerce Template" />
            </a>
            <div className="card-body pt-0">
              <div className="icons">
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
              </div>
              <span className="discount-badge">20% OFF</span>
            </div>
            <div className="product-price px-3 pb-2">
              <h5 className="card-title"><a href="shop-single.html">
                  Cà chua
                </a>
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
                <span className="text-muted strike-through"><s>$15.00</s></span>
              </div>
            </div>
            <div className="product-footer">
              <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
            </div>
          </div>
          <div className="card product-card mx-2 mb-3">
            <a href="shop-single.html">
              <img src="./assets/images/product/Orange-first.png" className="card-img-top image-first" alt="eCommerce Template" />
              <img src="./assets/images/product/Orange-second.png" className="card-img-top image-second" alt="eCommerce Template" />
            </a>
            <div className="card-body pt-0">
              <div className="icons">
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
              </div>
              <span className="discount-badge">10% OFF</span>
            </div>
            <div className="product-price px-3 pb-2">
              <h5 className="card-title"><a href="shop-single.html">
                  Cam
                </a>
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
                <span className="text-muted strike-through"><s>$10.00</s></span>
              </div>
            </div>
            <div className="product-footer">
              <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
            </div>
          </div>
          <div className="card product-card mx-2 mb-3">
            <a href="shop-single.html">
              <img src="./assets/images/product/Strawberry-first.png" className="card-img-top image-first" alt="eCommerce Template" />
              <img src="./assets/images/product/Strawberry-second.png" className="card-img-top image-second" alt="eCommerce Template" />
            </a>
            <div className="card-body pt-0">
              <div className="icons">
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
              </div>
              {/* <span class="discount-badge">5% OFF</span> */}
            </div>
            <div className="product-price px-3 pb-2">
              <h5 className="card-title"><a href="shop-single.html">
                  Dâu tây
                </a>
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
                <span className="text-muted strike-through"><s>$12.00</s></span>
              </div>
            </div>
            <div className="product-footer">
              <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
            </div>
          </div>
          <div className="card product-card mx-2 mb-3">
            <a href="shop-single.html">
              <img src="./assets/images/product/Apple-first.png" className="card-img-top image-first" alt="eCommerce Template" />
              <img src="./assets/images/product/Apple-second.png" className="card-img-top image-second" alt="eCommerce Template" />
            </a>
            <div className="card-body pt-0">
              <div className="icons">
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
              </div>
              <span className="discount-badge">30% OFF</span>
            </div>
            <div className="product-price px-3 pb-2">
              <h5 className="card-title"><a href="shop-single.html">
                  Táo
                </a>
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
                <span className="text-muted strike-through"><s>$15.00</s></span>
              </div>
            </div>
            <div className="product-footer">
              <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
            </div>
          </div>
          <div className="card product-card mx-2 mb-3">
            <a href="shop-single.html">
              <img src="./assets/images/product/Zucchini-Yellow-first.png" className="card-img-top image-first" alt="eCommerce Template" />
              <img src="./assets/images/product/Zucchini-Yellow-second.png" className="card-img-top image-second" alt="eCommerce Template" />
            </a>
            <div className="card-body pt-0">
              <div className="icons">
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Wishlist"><i className="bi bi-heart" /> </a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Quick view"><i className="bi bi-eye" /></a>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Compare"><i className="bi bi-arrow-left-right" /> </a>
              </div>
              <span className="discount-badge">10% OFF</span>
            </div>
            <div className="product-price px-3 pb-2">
              <h5 className="card-title"><a href="shop-single.html">
                  Bí ngòi vàng
                </a>
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
                <span className="text-muted strike-through"><s>$15.00</s></span>
              </div>
            </div>
            <div className="product-footer">
              <a href="#" className="d-block rounded py-2 text-center border mx-3 mb-3 btn-cart">Thêm vào giỏ</a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <a href="#" className="btn btn-lg btn-primary text-white px-5">Xem tất cả</a>
      </div>
    </div>
  </div>
  {/* Product Section End */}
  {/* Start Blog Section */}
  <div className="blog-section mt-100">
    <div className="container">
      <div>
        <h2 className="blog-section-title">Bài viết mới nhất</h2>
      </div>
      <div className="mt-50 owl-carousel  owl-theme blog-slider px-3">
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
                  <a href="blog-single.html" className="text-inherit">Bí quyết ăn uống lành mạnh và giữ gìn vóc dáng mỗi ngày!</a>
                </h2>
                <div className="text-muted mt-3">
                  <a href="#" className="blog-btn">Đọc thêm</a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  <a href="blog-single.html" className="text-inherit">Cách chọn thực phẩm hữu cơ tươi sạch cho gia đình.</a>
                </h2>
                <div className="text-muted mt-3">
                  <a href="#" className="blog-btn">Đọc thêm</a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  <a href="blog-single.html" className="text-inherit">Mẹo kết hợp trái cây và rau củ quả trong thực đơn hàng tuần.</a>
                </h2>
                <div className="text-muted mt-3">
                  <a href="#" className="blog-btn">Đọc thêm</a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  <a href="blog-single.html" className="text-inherit">Tự làm sinh tố giảm cân tại nhà nhanh chóng và hiệu quả.</a>
                </h2>
                <div className="text-muted mt-3">
                  <a href="#" className="blog-btn">Đọc thêm</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Blog Section */}
  {/* Feature Section */}
  <div className="feature-section mt-100">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="white-bg">
            <div className="row">
              <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center">
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
              <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center">
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
              <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center">
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
              <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center">
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
  
</div>
)
}
export default Home;