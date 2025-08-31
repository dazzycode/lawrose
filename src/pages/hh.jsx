please this the full code you are adding  the  updates please import React, { useState, useEffect } from "react";
import {  FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaPlus, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
const BASE_URL = "https://lawrose-apps.onrender.com/api";
 const [openDropdown, setOpenDropdown] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearchClick = async () => {
    if (!searchTerm) return; // don't search empty
    try {
      const res = await axios.get(`${BASE_URL}/products/search/suggestions`, {
        params: { q: searchTerm, limit: 10 },
      });
      if (res.data.success) {
        setResults(res.data.data); // store results
        console.log("Search results:", res.data.data);
      }
    } catch (err) {
      console.error("Error searching products:", err);
    }
  };
      const handleMenuClick = () => {
        setOpenDropdown(false);
      };
 
      const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!isChecked) {
      setError("You must agree to the Terms and Conditions before continuing.");
      return;
    }
    setError("");
    navigate("/continue"); // proceed to the next page
  };

  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  // Fetch cart + summary
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cart`);
      if (res.data.success) {
        // Assuming cart items are inside res.data.data.items
        setCartItems(res.data.data.items || []); 
        setCartSummary(res.data.data.summary);
      }
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    }
  };

  // Fetch products for recommendations
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
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

  // Delete item from cart
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${BASE_URL}/api/cart/items/${itemId}`);
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
      await fetchCart();
    } catch (err) {
      console.error("❌ Error deleting cart item:", err);
    }
  };

  // Add product to cart
  const handleAddToCart = async (product) => {
    try {
      await axios.post(`${BASE_URL}/api/cart/items`, {
        productId: product.id,
        variantId: product.variantId || null,
        quantity: 1,
        selectedColor: product.color || null,
        selectedSize: product.size || null,
      });
      await fetchCart();
    } catch (err) {
      console.error("❌ Error adding item:", err.response?.data || err);
    }
  };


  if (loading) return <p>Loading...</p>;
  return (
    <div className="font-libre w-full overflow-x-hidden  px-4 sm:px-6 md:px-3 bg-white text-black">

      {/* Header */}

    
  
    <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-8 py-3 flex justify-between items-center">
  {/* Left Side with Logo */}
  <div className="flex items-center gap-6">
    <Link to="/">
      <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
    </Link>

    {/* Desktop Nav */}
    <nav className="hidden md:flex items-center gap-4 text-sm relative">
      <Link to="/men" className="hover:underline">Men</Link>
      <Link to="/women" className="hover:underline">Women</Link>

      {/* Collection Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="hover:underline flex items-center gap-1"
        >
          Collection
          <svg className="w-3 h-3 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openDropdown && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
            {[{ name: "Spring-Summer (25)", path: "/summer" }, { name: "Autumm-Winter (25)", path: "/winter" }, { name: "Core Collections", path: "/core" }, { name: "Golf Club Collection", path: "/golf" }].map((col) => (
              <Link
                key={col.name}
                to={col.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                {col.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link to="/shop" className="hover:underline">Shop</Link>
    </nav>
  </div>

  {/* Right Side Icons */}
  <div className="flex items-center gap-3 text-gray-700">
    {/* Desktop Icons */}
    <div className="hidden md:flex items-center gap-3">
      {/* Search Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button
          onClick={handleSearchClick}
          className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"
        >
          <FaSearch size={16} />
        </button>
      </div>

      <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
        <FaHeart size={16} />
      </button>

      <Link to="/cart">
        <button className="relative p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
          <FaShoppingCart size={16} />
          <span className="absolute top-0 right-0 inline-flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
        </button>
      </Link>

      <button>
        <img src="/model.png" alt="user" className="w-6 h-6 rounded-full object-cover" />
      </button>
    </div>

    {/* Mobile Menu Toggle */}
    <button
      className="md:hidden p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
    </button>
  </div>

  {/* Mobile Nav */}
  {menuOpen && (
    <nav className="absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col p-4 md:hidden shadow-lg">
      {/* Menu Links */}
      <Link to="/men" className="py-2 border-b" onClick={handleMenuClick}>Men</Link>
      <Link to="/women" className="py-2 border-b" onClick={handleMenuClick}>Women</Link>

      {/* Collection Dropdown */}
      <div>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="w-full flex justify-between items-center py-2 border-b"
        >
          Collection
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        </button>
        {openDropdown && (
          <div className="flex flex-col pl-4">
            {[{ name: "Spring-Summer (25)", path: "/summer" }, { name: "Autumm-Winter (25)", path: "/winter" }, { name: "Core Collections", path: "/core" }, { name: "Golf Club Collection", path: "/golf" }].map((col) => (
              <Link
                key={col.name}
                to={col.path}
                className="py-2 border-b text-gray-700 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                {col.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link to="/shop" className="py-2 border-b" onClick={handleMenuClick}>Shop</Link>

      {/* Mobile Icons */}
      <div className="flex flex-col mt-4 gap-3">
        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          />
          <button
            onClick={handleSearchClick}
            className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"
          >
            <FaSearch size={16} />
          </button>
        </div>
       <div className="inline-flex items-center gap-3">
  <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
    <FaHeart size={16} />
  </button>

  <Link to="/cart">
    <button className="relative p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
      <FaShoppingCart size={16} />
      <span className="absolute top-0 right-0 inline-flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
      </span>
    </button>
  </Link>

  <button>
    <img src="/model.png" alt="user" className="w-6 h-6 rounded-full object-cover" />
  </button>
</div>

      </div>
    </nav>
  )}
</header>


      {/* Cart Section */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left: Your Order */}
     <div className="md:col-span-2 border p-4 rounded-lg bg-white">
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 mb-4 gap-2">
    <h2 className="font-semibold text-lg">YOUR ORDER</h2>
    <span className="text-sm text-blue-900">
      {cartSummary?.itemCount ? `(${cartSummary.itemCount} products, ${cartSummary.totalQuantity} items)` : ""}
    </span>
  </div>

  {cartItems.length > 0 ? (
    cartItems.map((item) => (
      <div
        key={item.id}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b last:border-b-0"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full sm:w-32 sm:h-32 h-48 object-cover rounded-md"
        />
        <div className="flex-1 px-0 sm:px-4 mt-3 sm:mt-0">
          <h3 className="font-medium text-base">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{item.color}</p>
          <span className="block text-sm text-blue-900 mt-2">({item.quantity})</span>
        </div>
        <div className="text-right mt-3 sm:mt-0">
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-700 underline text-sm block mb-2"
          >
            Delete
          </button>
          <p className="font-medium text-sm sm:text-base">
            ₦{item.price?.toLocaleString()}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 text-sm mt-10">
      You don’t have any items in your cart yet.
    </p>
  )}
</div>


      {/* Right: Order Summary */}
     <div className="border p-4 rounded-lg bg-white">
  <h3 className="font-semibold mb-4">ORDER SUMMARY</h3>

  {cartSummary && cartSummary.itemCount > 0 ? (
    <>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-xs">Subtotal</span>
        <span className="text-xs">₦{cartSummary.subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm mb-4">
        <span className="text-xs">Shipping</span>
        <span className="text-xs">₦{cartSummary.shippingCost.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-semibold text-lg mt-10 pt-4 mb-4">
        <p>TOTAL <span className="text-xs text-gray-700">(TAX INCL.)</span></p>
        <p>₦{cartSummary.totalAmount.toLocaleString()}</p>
      </div>

      <div className="p-4 max-w-sm mx-auto">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className="text-xs text-gray-600">I agree to the Terms and Conditions</span>
        </div>
        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
        <button
          onClick={handleContinue}
          className="w-full bg-gray-200 hover:bg-black hover:text-white py-2 text-sm font-medium"
        >
          CONTINUE
        </button>
      </div>
    </>
  ) : (
    <p className="text-center text-gray-500 text-sm mt-10">
      You don’t have any orders yet.
    </p>
  )}
</div>


      {/* Recommendations */}
      <section className="col-span-3 py-10 px-4 md:px-16">
        <h2 className="text-xl text-center mb-5 font-semibold">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((item) => (
            <div key={item.id} className="rounded-lg overflow-hidden hover:shadow-md bg-white">
              <div className="bg-gray-100 p-4 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-600">₦{item.price?.toLocaleString()}</div>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-transparent border border-gray-400 text-gray-500 p-2 rounded-md flex items-center justify-center hover:bg-gray-200"
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  
      {/* Footer */}
 <footer className="bg-[#00071B] text-white py-10 px-6 md:px-16 text-sm">
                           <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                             <div>
                               <h4 className="font-bold mb-2">Women</h4>
                               <ul>
                                  <li className="text-sm my-2" >Dresses</li>
                                  <li className="text-sm my-2" >Tops</li>
                                  <li className="text-sm my-2" >Bottoms</li>
                                  <li className="text-sm my-2" >Accessories</li>
                               </ul>
                             </div>
                             <div>
                               <h4 className="font-bold mb-2">Men</h4>
                               <ul>
                                  <li className="text-sm my-2" >Shirts</li>
                                  <li className="text-sm my-2" >Trousers</li>
                                 <li className="text-sm my-2" >Footwears</li>
                                  <li className="text-sm my-2" >Watches</li>
                               </ul>
                             </div>
                             <div>
                               <h4 className="font-bold mb-2">Kids</h4>
                               <ul>
                                  <li className="text-sm my-2" >Age 2-5</li>
                                  <li className="text-sm my-2" >Age 6-10</li>
                                  <li className="text-sm my-2" >Accessories</li>
                                 <li className="text-sm my-2" >Shoes</li>
                               </ul>
                             </div>
                             <div>
                               <h4 className="font-bold mb-2">Shopping</h4>
                               <ul>
                                 <li className="text-sm my-2" >My Cart</li>
               <li className="text-sm my-2" >Wishlist</li>
                                  <li className="text-sm my-2" >Track Order</li>
                                  <li className="text-sm my-2" >Help Desk</li>
                               </ul>
                             </div>
                             <div>
                               <h4 className="font-semibold text-sm mb-2">More links</h4>
                               <ul className="text-sm my-2">
                                 <li className="text-sm my-2" >Contact Us</li>
                                 <li className="text-sm my-2">Blog</li>
                                 <li className="text-sm my-2" >FAQs</li>
                                 <li className="text-sm my-2">About</li>
                               </ul>
                             </div>
                             <div>
                               <h4 className="font-semibold my-2 mb-2">Stay In Touch</h4>
                                                <p className="font-semibold text-xs my-4 mb-2">Stay in touch to get special offers, free giveaways
              and once in a lifetime deals</p>
              
                              <div className="flex items-center my-6 border border-white rounded-md w-[200px]">
                     {/* Email icon */}
                     <span className="px-3 text-white">
                       <FaEnvelope />
                     </span>
                   
                     {/* Email input */}
                     <input
                       type="email"
                       placeholder="Enter your email"
                       className="flex-1 p-2 bg-transparent placeholder-gray-400 text-white outline-none"
                     />
                   </div>
                             </div>
                           </div>
                         <div className="border-t border-gray-700 mt-10 pt-4 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
                {/* Terms & Conditions */}
                <p className="text-gray-300 cursor-pointer hover:text-white transition">
                  Terms & Conditions
                </p>
              
                {/* Privacy Policy */}
                <p className="text-gray-400 cursor-pointer hover:text-white transition">
                  Privacy Policy
                </p>
              
                {/* Social Links */}
                <div className="flex gap-3 text-lg">
                  <FaFacebook className="cursor-pointer hover:text-blue-500" />
                  <FaInstagram className="cursor-pointer hover:text-pink-500" />
                  <FaWhatsapp className="cursor-pointer hover:text-green-500" />
                  <FaTwitter className="cursor-pointer hover:text-sky-500" />
                </div>
              </div>
              
              {/* Copyright */}
              <p className="text-xs text-gray-500 mt-4 text-center">&copy; 2025 Your Store</p>
              
                         </footer>  </div>
  );
}
