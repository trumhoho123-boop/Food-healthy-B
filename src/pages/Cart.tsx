import { useCartStore } from "../store/cartStore";

type CartProps = {
  setCurrentPage: (page: string) => void;
};

function Cart({ setCurrentPage }: CartProps){
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = subtotal > 0 ? 10 : 0; // Giảm giá cố định ví dụ
  const shippingFee = subtotal > 0 ? 10 : 0; // Phí ship cố định ví dụ
  const total = subtotal - discount + shippingFee;

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
                  <li className="breadcrumb-item active" aria-current="page">Giỏ hàng của tôi</li>
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
                  <h1 className="fw-bold mb-0 text-black text-uppercase">Giỏ hàng của tôi</h1>
                  <h5 className="mb-0  fw-bold border py-2 px-4 text-muted">{cartItems.length} Sản phẩm</h5>
                </div>
                <hr className="my-4" />
                <div className="table-responsive cart-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" />
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng cộng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.length > 0 ? cartItems.map((item) => (
                        <tr key={item.product.id}>
                          <th scope="row" className="align-middle" >
                            <a href="#" onClick={(e) => { e.preventDefault(); removeFromCart(item.product.id); }} className="text-muted me-3 remove-item" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Xóa" data-bs-original-title="Xóa">
                              <i className="bi bi-trash" />
                            </a>
                            <a href="#">
                              <img src={item.product.images[0]} className="img-fluid rounded-3" width={100} alt={item.product.name} />
                            </a>
                          </th>
                          <td className="align-middle" width="30%">
                            <a href="#" className="text-black">{item.product.name}</a></td>
                          <td className="align-middle" width="15%">${item.product.price.toFixed(2)}</td>
                          <td className="align-middle" width="20%">
                            <div className="qty-container">
                              <button className="qty-btn-minus count-decreament" onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} type="button"><i className="bi bi-dash" /></button>
                              <input type="number" name="qty" value={item.quantity} onChange={(e) => updateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))} className="input-qty input-cornered" min={1} />
                              <button className="qty-btn-plus count-increament" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} type="button"><i className="bi bi-plus" /></button>
                            </div>
                          </td>
                          <td className="align-middle" width="15%">${(item.product.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="text-center py-4">Giỏ hàng của bạn đang trống</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4 ms-auto">
                  <div className="mt-2">
                    <table className="table">
                      <tbody><tr>
                          <td>Tạm tính</td>
                          <td className="text-right">${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Giảm giá</td>
                          <td className="text-right">${discount.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Phí vận chuyển</td>
                          <td className="text-right">${shippingFee.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Tổng cộng</td>
                          <td className="text-right fw-bold">${total.toFixed(2)}</td>
                        </tr>
                      </tbody></table>
                  </div>
                  <div className="checkout-btn mt-5">
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("Checkout"); }} className="btn btn-primary btn-lg w-100">Tiến hành thanh toán</a>
                  </div>
                </div>
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
export default Cart