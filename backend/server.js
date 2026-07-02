const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const dbPath = path.join(__dirname, 'db.json');

const useLocalDB = () => !isSupabaseConfigured || !supabase;

const readLocalDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const writeLocalDB = (db) => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const toSafeUser = (user) => {
  const { password: _password, ...safeUser } = user;
  return {
    ...safeUser,
    role: String(safeUser.role || 'user').toLowerCase()
  };
};

const findLocalUserByCredentials = (email, password) => {
  const db = readLocalDB();
  const emailNormalized = normalizeEmail(email);
  return db.users.find(
    user => normalizeEmail(user.email) === emailNormalized && user.password === password
  );
};

const mapSupabaseUser = (user) => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  role: String(user.role || 'user').toLowerCase()
});

const mapSupabaseProduct = (product) => ({
  id: product.id,
  name: product.name,
  price: parseFloat(product.price),
  originalPrice: product.original_price ? parseFloat(product.original_price) : parseFloat(product.price),
  discount: product.discount || 0,
  rating: product.rating ? parseFloat(product.rating) : 5.0,
  reviews: product.reviews || 0,
  images: product.images || [],
  description: product.description || '',
  weight: product.weight || '1kg',
  type: product.type || 'Thá»±c váº­t',
  brand: product.brand || 'Healthy Food',
  packageQuantity: product.package_quantity || 1,
  manufacturer: product.manufacturer || 'Healthy Food',
  netQuantity: product.net_quantity || '1kg',
  dimensions: product.dimensions || '10x10 cm'
});

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let isSupabaseConfigured = 
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  supabaseKey !== 'your-anon-key';

let supabase = null;
if (isSupabaseConfigured) {
  try {
    if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
      throw new Error('Supabase URL phải bắt đầu bằng http:// hoặc https:// (Ví dụ: https://xyz.supabase.co)');
    }
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client initialized successfully.');
  } catch (err) {
    isSupabaseConfigured = false;
    supabase = null;
    console.error('\n======================================================================');
    console.error('LỖI KHỞI TẠO SUPABASE CLIENT:', err.message);
    console.error('Vui lòng kiểm tra lại cấu hình SUPABASE_URL trong tệp .env');
    console.error('======================================================================\n');
  }
} else {
  console.warn('\n======================================================================');
  console.warn('WARNING: Supabase URL and Key have not been configured in backend/.env!');
  console.warn('Please update the variables SUPABASE_URL and SUPABASE_KEY in the .env file');
  console.warn('and run the SQL initialization script on Supabase SQL Editor.');
  console.warn('======================================================================\n');
}

// Middleware to check if database is connected
const checkDBConnection = (req, res, next) => {
  return next();
  if (!isSupabaseConfigured || !supabase) {
    return res.status(500).json({ 
      message: 'Cơ sở dữ liệu Supabase chưa được cấu hình. Vui lòng mở tệp backend/.env và điền thông tin Supabase URL và Anon Key.' 
    });
  }
  next();
};

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

