import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaPlus, FaBars, FaEnvelope, FaFacebook, FaInstagram, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Winter() {
  // Hardcode collection ID for Winter
  const collectionId = "winter";

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); 
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const baseURL = "https://lawrose-apps.onrender.com";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setOpenDropdown(false);
  };

  useEffect(() => {
    fetchCollection();
    fetchWishlist();
  }, []);

  const fetchCollection = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${baseURL}/api/collections/${collectionId}?includeProducts=true`
      );
      const data = await res.json();

      if (data?.products) {
        const mappedProducts = data.products.map((p) => ({
          id: p.id || p._id,
          name: p.name,
          price: p.price ? `₦${p.price}` : "N/A",
          image: p.featuredImage || "/shirt.png",
          category: p.category || "Uncategorized"
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error("Failed to fetch collection products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${baseURL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const productIds = data?.map((item) => item.productId) || [];
      setWishlist(productIds);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await fetch(`${baseURL}/api/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  const categories = [
    'All', 'Shirts', 'Sweatshirt', 'T-Shirt', 'Jackets', 'Polo Shirts',
    'Hoodies', 'Jeans', 'Tailored Trousers', 'Short', 'Sweatpant',
    'Windbreakers', 'Overshirts', 'Dress', 'Footwear', 'Bags',
    'Headwear', 'Eyewaer', 'Socks'
  ];

// Live search suggestions
  useEffect(() => {
    if (!searchTerm) return setResults([]);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data } = await axios.get(`${baseURL}/products/search/suggestions`, {
          params: { q: searchTerm, limit: 10 },
        });
        setResults(data || []);
      } catch (err) {
        console.error("Search suggestions error:", err);
        setResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSelect = (item) => {
    setSearchTerm("");
    setResults([]);
    if (item.slug) navigate(`/product/${item.slug}`);
  };
  

  return (
    <div className="min-h-screen w-full overflow-x-hidden sm:px-6 md:px-3 bg-white text-gray-900">
      {/* Top navigation */}
    
 
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
 

 

      {/* Hero section */}
      <section className="relative">
                  <div
                    className="h-[28rem] w-full bg-center bg-cover"
                    style={{ backgroundImage: "url('/collectionbg.png')" }}
                  >
                    <div className="absolute inset-0 bg-black/50 flex items-center">
                      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                        <div className="max-w-lg">
                          <span className="text-xs md:text-sm text-gray-200 bg-white/20 px-2 py-2 rounded">Autumm Winter 2025</span>
                          <h1 className="text-white text-3xl md:text-4xl font-bold mt-2">Urban Warmth</h1>
                          <p className="mt-3 text-white/90">
                            Sophisticated layers and rich textures define our autumn-winter collection, designed for the modern urban lifestyle
                          </p>
                          <Link to="/continue"><button className="mt-4 px-4 py-2 bg-white text-black rounded">Shop collection</button></Link>
                        </div>
                        <div className="w-full mx-10 md:w-1/2">
                          <img src="/winter.png" alt="Bloom & Breeze" className="rounded-lg md:h-96 h-48 " />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
          

      {/* Story and Inspiration */}
  <section className="max-w-5xl mx-auto px-4 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 border rounded-lg overflow-hidden shadow-sm">
    {/* Image */}
    <img
      src="/winter.png"
      alt="Story"
      className="h-72  object-cover md:h-auto"
    />

    {/* Text Content */}
    <div className="p-6 text-justify">
      <h3 className="font-semibold mb-2">The Story</h3>
      <p className="text-sm text-gray-600 mb-4">
       Sophisticated layers and rich textures define our autumn-winter collection, designed for the modern urban lifestyle
      </p>

      <h3 className="font-semibold mb-2">Inspiration</h3>
      <p className="text-sm text-gray-600 mb-4">
        Mediterranean coastlines, blooming gardens, and the golden hour light
      </p>

      <h3 className="font-semibold mb-2">Key Pieces</h3>
      <ul className="list-disc pl-5 text-sm text-gray-600">
        <li>Linen Blend Shirts</li>
        <li>Lightweight Trousers</li>
        <li>Cotton Polo Shirts</li>
        <li>Summer Jackets</li>
      </ul>
    </div>
  </div>
</section>



      {/* Collection pieces */}
      <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
  {/* Left side - Title */}
  <h2 className="text-lg font-bold">
    Collection pieces ({filteredProducts.length})
  </h2>

  {/* Right side - Tabs */}
  <div className="flex flex-wrap gap-2">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setActiveTab(cat)}
        className={`px-4 py-1 rounded-full text-sm ${
          activeTab === cat
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
</div>


        {/* Products */}
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredProducts.map((product, i) => {
            const isWishlisted = wishlist.includes(product.id); // Directly check from wishlist state
            return (
              <div key={i} className="relative text-center group">
                <button
                  onClick={async () => {
                    // Optimistic update
                    setWishlist(prev =>
                      isWishlisted
                        ? prev.filter(id => id !== product.id)
                        : [...prev, product.id]
                    );
        
                    try {
                      if (isWishlisted) {
                        await fetch(`${baseURL}/api/wishlist/remove/${product.id}`, {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                          }
                        });
                      } else {
                        await fetch(`${baseURL}/api/wishlist/add`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                          },
                          body: JSON.stringify({ productId: product.id })
                        });
                      }
                    } catch (error) {
                      console.error("Wishlist update failed:", error);
                      // Rollback if API fails
                      setWishlist(prev =>
                        isWishlisted
                          ? [...prev, product.id]
                          : prev.filter(id => id !== product.id)
                      );
                    }
                  }}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  {isWishlisted ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
        
                <div className="bg-gray-100 p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-cover"
                  />
                </div>
        
                <div className="p-3 flex justify-between">
                  <div>
                    <p className="mt-2 text-xs md:text-sm font-medium">
                      {product.name}
                    </p>
                    <p className="text-xs md:text-sm text-left text-gray-500">
                      {product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-transparent border border-gray-400 text-gray-500 p-2 rounded-md flex items-center justify-center hover:bg-gray-200"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
      </section>

      {/* Explore other collections */}
      <div className="text-center my-12">
        <h3 className="text-lg font-semibold">Explore other collections</h3>
       <Link to="/collection"> <button className="mt-4 px-6 py-2 bg-black text-white rounded-full">View all collections</button></Link>
      </div>

      {/* Footer */}
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
