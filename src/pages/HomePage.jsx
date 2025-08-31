import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBars,
  FaEnvelope,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaPlus,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "https://lawrose-apps.onrender.com/api";

export default function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`${API_BASE}/products`, { withCredentials: true }),
          axios.get(`${API_BASE}/categories`, { withCredentials: true }),
        ]);

        const productData = productRes?.data?.data ?? [];
        const categoryData = categoryRes?.data?.categories ?? [];

        if (!productData.length) {
          setError("No products available at the moment.");
        }

        setProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const productId = product._id || product.id;
      if (!productId) {
        alert("Invalid product.");
        return;
      }

      const res = await axios.post(
        `${API_BASE}/cart/items`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Item added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Failed to add item to cart.");
      }
    }
  };

  // Live search suggestions
  useEffect(() => {
    if (!searchTerm) return setResults([]);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products/search/suggestions`, {
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

  if (loading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }
    return (
    <div className="font-libre overflow-x-hidden w-full bg-white text-black">
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

      {/* Banner */}
      <section className="w-full px-4 sm:px-6 md:px-2">
        <div
          className="w-full h-[500px] mt-5 bg-cover bg-center"
          style={{ backgroundImage: `url('/banner.png')` }}
        />

        {/* Product Grid */}
        <section className="py-10 px-4 md:px-16">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">No Product Availiable </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 8).map((item) => (
                <div
                  key={item._id || item.id}
                  className="rounded-lg overflow-hidden hover:shadow-md bg-white"
                >
                  <div className="bg-gray-100 p-4 flex items-center justify-center">
                    <img
                      src={item.featuredImage || "/shirt.png"}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-600">₦{item.price}</div>
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
          )}
            <div className="text-center mt-8">
                   <Link to="/collection"> <button className="border hover:bg-black hover:text-white px-8 py-2 text-sm">Explore</button></Link>
                  </div>
        </section>
      </section>
      
            {/* Middle Banner */}
            <section className="relative bg-black/50 my-10">
              <img
                src="/peace.png"
                className="w-full object-cover h-[400px]"
                alt="peace"
              />
              <div className="absolute inset-0  mt-20 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-semibold mb-3">Peace Within</h2>
                <p className="text-sm mb-4 text-center max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis non diam malesuada placerat.
                </p>
               <Link to="/collection"> <button className="border hover:bg-black hover:text-white px-8 py-2 text-sm">Explore</button></Link>
              </div>
            </section>
           
   {/* Categories Section */}
{loading ? (
  <p className="text-center">Loading categories...</p>
) : error ? (
  <p className="text-center text-red-500">No Categories Available</p>
) : (
  <section className="py-10 px-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-6">
    {categories.map((category, idx) => (
      <div key={category._id || idx} className="text-center">
        <img
          src={category.image || "/placeholder-category.jpg"} // fallback if image missing
          className="w-full h-80 object-cover mb-3"
          alt={category.name}
        />
        <p className="text-sm font-medium">{category.name}</p>
      </div>
    ))}
  </section>
)}

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
