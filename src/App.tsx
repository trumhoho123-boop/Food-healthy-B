import { useState, useEffect } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop"
import Shopsingle from "./pages/Shop-single";
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Blog from "./pages/Blog";
import Blogsingle from "./pages/Blog-single";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import AdminDashboard from "./pages/AdminDashboard";
import ToastContainer from "./component/ToastContainer";

import { useAuthStore } from "./store/authStore";
import type { Product, ShopProps } from "./types/product";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const initializeAuth = useAuthStore((state) => state.initialize);

  // Khởi tạo phiên đăng nhập khi tải ứng dụng
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Function to navigate to product detail page with product data
  const navigateToProduct: ShopProps["navigateToProduct"] = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("Shopsingle");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home": return <Home setCurrentPage={setCurrentPage} />;
      case "Shop": return <Shop setCurrentPage={setCurrentPage} navigateToProduct={navigateToProduct} />;
      case "Shopsingle": return <Shopsingle product={selectedProduct} setCurrentPage={setCurrentPage} />;
      case "Cart": return <Cart setCurrentPage={setCurrentPage} />;
      case "Wishlist": return <Wishlist setCurrentPage={setCurrentPage} />;
      case "Checkout": return <Checkout setCurrentPage={setCurrentPage} />;
      case "Blog": return <Blog setCurrentPage={setCurrentPage} />;
      case "Blogsingle": return <Blogsingle setCurrentPage={setCurrentPage} />;
      case "Contact": return <Contact setCurrentPage={setCurrentPage} />;
      case "About": return <About setCurrentPage={setCurrentPage} />;
      case "Login": return <Login setCurrentPage={setCurrentPage} />;
      case "SignUp": return <SignUp setCurrentPage={setCurrentPage} />;
      case "Forgot": return <Forgot setCurrentPage={setCurrentPage} />;
      case "Admin": return <AdminDashboard setCurrentPage={setCurrentPage} />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Truyền hàm setCurrentPage xuống Header để có thể điều hướng từ menu */}
      <Header setCurrentPage={setCurrentPage} />
      
      {/* Gọi hàm renderPage để hiển thị trang dựa trên trạng thái hiện tại */}
      {renderPage()}

      <Footer  />
    </>
  )
}

export default App