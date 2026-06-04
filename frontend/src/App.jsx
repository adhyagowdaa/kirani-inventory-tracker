import { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = "https://kirana-backend-api-zc3s.onrender.com";

function App() {
  const [products, setProducts] = useState([]);
  
  // Form State
  const [name, setName] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [minThreshold, setMinThreshold] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Dairy');

  const fetchProducts = () => {
    axios.get(`${API_URL}/api/products`)
      .then(res => {
        if (res.data.success) {
          setProducts(res.data.data);
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      currentStock: Number(currentStock),
      minThreshold: Number(minThreshold),
      price: Number(price),
      category
    };

    axios.post(`${API_URL}/api/products`, newProduct)
      .then(res => {
        if (res.data.success) {
          fetchProducts();
          setName('');
          setCurrentStock('');
          setMinThreshold('');
          setPrice('');
        }
      })
      .catch(err => console.error("Error adding product:", err));
  };

  const handleUpdateStock = (id, newStockValue) => {
    if (newStockValue < 0) return;
    axios.put(`${API_URL}/api/products/${id}`, { currentStock: newStockValue })
      .then(res => {
        if (res.data.success) {
          fetchProducts();
        }
      })
      .catch(err => console.error("Error updating stock:", err));
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      axios.delete(`${API_URL}/api/products/${id}`)
        .then(res => {
          if (res.data.success) {
            fetchProducts();
          }
        })
        .catch(err => console.error("Error deleting product:", err));
    }
  };

  // Shared styling for input fields to keep them perfectly consistent
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    background: '#ffffff',
    color: '#333333',
    fontSize: '14px',
    boxSizing: 'border-box',
    marginTop: '6px'
  };

  const labelStyle = {
    fontWeight: '600',
    fontSize: '14px',
    color: '#444'
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#333' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '35px', fontSize: '2.2rem', fontWeight: '700' }}>🏪 Kirana Inventory Dashboard</h1>
      
      {/* CLEAN & ORGANIZED ADD PRODUCT FORM */}
      <div style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#111', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>➕ Add New Stock Item</h3>
        
        <form onSubmit={handleAddProduct}>
          {/* Row 1: Item Name & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Item Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} placeholder="e.g. Amul Butter 500g" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                <option value="Dairy">Dairy</option>
                <option value="Snacks">Snacks</option>
                <option value="Grains">Grains & Staples</option>
                <option value="Beverages">Beverages</option>
                <option value="Household">Household</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price, Stock, and Warning Threshold */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={labelStyle}>Price (₹)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} required style={inputStyle} placeholder="0" />
            </div>
            <div>
              <label style={labelStyle}>Current Stock Units</label>
              <input type="number" value={currentStock} onChange={e => setCurrentStock(e.target.value)} required style={inputStyle} placeholder="0" />
            </div>
            <div>
              <label style={labelStyle}>Minimum Warning Threshold</label>
              <input type="number" value={minThreshold} onChange={e => setMinThreshold(e.target.value)} required style={inputStyle} placeholder="e.g. 5" />
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' }}>
            Save to Inventory
          </button>
        </form>
      </div>

      {/* INVENTORY TABLE */}
      <h2 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>📦 Live Stock Metrics</h2>
      <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', color: '#555', borderBottom: '2px solid #eaeaea', textAlign: 'left' }}>
              <th style={{ padding: '16px' }}>Product Name</th>
              <th style={{ padding: '16px' }}>Category</th>
              <th style={{ padding: '16px' }}>Price</th>
              <th style={{ padding: '16px' }}>Available Stock</th>
              <th style={{ padding: '16px' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const isLowStock = product.currentStock <= product.minThreshold;
              return (
                <tr key={product._id} style={{ borderBottom: '1px solid #eee', background: isLowStock ? '#fffbf0' : '#fff' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>{product.name}</td>
                  <td style={{ padding: '16px', color: '#666' }}>{product.category}</td>
                  <td style={{ padding: '16px', fontWeight: '500' }}>₹{product.price}</td>
                  
                  {/* Stock counter */}
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => handleUpdateStock(product._id, product.currentStock - 1)} style={{ padding: '4px 10px', background: '#f0f0f2', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#555' }}>−</button>
                      <span style={{ minWidth: '70px', textAlign: 'center', fontWeight: '600' }}>{product.currentStock} units</span>
                      <button onClick={() => handleUpdateStock(product._id, product.currentStock + 1)} style={{ padding: '4px 10px', background: '#f0f0f2', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#555' }}>+</button>
                    </div>
                  </td>

                  <td style={{ padding: '16px' }}>
                    {isLowStock ? (
                      <span style={{ color: '#b7791f', background: '#fef3c7', padding: '6px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '12px' }}>⚠️ LOW STOCK</span>
                    ) : (
                      <span style={{ color: '#155724', background: '#d4edda', padding: '6px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '12px' }}>✅ Healthy</span>
                    )}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <button onClick={() => handleDeleteProduct(product._id)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>🗑️ Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;