// Register
app.post('/api/auth/register', checkDBConnection, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin!' });
  }

  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      const emailNormalized = normalizeEmail(email);
      const userExists = db.users.some(user => normalizeEmail(user.email) === emailNormalized);

      if (userExists) {
        return res.status(400).json({ message: 'Email already exists!' });
      }

      const nextId = db.users.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1;
      const newUser = {
        id: nextId,
        firstName,
        lastName,
        email: emailNormalized,
        password,
        role: 'user'
      };

      db.users.push(newUser);
      writeLocalDB(db);

      return res.status(201).json({
        message: 'Register successfully!',
        user: toSafeUser(newUser)
      });
    }

    // Check if user exists
    const { data: userExists, error: searchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizeEmail(email))
      .maybeSingle();

    if (searchError) throw searchError;

    if (userExists) {
      return res.status(400).json({ message: 'Email đã tồn tại trên hệ thống!' });
    }

    // Insert user (database column is snake_case: first_name, last_name, email, password, role)
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{
        first_name: firstName,
        last_name: lastName,
        email: normalizeEmail(email),
        password: password,
        role: 'user'
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    // Return camelCase mapped user
    res.status(201).json({
      message: 'Đăng ký tài khoản thành công!',
      user: {
        id: newUser.id,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        email: newUser.email,
        role: String(newUser.role || 'user').toLowerCase()
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi đăng ký tài khoản.', detail: error.message });
  }
});

// Login
app.post('/api/auth/login', checkDBConnection, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu!' });
  }

  try {
    if (useLocalDB()) {
      const user = findLocalUserByCredentials(email, password);

      if (!user) {
        return res.status(401).json({ message: 'Email or password is incorrect!' });
      }

      return res.status(200).json({
        message: 'Login successfully!',
        user: toSafeUser(user)
      });
    }

    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', normalizeEmail(email))
      .eq('password', password)
      .maybeSingle();

    if (findError) {
      const localUser = findLocalUserByCredentials(email, password);

      if (localUser) {
        return res.status(200).json({
          message: 'Login successfully!',
          user: toSafeUser(localUser)
        });
      }

      throw findError;
    }

    if (!user) {
      const localUser = findLocalUserByCredentials(email, password);

      if (!localUser) {
        return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác!' });
      }

      return res.status(200).json({
        message: 'Login successfully!',
        user: toSafeUser(localUser)
      });
    }

    res.status(200).json({
      message: 'Đăng nhập thành công!',
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: String(user.role || 'user').toLowerCase()
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi đăng nhập.', detail: error.message });
  }
});

// Get User List (Admin Dashboard)
app.get('/api/users', checkDBConnection, async (req, res) => {
  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      return res.status(200).json(db.users);
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    // Map columns to camelCase for React client
    const mappedUsers = users.map(u => ({
      id: u.id,
      firstName: u.first_name,
      lastName: u.last_name,
      email: u.email,
      password: u.password,
      role: u.role
    }));

    res.status(200).json(mappedUsers);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách tài khoản.', detail: error.message });
  }
});


// ==========================================
// PRODUCTS ENDPOINTS
// ==========================================

// Get All Products
app.get('/api/products', checkDBConnection, async (req, res) => {
  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      return res.status(200).json(db.products);
    }

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    // Map columns to camelCase for React client
    const mappedProducts = products.map(p => ({
      id: p.id,
      name: p.name,
      price: parseFloat(p.price),
      originalPrice: p.original_price ? parseFloat(p.original_price) : parseFloat(p.price),
      discount: p.discount || 0,
      rating: p.rating ? parseFloat(p.rating) : 5.0,
      reviews: p.reviews || 0,
      images: p.images || [],
      description: p.description || '',
      weight: p.weight || '1kg',
      type: p.type || 'Thực vật',
      brand: p.brand || 'Healthy Food',
      packageQuantity: p.package_quantity || 1,
      manufacturer: p.manufacturer || 'Healthy Food',
      netQuantity: p.net_quantity || '1kg',
      dimensions: p.dimensions || '10x10 cm'
    }));

    res.status(200).json(mappedProducts);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Lỗi khi tải danh sách sản phẩm.', detail: error.message });
  }
});

// Get Single Product
app.get('/api/products/:id', checkDBConnection, async (req, res) => {
  const { id } = req.params;
  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      const product = db.products.find(product => String(product.id) === String(id));

      if (!product) {
        return res.status(404).json({ message: 'Product not found!' });
      }

      return res.status(200).json(product);
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
    }

    res.status(200).json({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      originalPrice: product.original_price ? parseFloat(product.original_price) : parseFloat(product.price),
      discount: product.discount || 0,
      rating: product.rating ? parseFloat(product.rating) : 5.0,
      reviews: product.reviews || 0,
      images: product.images || [],
      description: product.description || '',
      weight: product.weight || '1kg',
      type: product.type || 'Thực vật',
      brand: product.brand || 'Healthy Food',
      packageQuantity: product.package_quantity || 1,
      manufacturer: product.manufacturer || 'Healthy Food',
      netQuantity: product.net_quantity || '1kg',
      dimensions: product.dimensions || '10x10 cm'
    });
  } catch (error) {
    console.error('Get single product error:', error);
    res.status(500).json({ message: 'Lỗi hệ thống khi tải sản phẩm.', detail: error.message });
  }
});

