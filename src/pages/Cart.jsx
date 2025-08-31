import React, { useState, useEffect } from "react";
import {
  FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram,
  FaMinus, FaPlus, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const BASE_URL = "https://lawrose-apps.onrender.com/api";
  const token = localStorage.getItem("token");

  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();

  // Live search suggestions
  useEffect(() => {
    if (!searchTerm) return setResults([]);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/products/search/suggestions`, {
          params: { q: searchTerm, limit: 10 },
        });
        setResults(data || []);
      } catch (err) {
        console.error("Search suggestions error:", err);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSelect = (item) => {
    setSearchTerm("");
    setResults([]);
    if (item.slug) navigate(`/product/${item.slug}`);
  };

  // Fetch cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setCartItems(res.data.data?.items || []);
        setCartSummary(res.data.data?.summary || {});
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      if (res.data.success) setProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCart(), fetchProducts()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Update quantity
  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
    try {
      await axios.put(`${BASE_URL}/cart/items/${itemId}`, { quantity: newQty }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Delete item
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${BASE_URL}/cart/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(prev => prev.filter(i => i.id !== itemId));
      await fetchCart();
    } catch (err) {
      console.error("Error deleting cart item:", err);
    }
  };

  // Apply coupon
  const applyCoupon = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/cart/apply-coupon`,
        { code: coupon },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setDiscount(res.data.discount || 0);
    } catch (err) {
      console.error("Error applying coupon:", err);
    }
  };

  const handleContinue = () => {
    if (!isChecked) {
      setError("You must agree to the Terms and Conditions before continuing.");
      return;
    }
    navigate("/continue");
  };

  // Add product to cart
  const handleAddToCart = async (product) => {
    try {
      await axios.post(`${BASE_URL}/cart/items`, {
        productId: product.id,
        variantId: product.variantId || null,
        quantity: 1,
        selectedColor: product.color || null,
        selectedSize: product.size || null,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="font-libre w-full overflow-x-hidden bg-white text-black">

      {/* Header */}
     <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-8 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <Link to="/"><img src="/logo.png" alt="Logo" className="h-8 w-auto" /></Link>
          
                    <nav className="hidden md:flex items-center gap-4 text-sm relative">
                      <Link to="/men" className="hover:underline">Men</Link>
                      <Link to="/women" className="hover:underline">Women</Link>
                      <div className="relative">
                        <button onClick={() => setOpenDropdown(!openDropdown)} className="hover:underline flex items-center gap-1">
                          Collection
                          <svg className="w-3 h-3 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openDropdown && (
                          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                            {[{ name: "Spring-Summer", path: "/summer" }, 
                              { name: "Autumn-Winter", path: "/winter" },
                              { name: "Core Collections", path: "/core" },
                              { name: "Golf Club Collection", path: "/golf" }]
                              .map(col => (
                                <Link key={col.name} to={col.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{col.name}</Link>
                              ))}
                          </div>
                        )}
                      </div>
                      <Link to="/shop" className="hover:underline">Shop</Link>
                    </nav>
                  </div>
          
                  {/* Right Side Icons */}
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="hidden md:flex items-center gap-3 relative w-80">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border px-3 py-2 rounded-lg w-full"
                      />
                      <FaSearch size={16} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                      {searchTerm && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                          {results.length ? results.map(item => (
                            <div key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={() => handleSearchSelect(item)}>
                              {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded" />}
                              <span>{item.name}</span>
                            </div>
                          )) : <div className="px-4 py-2 text-gray-500">No products found</div>}
                        </div>
                      )}
                    </div>
          
                    <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"><FaHeart size={16} /></button>
                    <Link to="/cart">
                      <button className="relative p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
                        <FaShoppingCart size={16} />
                        <span className="absolute top-0 right-0 inline-flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                        </span>
                      </button>
                    </Link>
                    <button><img src="/model.png" alt="user" className="w-6 h-6 rounded-full object-cover" /></button>
                    <button className="md:hidden p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
                      {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>
                  </div>
          
                  {/* Mobile Nav */}
                  {menuOpen && (
                    <nav className="absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col p-4 md:hidden shadow-lg">
                      <Link to="/men" className="py-2 border-b">Men</Link>
                      <Link to="/women" className="py-2 border-b">Women</Link>
                      <div className="relative">
                        <button onClick={() => setOpenDropdown(!openDropdown)} className="w-full flex justify-between items-center py-2 border-b">
                          Collection
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        </button>
                        {openDropdown && (
                          <div className="flex flex-col pl-4">
                            {[{ name: "Spring-Summer", path: "/summer" }, 
                              { name: "Autumn-Winter", path: "/winter" },
                              { name: "Core Collections", path: "/core" },
                              { name: "Golf Club Collection", path: "/golf" }]
                              .map(col => <Link key={col.name} to={col.path} className="py-2 border-b text-gray-700 hover:bg-gray-100">{col.name}</Link>)}
                          </div>
                        )}
                      </div>
                      <Link to="/shop" className="py-2 border-b">Shop</Link>
                       <div className="py-2 md:flex items-center gap-3 relative w-80">
                                          <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="border px-3 py-2 rounded-lg w-full"
                                          />
                                          <FaSearch size={16} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                                          {searchTerm && (
                                            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                                              {results.length ? results.map(item => (
                                                <div key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={() => handleSearchSelect(item)}>
                                                  {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded" />}
                                                  <span>{item.name}</span>
                                                </div>
                                              )) : <div className="px-4 py-2 text-gray-500">No products found</div>}
                                            </div>
                                          )}
                                        </div>
                    </nav>
                  )}
                </header>

      {/* Cart & Summary */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left: Cart Items */}
        <div className="md:col-span-2 border p-4 rounded-lg bg-white">
          <div className="flex justify-between items-center pb-2 mb-4">
            <h2 className="font-semibold text-lg">YOUR CART</h2>
            <span className="text-sm text-blue-900">
              ({cartSummary?.itemCount || 0} products, {cartSummary?.totalQuantity || 0} items)
            </span>
          </div>

          {cartItems.length ? cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-1 px-4 min-w-0">
                <h3 className="font-medium truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 truncate">{item.color}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded"><FaMinus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded"><FaPlus /></button>
                </div>
              </div>
              <div className="text-right min-w-[80px]">
                <button onClick={() => handleDelete(item.id)} className="text-red-600 underline text-xs mb-1">Delete</button>
                <p className="font-medium">₦{item.price?.toLocaleString()}</p>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-4">ORDER SUMMARY</h3>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₦{cartSummary?.subtotal?.toLocaleString() || 0}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span>₦{cartSummary?.shippingCost?.toLocaleString() || 0}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 mb-2">
              <span>Discount</span>
              <span>-₦{discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>TOTAL (TAX INCL.)</span>
            <span>₦{((cartSummary?.totalAmount || 0) - discount).toLocaleString()}</span>
          </div>

          <div className="flex items-center mt-4">
            <input type="text" placeholder="Enter coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 border px-3 py-2 rounded mr-2" />
            <button onClick={applyCoupon} className="px-4 py-2 bg-gray-800 text-white rounded">Apply</button>
          </div>

          <label className="flex items-center text-xs text-gray-600 mb-2 mt-4">
            <input type="checkbox" className="mr-2" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            I agree to the Terms and Conditions
          </label>
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          <button onClick={handleContinue} className="w-full bg-black text-white py-2 rounded mt-2">CONTINUE</button>
        </div>
      </div>

      {/* Recommendations */}
      <section className="col-span-3 py-10 px-4 md:px-16">
        <h2 className="text-xl text-center mb-5 font-semibold">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map(item => (
            <div key={item.id} className="rounded-lg overflow-hidden hover:shadow-md bg-white">
              <div className="bg-gray-100 p-4 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-gray-900 truncate">{item.name}</div>
                  <div className="text-xs text-gray-600">₦{item.price?.toLocaleString()}</div>
                </div>
                <button onClick={() => handleAddToCart(item)}
                  className="bg-transparent border border-gray-400 text-gray-500 p-2 rounded-md flex items-center justify-center hover:bg-gray-200">
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-[#00071B] text-white py-10 px-6 md:px-16 text-sm">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <div>
                <h4 className="font-bold mb-2">Women</h4>
                <ul>
                  <li className="text-sm my-2">Dresses</li>
                  <li className="text-sm my-2">Tops</li>
                  <li className="text-sm my-2">Bottoms</li>
                  <li className="text-sm my-2">Accessories</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Men</h4>
                <ul>
                  <li className="text-sm my-2">Shirts</li>
                  <li className="text-sm my-2">Trousers</li>
                  <li className="text-sm my-2">Footwears</li>
                  <li className="text-sm my-2">Watches</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Kids</h4>
                <ul>
                  <li className="text-sm my-2">Age 2-5</li>
                  <li className="text-sm my-2">Age 6-10</li>
                  <li className="text-sm my-2">Accessories</li>
                  <li className="text-sm my-2">Shoes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Shopping</h4>
                <ul>
                  <li className="text-sm my-2">My Cart</li>
                  <li className="text-sm my-2">Wishlist</li>
                  <li className="text-sm my-2">Track Order</li>
                  <li className="text-sm my-2">Help Desk</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">More links</h4>
                <ul className="text-sm my-2">
                  <li className="text-sm my-2">Contact Us</li>
                  <li className="text-sm my-2">Blog</li>
                  <li className="text-sm my-2">FAQs</li>
                  <li className="text-sm my-2">About</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold my-2 mb-2">Stay In Touch</h4>
                <p className="font-semibold text-xs my-4 mb-2">
                  Stay in touch to get special offers, free giveaways and once in a lifetime deals
                </p>
          
                {/* Responsive email input */}
                <div className="flex items-center my-6 border border-white rounded-md w-full max-w-xs md:max-w-[200px]">
                  <span className="px-3 text-white">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 p-1 text-xs bg-transparent placeholder-gray-400 text-white outline-none"
                  />
                </div>
              </div>
            </div>
          
            <div className="border-t border-gray-700 mt-10 pt-4 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
              <p className="text-gray-300 cursor-pointer hover:text-white transition">
                Terms & Conditions
              </p>
              <p className="text-gray-400 cursor-pointer hover:text-white transition">
                Privacy Policy
              </p>
              <div className="flex gap-3 text-lg">
                <FaFacebook className="cursor-pointer hover:text-blue-500" />
                <FaInstagram className="cursor-pointer hover:text-pink-500" />
                <FaWhatsapp className="cursor-pointer hover:text-green-500" />
                <FaTwitter className="cursor-pointer hover:text-sky-500" />
              </div>
            </div>
          
            <p className="text-xs text-gray-500 mt-4 text-center">&copy; 2025 Your Store</p>
          </footer> 
    </div>
  );
}
