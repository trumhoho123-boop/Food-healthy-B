import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { apiUrl } from "../lib/api";

type AdminDashboardProps = {
  setCurrentPage: (page: string) => void;
};

type ContactMessage = {
  id: number;
  name: string;
  surname: string;
  email: string;
  message: string;
  createdAt: string;
};

type UserAccount = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
};

function AdminDashboard({ setCurrentPage }: AdminDashboardProps) {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<"products" | "users" | "contacts">("products");

  // State arrays
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);

  // Loaders & Errors
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  // Form State (for both Add and Edit Product)
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "0",
    description: "",
    weight: "1kg",
    type: "Thực vật",
    brand: "Healthy Food",
    manufacturer: "Healthy Food",
    netQuantity: "1kg",
    dimensions: "10x10 cm",
    imageUrl1: "",
    imageUrl2: ""
  });

  // Fetch all data
  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch Products
      const prodRes = await fetch(apiUrl("/api/products"));
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      // Fetch Users
      const userRes = await fetch(apiUrl("/api/users"));
      if (userRes.ok) {
        const userData = await userRes.json();
        setUsers(userData);
      }

      // Fetch Contacts
      const contactRes = await fetch(apiUrl("/api/contacts"));
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContacts(contactData);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu từ backend:", error);
      triggerAlert("danger", "Không thể kết nối đến Backend Server. Hãy chạy npm run dev ở thư mục gốc rồi thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerAlert = (type: "success" | "danger", text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => {
      setAlertMsg(null);
    }, 4000);
  };

  // Open Form to Add Product
  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      discount: "0",
      description: "",
      weight: "1kg",
      type: "Thực vật",
      brand: "Healthy Food",
      manufacturer: "Healthy Food",
      netQuantity: "1kg",
      dimensions: "10x10 cm",
      imageUrl1: "./assets/images/product/Papaya-first.png",
      imageUrl2: "./assets/images/product/Papaya-second.png"
    });
    setShowProductForm(true);
  };

  // Open Form to Edit Product
  const handleOpenEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      discount: product.discount.toString(),
      description: product.description || "",
      weight: product.weight || "1kg",
      type: product.type || "Thực vật",
      brand: product.brand || "Healthy Food",
      manufacturer: product.manufacturer || "Healthy Food",
      netQuantity: product.netQuantity || "1kg",
      dimensions: product.dimensions || "10x10 cm",
      imageUrl1: product.images[0] || "",
      imageUrl2: product.images[1] || ""
    });
    setShowProductForm(true);
  };

  // Delete Product
  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
    
    setActionLoading(true);
    try {
      const response = await fetch(apiUrl(`/api/products/${id}`), {
        method: "DELETE"
      });

      if (response.ok) {
        triggerAlert("success", "Đã xóa sản phẩm thành công!");
        loadData();
      } else {
        const data = await response.json();
        triggerAlert("danger", data.message || "Xóa sản phẩm thất bại.");
      }
    } catch {
      triggerAlert("danger", "Lỗi kết nối máy chủ khi xóa sản phẩm.");
    } finally {
      setActionLoading(false);
    }
  };

  // Submit form for Add or Edit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      triggerAlert("danger", "Tên và giá sản phẩm là bắt buộc!");
      return;
    }

    setActionLoading(true);
    const productPayload = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
      discount: parseInt(formData.discount),
      description: formData.description,
      weight: formData.weight,
      type: formData.type,
      brand: formData.brand,
      packageQuantity: 1,
      manufacturer: formData.manufacturer,
      netQuantity: formData.netQuantity,
      dimensions: formData.dimensions,
      images: [formData.imageUrl1, formData.imageUrl2].filter(Boolean)
    };

    try {
      let url = apiUrl("/api/products");
      let method = "POST";

      if (editingProduct) {
        url = apiUrl(`/api/products/${editingProduct.id}`);
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productPayload)
      });

      const data = await response.json();

      if (response.ok) {
        triggerAlert("success", editingProduct ? "Cập nhật sản phẩm thành công!" : "Thêm sản phẩm mới thành công!");
        setShowProductForm(false);
        setEditingProduct(null);
        loadData();
      } else {
        triggerAlert("danger", data.message || "Không thể thực hiện yêu cầu.");
      }
    } catch {
      triggerAlert("danger", "Đã xảy ra lỗi kết nối đến server.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="container-fluid py-4" style={{ minHeight: "75vh", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        {/* Title */}
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <div>
            <h1 className="h2 text-success font-weight-bold mb-1">Hệ Thống Quản Trị (Admin Dashboard)</h1>
            <p className="text-muted mb-0">Quản lý sản phẩm, thông tin người dùng và liên hệ khách hàng.</p>
          </div>
          <button 
            onClick={() => setCurrentPage("Home")} 
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="bi bi-arrow-left me-1"></i> Quay lại trang chủ
          </button>
        </div>

        {/* Global Alert Notification */}
        {alertMsg && (
          <div className={`alert alert-${alertMsg.type} alert-dismissible fade show`} role="alert">
            <strong>{alertMsg.type === "success" ? "Thành công!" : "Lỗi!"}</strong> {alertMsg.text}
          </div>
        )}

        {/* Statistical Cards Overview */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card border-0 shadow-sm bg-primary text-white p-3 rounded-lg">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 text-uppercase mb-1" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>Tổng sản phẩm</h6>
                  <h3 className="mb-0 font-weight-bold">{products.length}</h3>
                </div>
                <i className="bi bi-box-seam" style={{ fontSize: "2.2rem", opacity: 0.7 }}></i>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card border-0 shadow-sm bg-success text-white p-3 rounded-lg">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 text-uppercase mb-1" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>Tài khoản đăng nhập</h6>
                  <h3 className="mb-0 font-weight-bold">{users.length}</h3>
                </div>
                <i className="bi bi-people" style={{ fontSize: "2.2rem", opacity: 0.7 }}></i>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm bg-warning text-white p-3 rounded-lg">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 text-uppercase mb-1" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>Liên hệ & Ý kiến</h6>
                  <h3 className="mb-0 font-weight-bold">{contacts.length}</h3>
                </div>
                <i className="bi bi-chat-left-text" style={{ fontSize: "2.2rem", opacity: 0.7 }}></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Control */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 mr-2 ${activeTab === "products" ? "active bg-success" : "text-dark"}`}
                  onClick={() => { setActiveTab("products"); setShowProductForm(false); }}
                >
                  <i className="bi bi-grid me-2"></i> Quản lý sản phẩm
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 mr-2 ${activeTab === "users" ? "active bg-success" : "text-dark"}`}
                  onClick={() => { setActiveTab("users"); setShowProductForm(false); }}
                >
                  <i className="bi bi-person-lines-fill me-2"></i> Tài khoản đăng nhập ({users.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 ${activeTab === "contacts" ? "active bg-success" : "text-dark"}`}
                  onClick={() => { setActiveTab("contacts"); setShowProductForm(false); }}
                >
                  <i className="bi bi-envelope-open me-2"></i> Hộp thư liên hệ ({contacts.length})
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab Contents */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Đang tải dữ liệu...</span>
            </div>
            <p className="mt-2 text-muted">Đang tải dữ liệu từ cơ sở dữ liệu...</p>
          </div>
        ) : (
          <div>
            {/* TAB 1: PRODUCTS MANAGEMENT */}
            {activeTab === "products" && (
              <div>
                {!showProductForm ? (
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 text-success">Danh sách sản phẩm kinh doanh</h5>
                      <button onClick={handleOpenAddForm} className="btn btn-success">
                        <i className="bi bi-plus-circle me-1"></i> Thêm sản phẩm mới
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th style={{ width: "80px" }}>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Phân loại</th>
                            <th>Giá bán</th>
                            <th>Giá gốc</th>
                            <th>Khuyến mãi</th>
                            <th>Trọng lượng</th>
                            <th className="text-center" style={{ width: "160px" }}>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="text-center py-4 text-muted">Chưa có sản phẩm nào. Nhấp thêm để tạo.</td>
                            </tr>
                          ) : (
                            products.map((product) => (
                              <tr key={product.id}>
                                <td>
                                  <img 
                                    src={product.images && product.images[0] ? product.images[0] : "./assets/images/product/Papaya-first.png"} 
                                    alt={product.name} 
                                    className="img-thumbnail rounded"
                                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                  />
                                </td>
                                <td>
                                  <div className="font-weight-bold text-dark">{product.name}</div>
                                  <small className="text-muted d-block text-truncate" style={{ maxWidth: "250px" }}>{product.description}</small>
                                </td>
                                <td><span className="badge bg-info text-dark">{product.type}</span></td>
                                <td><strong className="text-success">${product.price}</strong></td>
                                <td><del className="text-muted">${product.originalPrice}</del></td>
                                <td><span className="badge bg-danger">{product.discount}% OFF</span></td>
                                <td>{product.weight}</td>
                                <td className="text-center">
                                  <button 
                                    onClick={() => handleOpenEditForm(product)} 
                                    className="btn btn-sm btn-outline-primary me-2"
                                    disabled={actionLoading}
                                    title="Sửa thông tin"
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProduct(product.id)} 
                                    className="btn btn-sm btn-outline-danger"
                                    disabled={actionLoading}
                                    title="Xóa sản phẩm"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* PRODUCT FORM (ADD / EDIT) */
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom py-3">
                      <h5 className="mb-0 text-success">{editingProduct ? `Cập nhật sản phẩm: ${editingProduct.name}` : "Thêm sản phẩm mới"}</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        <div className="row g-3">
                          {/* Row 1 */}
                          <div className="col-md-6">
                            <label className="form-label font-weight-bold">Tên sản phẩm <span className="text-danger">*</span></label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Nhập tên sản phẩm (Ví dụ: Đu đủ tươi)"
                              required
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label font-weight-bold">Phân loại</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formData.type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                              placeholder="Thực vật, Trái cây, Sữa..."
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label font-weight-bold">Thương hiệu</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formData.brand}
                              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                              placeholder="TemplateRise"
                            />
                          </div>

                          {/* Row 2 */}
                          <div className="col-md-4">
                            <label className="form-label font-weight-bold">Giá bán ($) <span className="text-danger">*</span></label>
                            <input 
                              type="number" 
                              step="0.01" 
                              className="form-control" 
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              placeholder="12.5"
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label font-weight-bold">Giá gốc ($)</label>
                            <input 
                              type="number" 
                              step="0.01" 
                              className="form-control" 
                              value={formData.originalPrice}
                              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                              placeholder="15.0"
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label font-weight-bold">Giảm giá (%)</label>
                            <input 
                              type="number" 
                              className="form-control" 
                              value={formData.discount}
                              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                              placeholder="10"
                            />
                          </div>

                          {/* Row 3 */}
                          <div className="col-md-4">
                            <label className="form-label font-weight-bold">Trọng lượng đóng gói (Ví dụ: 150 Gram)</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formData.weight}
                              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label font-weight-bold">Kích thước</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formData.dimensions}
                              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                              placeholder="9.6 x 7.49 x 18.49 cm"
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label font-weight-bold">Nhà sản xuất</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formData.manufacturer}
                              onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                            />
                          </div>

                          {/* Row 4: Images */}
                          <div className="col-md-6">
                            <label className="form-label font-weight-bold">Đường dẫn ảnh 1 (Ảnh chính)</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formData.imageUrl1}
                              onChange={(e) => setFormData({ ...formData, imageUrl1: e.target.value })}
                              placeholder="./assets/images/product/fileName.png"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label font-weight-bold">Đường dẫn ảnh 2 (Ảnh phụ khi hover)</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={formData.imageUrl2}
                              onChange={(e) => setFormData({ ...formData, imageUrl2: e.target.value })}
                              placeholder="./assets/images/product/fileName.png"
                            />
                          </div>

                          {/* Row 5: Description */}
                          <div className="col-12">
                            <label className="form-label font-weight-bold">Mô tả sản phẩm</label>
                            <textarea 
                              className="form-control" 
                              rows={3} 
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              placeholder="Mô tả tóm tắt về nguồn gốc dinh dưỡng, chất lượng sản phẩm..."
                            />
                          </div>

                          {/* Actions */}
                          <div className="col-12 d-flex justify-content-end mt-4">
                            <button 
                              type="button" 
                              onClick={() => { setShowProductForm(false); setEditingProduct(null); }}
                              className="btn btn-outline-secondary me-2"
                              disabled={actionLoading}
                            >
                              Hủy bỏ
                            </button>
                            <button 
                              type="submit" 
                              className="btn btn-success"
                              disabled={actionLoading}
                            >
                              {actionLoading ? "Đang lưu..." : (editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm")}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: REGISTERED USERS */}
            {activeTab === "users" && (
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom py-3">
                  <h5 className="mb-0 text-success">Danh sách thông tin tài khoản & thông tin đăng nhập</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th style={{ width: "80px" }}>Mã ID</th>
                        <th>Họ và Tên</th>
                        <th>Email đăng nhập</th>
                        <th>Mật khẩu tài khoản (Bản rõ)</th>
                        <th>Quyền hạn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-4 text-muted">Chưa có người dùng đăng ký nào.</td>
                        </tr>
                      ) : (
                        users.map((acc) => (
                          <tr key={acc.id}>
                            <td><strong>#{acc.id}</strong></td>
                            <td>{acc.lastName} {acc.firstName}</td>
                            <td><span className="text-primary">{acc.email}</span></td>
                            <td>
                              <code className="text-danger bg-light px-2 py-1 rounded">{acc.password || "********"}</code>
                            </td>
                            <td>
                              <span className={`badge ${acc.role === "admin" ? "bg-danger" : "bg-secondary"}`}>
                                {acc.role.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: CONTACT SUBMISSIONS */}
            {activeTab === "contacts" && (
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom py-3">
                  <h5 className="mb-0 text-success">Danh sách khách hàng liên hệ</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th style={{ width: "80px" }}>Mã ID</th>
                        <th>Họ và Tên</th>
                        <th>Email liên hệ</th>
                        <th>Nội dung phản hồi / tin nhắn</th>
                        <th>Thời gian gửi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-4 text-muted">Hộp thư liên hệ hiện đang rỗng.</td>
                        </tr>
                      ) : (
                        contacts.map((contact) => (
                          <tr key={contact.id}>
                            <td><strong>#{contact.id}</strong></td>
                            <td>{contact.surname} {contact.name}</td>
                            <td><a href={`mailto:${contact.email}`} className="text-primary">{contact.email}</a></td>
                            <td>
                              <div className="p-2 bg-light rounded text-dark" style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>
                                {contact.message}
                              </div>
                            </td>
                            <td>
                              <small className="text-muted">
                                {new Date(contact.createdAt).toLocaleString("vi-VN")}
                              </small>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminDashboard;