// Add Product
app.post('/api/products', checkDBConnection, async (req, res) => {
  const { name, price, originalPrice, discount, description, weight, type, brand, images, packageQuantity, manufacturer, netQuantity, dimensions } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: 'Tên sản phẩm và Giá là bắt buộc!' });
  }

  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      const nextId = db.products.reduce((max, product) => Math.max(max, Number(product.id) || 0), 0) + 1;
      const newProduct = {
        id: nextId,
        name,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price),
        discount: discount ? parseInt(discount) : 0,
        rating: 5.0,
        reviews: 0,
        images: images && images.length > 0 ? images : ['./assets/images/product/Papaya-first.png'],
        description: description || '',
        weight: weight || '1kg',
        type: type || 'Thá»±c váº­t',
        brand: brand || 'Healthy Food',
        packageQuantity: packageQuantity ? parseInt(packageQuantity) : 1,
        manufacturer: manufacturer || 'Healthy Food',
        netQuantity: netQuantity || '1kg',
        dimensions: dimensions || '10x10 cm'
      };

      db.products.push(newProduct);
      writeLocalDB(db);

      return res.status(201).json({
        message: 'Product created successfully!',
        product: newProduct
      });
    }

    const { data: newProduct, error } = await supabase
      .from('products')
      .insert([{
        name,
        price: parseFloat(price),
        original_price: originalPrice ? parseFloat(originalPrice) : parseFloat(price),
        discount: discount ? parseInt(discount) : 0,
        rating: 5.0,
        reviews: 0,
        images: images && images.length > 0 ? images : ['./assets/images/product/Papaya-first.png'],
        description: description || '',
        weight: weight || '1kg',
        type: type || 'Thực vật',
        brand: brand || 'Healthy Food',
        package_quantity: packageQuantity ? parseInt(packageQuantity) : 1,
        manufacturer: manufacturer || 'Healthy Food',
        net_quantity: netQuantity || '1kg',
        dimensions: dimensions || '10x10 cm'
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Thêm sản phẩm thành công!',
      product: {
        id: newProduct.id,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        originalPrice: parseFloat(newProduct.original_price),
        discount: newProduct.discount,
        rating: parseFloat(newProduct.rating),
        reviews: newProduct.reviews,
        images: newProduct.images,
        description: newProduct.description,
        weight: newProduct.weight,
        type: newProduct.type,
        brand: newProduct.brand,
        packageQuantity: newProduct.package_quantity,
        manufacturer: newProduct.manufacturer,
        netQuantity: newProduct.net_quantity,
        dimensions: newProduct.dimensions
      }
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'Lỗi khi thêm sản phẩm mới.', detail: error.message });
  }
});

