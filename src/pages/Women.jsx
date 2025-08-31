import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaHeart, FaShoppingCart, FaPlus, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "https://lawrose-apps.onrender.com/api";

const fetchData = async (url, options = {}) => {
  try {
    const res = await axios({ url, ...options });
    return res.data;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    return null;
  }
};

export default function Women() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const femaleCategorySlugs = ["dresses", "tops", "bottoms", "accessories"];

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      const data = await Promise.all(
        femaleCategorySlugs.map(slug => fetchData(`${BASE_URL}/categories/slug/${slug}`))
      );
      setCategories(data.filter(Boolean));
      setLoadingCategories(false);
    };

    const fetchFeatured = async () => {
      setLoadingFeatured(true);
      const data = await fetchData(`${BASE_URL}/collections/featured?limit=4`);
      setFeatured(data || []);
      setLoadingFeatured(false);
    };

    fetchCategories();
    fetchFeatured();
  }, []);

  const handleAddToCart = async (category) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in to add items to your cart");
      if (!category?.subcategories?.length) return alert("No products found");

      const product = await fetchData(`${BASE_URL}/products/${category.subcategories[0].slug}`);
      if (!product) return alert("Product not found");

      await axios.post(`${BASE_URL}/cart/items`, {
        productId: product.id,
        variantId: product?.variants?.[0]?.id || "",
        quantity: 1,
        selectedColor: product?.variants?.[0]?.color || "Default",
        selectedSize: product?.variants?.[0]?.size || "M",
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert(`Added ${product.name} to cart!`);
    } catch (err) {
      console.error(err);
      alert(err.response?.status === 401 ? "Session expired" : "Failed to add to cart");
    }
  };

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
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSelect = (item) => {
    setSearchTerm("");
    setResults([]);
    if (item.slug) navigate(`/product/${item.slug}`);
  };
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

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
   
      {/* Hero */}
      <section className="relative">
        <div className="h-96 w-full bg-center bg-cover" style={{ backgroundImage: "url('/collectionbg.png')" }}>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center mt-10 max-w-6xl px-6">
              <p className="mt-4 tracking-[0.8em] uppercase text-white/90">Women</p>
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">Discover sophisticated womenswear crafted for modern ladies. From timeless essentials to contemporary pieces.</h1>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="flex justify-between mb-4">
               <div className="text-left">
                 <h2 className="text-xl font-bold">New arrivals</h2>
                 <p className="text-xs md:text-sm">The latest additions to our women's collection</p>
               </div>
               <Link to="/shop" className="text-sm text-gray-600">View all →</Link>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {new Array(4).fill({
                 name: "Premium Casual Shirt",
                 price: "₦12,000",
                 image: "/woman.png",
               }).map((item, idx) => (
                 <div key={idx} className="rounded-lg overflow-hidden hover:shadow-md bg-white">
                   <div className="bg-gray-100 p-4 flex items-center justify-center">
                     <img src={item.image} alt={item.name} className="w-full" />
                   </div>
                   <div className="p-3 flex items-center justify-between">
                     <div>
                       <div className="text-xs md:text-sm font-medium text-gray-900">{item.name}</div>
                       <div className="text-xs md:text-sm text-gray-600">{item.price}</div>
                     </div>
                     <button className="bg-transparent border border-gray-400 text-gray-500 p-2 rounded-md flex items-center justify-center hover:bg-gray-200">
                       <FaPlus size={14} />
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </section>
     

      {/* Shop by Category */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl text-center font-bold mb-2">Shop by Category</h2>
          <p className="text-xs md:text-sm text-center mb-6">Explore curated categories for the modern woman's lifestyle</p>
          {loadingCategories ? (
            <p className="text-center">Loading categories...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white border rounded-lg overflow-hidden">
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-sm md:text-xl font-semibold">{cat.name}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{cat.description}</p>
                    <button onClick={() => handleAddToCart(cat)} className="text-xs md:text-sm mt-2 inline-block text-blue-600 hover:underline">Shop now →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl text-center font-bold mb-2">Featured Collections</h2>
        <p className="text-xs md:text-sm text-center mb-6">Discover signature collections crafted for the modern lady</p>
        {loadingFeatured ? <p className="text-center">Loading featured collections...</p> :
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featured.map(fc => (
              <CollectionCard key={fc.id} {...fc} slug={`/collections/${fc.slug}`} />
            ))}
          </div>}
      </section>

      <Footer />
    </div>
  );
}

function CollectionCard({ imageUrl, name, description, productCount, slug }) {
  return (
    <article className="bg-white h-full rounded-lg overflow-hidden shadow-sm border">
      <div className="h-96 bg-gray-100 overflow-hidden">
        <img src={imageUrl || '/woman.png'} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <span className="text-xs text-black bg-gray-400 px-2 py-1 rounded-lg inline-block">{name}</span>
        <h3 className="mt-3 text-lg font-bold">{name}</h3>
        <p className="mt-2 text-xs md:text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs md:text-sm text-gray-500">{productCount || 0} Pieces available</div>
          <Link to={slug} className="text-xs md:text-sm text-black inline-flex items-center">Explore collection →</Link>
        </div>
      </div>
    </article>
  );
}


// Example Footer component (you can keep your existing footer)
function Footer() {
return (
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
);
}
