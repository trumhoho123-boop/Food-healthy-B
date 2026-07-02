import React from 'react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';

interface HeaderProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ setCurrentPage }: HeaderProps) {
  const cartItems = useCartStore((state) => state.cartItems);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setCurrentPage("Home");
    useToastStore.getState().showToast("Bạn đã đăng xuất thành công!", "info");
  };

    return(
        <>
 {/* Header Section Start */}
 <header className="navigation shadow-sm border-bottom">
 {/* Navbar Sticky */}
 <div className="navbar-sticky">
   {/* Navbar */}
   <div className="navbar navbar-middle navbar-expand-lg mt-lg-3 ">
     <div className="container">
       {/* Logo */}
        <a className="navbar-brand flex-shrink-0 " href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Home"); }}>
          <img src="./assets/images/logo.png" className="logo main-logo" alt="Mẫu HTML Thương mại điện tử" /></a>
       {/* Logo */}
       {/* Search */}
       <div className="input-group d-none d-lg-flex me-5">
         <input id="searchInput" className="form-control py-10 px-20" type="text" placeholder="Tìm kiếm sản phẩm" />
         <select id="searchSelect" className="form-select flex-shrink-0" style={{maxWidth: '11rem'}}>
           <option>Tất cả danh mục</option>
           <option>Trái cây &amp; Rau củ</option>
           <option>Rau mầm &amp; Thái sẵn</option>
           <option>Trái cây ngoại</option>
           <option>Bó hoa</option>
           <option>Trái cây tươi</option>
           <option>Thảo mộc &amp; Gia vị</option>
           <option>Trái cây hữu cơ</option>
           <option>Rau củ tươi</option>
         </select>
         <button type="button" className="btn btn-primary bg-gradient d-none d-lg-block">Tìm kiếm</button>
       </div>
       {/* Search */}
       {/* Navbar Actions */}
       <div className="list-inline  d-flex">
          <div className="list-inline-item dropdown me-4">
            <a href="#" className="text-muted dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person" />
              {isAuthenticated && <span className="ms-1" style={{ fontSize: '0.85rem' }}>{user?.firstName}</span>}
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <li><a className="dropdown-item text-success font-weight-bold" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Admin"); }}>Trang Quản Trị</a></li>
                  )}
                  <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Đăng xuất</a></li>
                </>
              ) : (
                <>
                  <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Login"); }}>Đăng nhập</a></li>
                  <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("SignUp"); }}>Đăng ký</a></li>
                </>
              )}
            </ul>
          </div>
         <div className="list-inline-item me-4">
           <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Wishlist"); }} className="text-muted position-relative">
             <i className="bi bi-heart" />
             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
               {wishlistItems.length}
               <span className="visually-hidden">Sản phẩm yêu thích</span>
             </span>
           </a>
         </div>
         <div className="list-inline-item me-4">
           <a className="text-muted position-relative" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Cart"); }}>
             <i className="bi bi-cart" />
             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
               {cartItems.length}
               <span className="visually-hidden">Giỏ hàng</span>
             </span>
           </a>
         </div>
         <div className="list-inline-item d-inline-block d-lg-none">
           <button className="navbar-toggler border-0 collapsed" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar-default" aria-controls="navbar-default" aria-label="Toggle navigation">
             <i className="bi bi-text-indent-left" />
           </button></div>
       </div>
       {/* Navbar Actions */}
     </div>
   </div>
   {/* Navbar */}
   {/* Navs */}
   <nav className="navbar navbar-expand-lg navbar-light navbar-default py-lg-2 py-md-0 py-0 py-sm-0  bg-color mt-lg-3" aria-label="Offcanvas navbar large">
     <div className="container">
       <div className="offcanvas offcanvas-start" tabIndex={-1} id="navbar-default" aria-labelledby="navbar-defaultLabel">
         <div className="offcanvas-header pb-1">
           <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Home"); }}><img src="./assets/images/logo.png" className="logo" alt="Mẫu HTML Thương mại điện tử" /></a>
           <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
         </div>
         <div className="offcanvas-body">
           <div className="d-block d-lg-none mb-4">
             <div className="input-group  me-5">
               <input id="searchInput" className="form-control py-10 px-20" type="text" placeholder="Tìm kiếm sản phẩm" />
               <select id="searchSelect" className="form-select flex-shrink-0" style={{maxWidth: '11rem'}}>
                 <option>Tất cả danh mục</option>
                 <option>Trái cây &amp; Rau củ</option>
               </select>
               <button type="button" className="btn btn-primary bg-gradient">Tìm kiếm</button>
             </div>
           </div>
           <div>
              <ul className="navbar-nav align-items-center">
                <li className="nav-item dropdown w-100 w-lg-auto">
                  <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Home"); }}>Trang chủ</a>
                </li>
                <li className="nav-item dropdown w-100 w-lg-auto">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cửa hàng</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Shop"); }}>Sản phẩm - Bộ lọc</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Shopsingle"); }}>Chi tiết sản phẩm</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Wishlist"); }}>Sản phẩm yêu thích</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Cart"); }}>Giỏ hàng</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Checkout"); }}>Thanh toán</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown w-100 w-lg-auto position-static">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Danh mục</a>
                 <div className="dropdown-menu w-100 pb-0">
                   <div className="row p-2 p-lg-4">
                     <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                       <h6 className="text-primary ps-3">Trái cây &amp; Rau củ</h6>
                       <a className="dropdown-item" href="#">Rau mầm &amp; Thái sẵn</a>
                       <a className="dropdown-item" href="#">Trái cây ngoại &amp; Rau củ</a>
                       <a className="dropdown-item" href="#">Bó hoa, Cắm hoa</a>
                       <a className="dropdown-item" href="#">Trái cây tươi</a>
                       <a className="dropdown-item" href="#">Rau củ tươi</a>
                       <a className="dropdown-item" href="#">Thảo mộc &amp; Gia vị</a>
                       <a className="dropdown-item" href="#">Trái cây hữu cơ</a>
                       <a className="dropdown-item" href="#">Rau củ hữu cơ</a>
                     </div>
                     <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                       <h6 className="text-primary ps-3">Ngũ cốc, Dầu &amp; Gia vị</h6>
                       <a className="dropdown-item" href="#">Bột mì &amp; Bột gạo</a>
                       <a className="dropdown-item" href="#">Đậu &amp; Đỗ</a>
                       <a className="dropdown-item" href="#">Trái cây sấy khô</a>
                       <a className="dropdown-item" href="#">Dầu ăn &amp; Bơ</a>
                       <a className="dropdown-item" href="#">Hỗn hợp gia vị</a>
                       <a className="dropdown-item" href="#">Gia vị hữu cơ</a>
                       <a className="dropdown-item" href="#">Gạo &amp; Sản phẩm từ gạo</a>
                       <a className="dropdown-item" href="#">Muối, Đường &amp; Mật mía</a>
                     </div>
                     <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                       <h6 className="text-primary ps-3">Bánh mì, Bánh ngọt &amp; Sữa</h6>
                       <a className="dropdown-item" href="#">Đồ dùng &amp; Điện gia dụng</a>
                       <a className="dropdown-item" href="#">Bánh mì &amp; Bánh bao</a>
                       <a className="dropdown-item" href="#">Bánh kem &amp; Bánh nướng</a>
                       <a className="dropdown-item" href="#">Bánh quy &amp; Bánh khô</a>
                       <a className="dropdown-item" href="#">Sữa &amp; Chế phẩm từ sữa</a>
                       <a className="dropdown-item" href="#">Bánh mì cao cấp</a>
                       <a className="dropdown-item" href="#">Kem &amp; Tráng miệng</a>
                       <a className="dropdown-item" href="#">Đồ không từ sữa</a>
                     </div>
                     <div className="col-lg-3 col-12 mb-4 mb-lg-0 menu-offer">
                       <div className="position-relative shine">
                         <img src="./assets/images/category/special-offer.png" className="rounded w-100" alt="Mẫu HTML Thương mại điện tử" />
                         <div className="position-absolute ps-6 mt-8 top-0 p-4">
                           <h5 className="mb-0">
                             Đừng bỏ lỡ ưu đãi
                             <br />
                             hấp dẫn hôm nay.
                           </h5>
                           <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Shop"); }} className="btn btn-cart btn-sm mt-3">Mua Ngay</a>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </li>
                <li className="nav-item dropdown w-100 w-lg-auto">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Trang</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Blog"); }}>Bài viết</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Blogsingle"); }}>Chi tiết bài viết</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("About"); }}>Về chúng tôi</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Contact"); }}>Liên hệ</a></li>
                  </ul>
                </li>
                 <li className="nav-item dropdown w-100 w-lg-auto">
                   <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     {isAuthenticated ? `Tài khoản (${user?.firstName})` : "Tài khoản"}
                   </a>
                   <ul className="dropdown-menu">
                     {isAuthenticated ? (
                       <>
                         {isAdmin && (
                           <li><a className="dropdown-item text-success font-weight-bold" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Admin"); }}>Trang Quản Trị</a></li>
                         )}
                         <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Đăng xuất</a></li>
                       </>
                     ) : (
                       <>
                         <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Login"); }}>Đăng nhập</a></li>
                         <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("SignUp"); }}>Đăng ký</a></li>
                         <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Forgot"); }}>Quên mật khẩu</a></li>
                       </>
                     )}
                   </ul>
                 </li>
             </ul>
           </div>
         </div>
       </div>
     </div>
   </nav>
   {/* Navs */}
 </div>
 {/* Navbar Sticky */}
</header>
{/* Header Section End */}
</>
)
}
export default Header;