// Update Product
app.put('/api/products/:id', checkDBConnection, async (req, res) => {
  const { id } = req.params;
  const { name, price, originalPrice, discount, description, weight, type, brand, images, packageQuantity, manufacturer, netQuantity, dimensions } = req.body;

  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      const productIndex = db.products.findIndex(product => String(product.id) === String(id));

      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found!' });
      }

      const currentProduct = db.products[productIndex];
      const updatedProduct = {
        ...currentProduct,
        name: name !== undefined ? name : currentProduct.name,
        price: price !== undefined ? parseFloat(price) : currentProduct.price,
        originalPrice: originalPrice !== undefined ? parseFloat(originalPrice) : currentProduct.originalPrice,
        discount: discount !== undefined ? parseInt(discount) : currentProduct.discount,
        description: description !== undefined ? description : currentProduct.description,
        weight: weight !== undefined ? weight : currentProduct.weight,
        type: type !== undefined ? type : currentProduct.type,
        brand: brand !== undefined ? brand : currentProduct.brand,
        images: images !== undefined ? images : currentProduct.images,
        packageQuantity: packageQuantity !== undefined ? parseInt(packageQuantity) : currentProduct.packageQuantity,
        manufacturer: manufacturer !== undefined ? manufacturer : currentProduct.manufacturer,
        netQuantity: netQuantity !== undefined ? netQuantity : currentProduct.netQuantity,
        dimensions: dimensions !== undefined ? dimensions : currentProduct.dimensions
      };

      db.products[productIndex] = updatedProduct;
      writeLocalDB(db);

      return res.status(200).json({
        message: 'Product updated successfully!',
        product: updatedProduct
      });
    }

    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update({
        name,
        price: price !== undefined ? parseFloat(price) : undefined,
        original_price: originalPrice !== undefined ? parseFloat(originalPrice) : undefined,
        discount: discount !== undefined ? parseInt(discount) : undefined,
        description,
        weight,
        type,
        brand,
        package_quantity: packageQuantity !== undefined ? parseInt(packageQuantity) : undefined,
        manufacturer,
        net_quantity: netQuantity,
        dimensions,
        images
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      message: 'Cập nhật sản phẩm thành công!',
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: parseFloat(updatedProduct.price),
        originalPrice: parseFloat(updatedProduct.original_price),
        discount: updatedProduct.discount,
        rating: parseFloat(updatedProduct.rating),
        reviews: updatedProduct.reviews,
        images: updatedProduct.images,
        description: updatedProduct.description,
        weight: updatedProduct.weight,
        type: updatedProduct.type,
        brand: updatedProduct.brand,
        packageQuantity: updatedProduct.package_quantity,
        manufacturer: updatedProduct.manufacturer,
        netQuantity: updatedProduct.net_quantity,
        dimensions: updatedProduct.dimensions
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm.', detail: error.message });
  }
});

// Delete Product
app.delete('/api/products/:id', checkDBConnection, async (req, res) => {
  const { id } = req.params;
  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      const initialLength = db.products.length;
      db.products = db.products.filter(product => String(product.id) !== String(id));

      if (db.products.length === initialLength) {
        return res.status(404).json({ message: 'Product not found!' });
      }

      writeLocalDB(db);
      return res.status(200).json({ message: 'Product deleted successfully!' });
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Xóa sản phẩm thành công!' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm.', detail: error.message });
  }
});


// ==========================================
// CONTACT ENDPOINTS
// ==========================================

// Get All Contacts
app.get('/api/contacts', checkDBConnection, async (req, res) => {
  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      return res.status(200).json(db.contacts || []);
    }

    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const mappedContacts = contacts.map(c => ({
      id: c.id,
      name: c.name,
      surname: c.surname || '',
      email: c.email,
      message: c.message,
      createdAt: c.created_at
    }));

    res.status(200).json(mappedContacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Lỗi khi tải danh sách tin nhắn liên hệ.', detail: error.message });
  }
});

// Submit Contact Form
app.post('/api/contacts', checkDBConnection, async (req, res) => {
  const { name, surname, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Tên, Email và Tin nhắn là bắt buộc!' });
  }

  try {
    if (useLocalDB()) {
      const db = readLocalDB();
      const contacts = db.contacts || [];
      const nextId = contacts.reduce((max, contact) => Math.max(max, Number(contact.id) || 0), 0) + 1;
      const newContact = {
        id: nextId,
        name,
        surname: surname || '',
        email,
        message,
        createdAt: new Date().toISOString()
      };

      contacts.unshift(newContact);
      db.contacts = contacts;
      writeLocalDB(db);

      return res.status(201).json({
        message: 'Contact submitted successfully!',
        contact: newContact
      });
    }

    const { data: newContact, error } = await supabase
      .from('contacts')
      .insert([{
        name,
        surname: surname || '',
        email,
        message
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Gửi tin nhắn liên hệ thành công!',
      contact: {
        id: newContact.id,
        name: newContact.name,
        surname: newContact.surname,
        email: newContact.email,
        message: newContact.message,
        createdAt: newContact.created_at
      }
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ message: 'Lỗi khi lưu tin nhắn liên hệ.', detail: error.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
