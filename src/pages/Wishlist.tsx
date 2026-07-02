import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";

type WishlistProps = {
  setCurrentPage: (page: string) => void;
};

function Wishlist({ setCurrentPage }: WishlistProps){
  const { wishlistItems, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

    return(
<div>
 
  <main>
    {/* section*/}
    <div className="product-wishlist">
      <div className="mt-4">
        <div className="container">
          {/* row */}
          <div className="row">
            {/* col */}
            <div className="col-12">
              {/* breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="#!">Trang chủ</a></li>
                  <li className="breadcrumb-item"><a href="#!">Cửa hàng</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Sản phẩm yêu thích</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* section */}
      <section className="mt-5 mb-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-10">
              <div className="p-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <h1 className="fw-bold mb-0 text-black text-uppercase">Sản phẩm yêu thích</h1>
                <h5 className="mb-0  fw-bold border py-2 px-4 text-muted">{wishlistItems.length} Items</h5>
                </div>
                <hr className="my-4" />
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => (
                  <div key={item.id} className="mb-4 d-flex justify-content-between align-items-center overflow-x-auto border-bottom pb-4">
                    <div className="col-md-2 col-lg-2 col-xl-2 col-3 col-sm-3">
                      <img src={item.images[0]} className="img-fluid rounded-3" width={100} alt={item.name} />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3 col-4 col-sm-4 mx-3">
                      <p className="text-black mb-0 h5">{item.name}</p>
                      <span className="mt-2">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 col-3 col-sm-3">
                      <span className="badge bg-success">Còn hàng</span>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 col-3 col-sm-3">
                      <a href="#" onClick={(e) => { e.preventDefault(); addToCart(item, 1); useToastStore.getState().showToast('Sản phẩm đã được thêm vào giỏ hàng!', 'success'); }} className="btn btn-md btn-primary py-2 rounded">
                        <span className="bi bi-cart mx-2" />
                      </a>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-center col-1 col-sm-1">
                      <a href="#" onClick={(e) => { e.preventDefault(); removeFromWishlist(item.id); }} className="text-muted" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete" data-bs-original-title="Delete">
                        <i className="bi bi-trash" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p>Danh sách yêu thích của bạn đang trống.</p>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Shop"); }} className="btn btn-primary mt-2">Tiếp tục mua sắm</a>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  
</div>
)
}
export default Wishlist