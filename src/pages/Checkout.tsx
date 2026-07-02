import { useState } from "react";
import { useCartStore, type CartItem } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";

type CheckoutProps = {
  setCurrentPage: (page: string) => void;
};

type CheckoutFormData = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  apartment: string;
  city: string;
  district: string;
  postalCode: string;
  note: string;
  paymentMethod: string;
};

type CompletedOrder = {
  id: string;
  createdAt: string;
  customer: CheckoutFormData;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
};

const initialFormData: CheckoutFormData = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  country: "Việt Nam",
  address: "",
  apartment: "",
  city: "",
  district: "",
  postalCode: "",
  note: "",
  paymentMethod: "Thanh toán khi nhận hàng",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value * 1000);

function Checkout({ setCurrentPage }: CheckoutProps) {
  const { cartItems, clearCart, removeFromCart, updateQuantity } = useCartStore();
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + shippingFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    updateQuantity(productId, Math.max(1, quantity));
  };

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      useToastStore.getState().showToast("Giỏ hàng của bạn đang trống.", "warning");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      useToastStore
        .getState()
        .showToast("Vui lòng điền tên, email, số điện thoại, địa chỉ và thành phố.", "warning");
      return;
    }

    const order: CompletedOrder = {
      // eslint-disable-next-line react-hooks/purity
      id: `GB-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toLocaleString("vi-VN"),
      customer: formData,
      items: cartItems.map((item) => ({
        product: { ...item.product, images: [...item.product.images] },
        quantity: item.quantity,
      })),
      subtotal,
      shippingFee,
      total,
    };

    setCompletedOrder(order);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (completedOrder) {
    const customerName = [completedOrder.customer.name, completedOrder.customer.lastName]
      .filter(Boolean)
      .join(" ");

    return (
      <main className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4.5rem" }} />
            <h1 className="mt-4 fw-bold">Cảm ơn bạn đã đặt hàng!</h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "720px" }}>
              Đơn hàng của bạn đã được ghi nhận. GroceryBasket sẽ liên hệ xác nhận và giao hàng trong
              thời gian sớm nhất.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h2 className="h5 mb-0">Sản phẩm đã mua</h2>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Sản phẩm</th>
                          <th className="text-center">Số lượng</th>
                          <th className="text-end">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedOrder.items.map((item) => (
                          <tr key={item.product.id}>
                            <td>
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  style={{ width: 72, height: 72, objectFit: "contain" }}
                                />
                                <div>
                                  <h3 className="h6 mb-1">{item.product.name}</h3>
                                  <span className="text-muted">{formatCurrency(item.product.price)}</span>
                                </div>
                              </div>
                            </td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-end fw-semibold">
                              {formatCurrency(item.product.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h2 className="h5 mb-0">Thông tin mua hàng</h2>
                </div>
                <div className="card-body">
                  <p className="mb-2"><strong>Mã đơn:</strong> {completedOrder.id}</p>
                  <p className="mb-2"><strong>Thời gian:</strong> {completedOrder.createdAt}</p>
                  <p className="mb-2"><strong>Khách hàng:</strong> {customerName}</p>
                  <p className="mb-2"><strong>Email:</strong> {completedOrder.customer.email}</p>
                  <p className="mb-2"><strong>Điện thoại:</strong> {completedOrder.customer.phone}</p>
                  <p className="mb-2">
                    <strong>Địa chỉ:</strong>{" "}
                    {[
                      completedOrder.customer.address,
                      completedOrder.customer.apartment,
                      completedOrder.customer.district,
                      completedOrder.customer.city,
                      completedOrder.customer.country,
                    ].filter(Boolean).join(", ")}
                  </p>
                  <p className="mb-0"><strong>Thanh toán:</strong> {completedOrder.customer.paymentMethod}</p>
                  {completedOrder.customer.note && (
                    <p className="mb-0 mt-2"><strong>Ghi chú:</strong> {completedOrder.customer.note}</p>
                  )}
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h2 className="h5 mb-0">Tổng thanh toán</h2>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(completedOrder.subtotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Phí giao hàng</span>
                    <span>{formatCurrency(completedOrder.shippingFee)}</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-3 h5">
                    <span>Tổng tiền</span>
                    <span>{formatCurrency(completedOrder.total)}</span>
                  </div>
                  <button onClick={() => setCurrentPage("Home")} className="btn btn-primary w-100 mt-3">
                    Trở về trang chủ
                  </button>
                  <button onClick={() => setCurrentPage("Shop")} className="btn btn-outline-primary w-100 mt-2">
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="product-checkout">
        <div className="mt-4">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#!" onClick={(e) => { e.preventDefault(); setCurrentPage("Home"); }}>Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#!" onClick={(e) => { e.preventDefault(); setCurrentPage("Shop"); }}>Cửa hàng</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
              </ol>
            </nav>

            <div className="row mt-50">
              <div className="col-lg-8">
                <h1 className="h4 mb-4">Thông tin thanh toán</h1>
                <div className="checkout-info">
                  <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <h2 className="h6">Thông tin cá nhân</h2>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="input-item input-item-name gs_input_area">
                          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tên:" />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="input-item input-item-name gs_input_area">
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Họ:" />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="input-item input-item-email gs_input_area">
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Địa chỉ Email:" />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="input-item input-item-phone gs_input_area">
                          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại:" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 col-md-12 mb-4">
                        <h2 className="h6">Quốc gia</h2>
                        <div className="input-item">
                          <select className="nice-option" name="country" value={formData.country} onChange={handleChange}>
                            <option>Việt Nam</option>
                            <option>Hoa Kỳ</option>
                            <option>Vương quốc Anh</option>
                            <option>Úc</option>
                            <option>Canada</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <h2 className="h6">Địa chỉ</h2>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="input-item gs_input_area">
                              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Số nhà và tên đường:" />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="input-item gs_input_area">
                              <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Căn hộ, phòng v.v. (tùy chọn):" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4">
                        <h2 className="h6">Thành phố / Tỉnh</h2>
                        <div className="input-item gs_input_area">
                          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Thành phố:" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4">
                        <h2 className="h6">Quận / Huyện</h2>
                        <div className="input-item gs_input_area">
                          <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="Quận / Huyện:" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4">
                        <h2 className="h6">Mã bưu điện</h2>
                        <div className="input-item gs_input_area">
                          <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Mã Zip:" />
                        </div>
                      </div>
                    </div>

                    <h2 className="h6">Ghi chú đơn hàng</h2>
                    <div className="input-item input-item-textarea gs_input_area">
                      <textarea name="note" rows={4} value={formData.note} onChange={handleChange} placeholder="Ghi chú về đơn hàng của bạn, ví dụ: giao hàng giờ hành chính." />
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-4 mt-5">
                <div className="card bg-white">
                  <div className="card-header bg-white px-4">
                    <h2 className="h5 mb-0">Đơn hàng của bạn</h2>
                  </div>
                  <div className="card-body p-0">
                    {cartItems.length === 0 ? (
                      <div className="p-4 text-muted">Giỏ hàng của bạn đang trống.</div>
                    ) : (
                      <div className="px-4 pt-3">
                        {cartItems.map((item) => (
                          <div key={item.product.id} className="d-flex gap-3 border-bottom py-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="rounded bg-light flex-shrink-0"
                              style={{ width: 76, height: 76, objectFit: "contain" }}
                            />
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between gap-2">
                                <div>
                                  <h3 className="h6 mb-1">{item.product.name}</h3>
                                  <div className="small text-muted">{item.product.weight}</div>
                                  <div className="fw-semibold mt-1">{formatCurrency(item.product.price)}</div>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-link text-muted p-0 align-self-start"
                                  onClick={() => removeFromCart(item.product.id)}
                                  aria-label={`Xoa ${item.product.name}`}
                                >
                                  <i className="bi bi-trash" />
                                </button>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-3">
                                <div className="qty-container">
                                  <button
                                    className="qty-btn-minus count-decreament"
                                    type="button"
                                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                  >
                                    <i className="bi bi-dash" />
                                  </button>
                                  <input
                                    type="number"
                                    name={`qty-${item.product.id}`}
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)
                                    }
                                    className="input-qty input-cornered"
                                    min={1}
                                  />
                                  <button
                                    className="qty-btn-plus count-increament"
                                    type="button"
                                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                  >
                                    <i className="bi bi-plus" />
                                  </button>
                                </div>
                                <span className="fw-semibold">
                                  {formatCurrency(item.product.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="d-flex justify-content-between px-4 py-3">
                      <span className="p-summary-price">Tạm tính</span>
                      <span className="p-summary-title">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between border-t">
                      <span className="p-summary-title">Phí giao hàng</span>
                      <span className="p-summary-price">{formatCurrency(shippingFee)}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2 border-t">
                      <span className="p-summary-total-title">Tổng tiền</span>
                      <span className="p-summary-total-price">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="card mt-4">
                  <div className="card-header bg-white px-4">
                    <h2 className="h5 mb-0">Phương thức thanh toán</h2>
                  </div>
                  <div className="card-body">
                    {["Thanh toán khi nhận hàng", "Chuyển khoản ngân hàng", "PayPal"].map((method) => (
                      <div className="form-check mb-3" key={method}>
                        <input
                          className="form-check-input"
                          type="radio"
                          id={method}
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={method}>{method}</label>
                      </div>
                    ))}
                    <p className="text-muted mb-0">
                      Thông tin đơn hàng sẽ hiển thị ngay sau khi bạn đặt hàng thành công.
                    </p>
                  </div>
                  <div className="checkout-btn mx-3 mb-4">
                    <button type="button" onClick={handleCheckout} className="btn btn-primary btn-lg w-100">
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
