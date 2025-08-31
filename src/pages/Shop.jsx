import { useState, useEffect } from "react";
import { FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaPlus, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

export default function Shop() {
  const baseURL = "https://lawrose-apps.onrender.com/api"; // backend base URL
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [price, setPrice] = useState(100000);
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  // Fetch filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get(`${baseURL}/products/filters`);
        const data = res.data;
        setCategories(data.categories || []);
        setCollections(data.collections || []);
        setColors(data.colors || []);
        setSizes(data.sizes || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load filters.");
      }
    };
    fetchFilters();
  }, []);

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const params = {
          categories: selectedCategories.join(","),
          collections: selectedCollections.join(","),
          colors: selectedColors.join(","),
          sizes: selectedSizes.join(","),
          priceMax: price,
          search: search || undefined,
        };
        const res = await axios.get(`${baseURL}/products`, { params });
        setProducts(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products.");
      } finally {
        setLoadingProducts(false);
      }
    };

    const debouncedFetch = debounce(fetchProducts, 500);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [selectedCategories, selectedCollections, selectedColors, selectedSizes, price, search]);

  // Debounced search suggestions
  const debouncedSearch = debounce(async (q) => {
    if (!q) return setResults([]);
    try {
      const res = await axios.get(`${baseURL}/products/search/suggestions`, {
        params: { q, limit: 5 },
      });
      setResults(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  // Add to cart with auth check
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to the cart.");
      navigate("/login");
      return;
    }

    try {
      setCartLoading(true);
      const payload = {
        productId: product.id,
        variantId: product.selectedVariantId || null,
        quantity: 1,
        selectedColor: product.selectedColor || null,
        selectedSize: product.selectedSize || null,
      };

      await axios.post(`${baseURL}/cart/items`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Item added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart.");
    } finally {
      setCartLoading(false);
    }
  };

  // Clear filters
  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPrice(100000);
    setSearch("");
  };

  const handleCheckboxChange = (item, setter, state) => {
    if (state.includes(item)) {
      setter(state.filter((i) => i !== item));
    } else {
      setter([...state, item]);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
      {/* Navbar */}
     <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-8 py-3">
  {/* Top Row: Logo + Desktop Nav */}
  <div className="flex justify-between items-center">
    {/* Logo + Desktop Nav */}
    <div className="flex items-center gap-6">
      <Link to="/"><img src="/logo.png" alt="Logo" className="h-8 w-auto" /></Link>
      {/* Desktop nav */}
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
              {[{ name: "Spring-Summer (25)", path: "/summer" }, { name: "Autumm-Winter (25)", path: "/winter" }, { name: "Core Collections", path: "/core" }, { name: "Golf Club Collection", path: "/golf" }].map((col) => (
                <Link key={col.name} to={col.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{col.name}</Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/shop" className="hover:underline">Shop</Link>
      </nav>
    </div>

    {/* Desktop Icons */}
    <div className="hidden md:flex items-center gap-3 text-gray-700">
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <button
          onClick={() => setSearch(results[0]?.name || searchTerm)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black text-white"
        >
          <FaSearch size={16} />
        </button>
        {results.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-md border mt-1 z-50 max-h-60 overflow-auto">
            {results.map((item) => (
              <li key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setSearchTerm(item.name); setResults([]); }}>
                {item.name}
              </li>
            ))}
          </ul>
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
    </div>

    {/* Mobile Icons */}
    <div className="flex md:hidden items-center gap-3">
      <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"><FaHeart size={16} /></button>
      <Link to="/cart">
        <button className="relative p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
          <FaShoppingCart size={16} />
          <span className="absolute top-0 right-0 inline-flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
          </span>
        </button>
      </Link>
      <button><img src="/model.png" alt="user" className="w-6 h-6 rounded-full object-cover" /></button>

      {/* Mobile Menu Toggle */}
      <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>
    </div>
  </div>

  {/* Mobile Menu + Search */}
  {menuOpen && (
    <div className="md:hidden px-4 pt-3 pb-4">
      <nav className="flex flex-col gap-2 mb-3">
        <Link to="/men" className="py-2 border-b">Men</Link>
        <Link to="/women" className="py-2 border-b">Women</Link>
       <div>
  <button
    onClick={() => setOpenDropdown(!openDropdown)}
    className="w-full flex justify-between items-center py-2 border-b"
  >
    Collection
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${openDropdown ? 'rotate-180' : 'rotate-0'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {openDropdown && (
    <div className="flex flex-col pl-4">
      {[{ name: "Spring-Summer (25)", path: "/summer" }, { name: "Autumm-Winter (25)", path: "/winter" }, { name: "Core Collections", path: "/core" }, { name: "Golf Club Collection", path: "/golf" }].map((col) => (
        <Link
          key={col.name}
          to={col.path}
          className="py-2 border-b text-gray-700 hover:bg-gray-100"
        >
          {col.name}
        </Link>
      ))}
    </div>
  )}
</div>

        <Link to="/shop" className="py-2 border-b">Shop</Link>
      </nav>

      {/* Search Input */}
      <div className="relative w-full mt-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <button
          onClick={() => setSearch(results[0]?.name || searchTerm)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black text-white"
        >
          <FaSearch size={16} />
        </button>
        {results.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-md border mt-1 z-50 max-h-60 overflow-auto">
            {results.map((item) => (
              <li key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setSearchTerm(item.name); setResults([]); }}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )}
</header>


      {/* Hero & Products Section */}
      <div>
        {/* Banner */}
        <div className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/collectionbg.png')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center p-6">
            <p className="text-white tracking-[0.8em] uppercase">shop</p>
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug">
              Discover our complete collection
              <br />
              of premium fashion pieces
            </h2>
          </div>
        </div>

        {/* Filters & Product Grid */}
        <div className="flex flex-col md:flex-row px-8 py-10 gap-8">
          {/* Sidebar Filters */}
          <aside className="md:w-1/4 w-full">
          <div className="border border-black p-4 rounded">
            <div className="py-5 rounded">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Filter</h3>
                <button
                  onClick={handleClear}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Clear all
                </button>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search product"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Categories</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-black"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() =>
                            handleCheckboxChange(
                              cat.name,
                              setSelectedCategories,
                              selectedCategories
                            )
                          }
                        />
                        <span>{cat.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Colors */}
            {colors.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Colors</h4>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
                  {colors.map((color) => (
                    <li key={color}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-black"
                          checked={selectedColors.includes(color)}
                          onChange={() =>
                            handleCheckboxChange(
                              color,
                              setSelectedColors,
                              selectedColors
                            )
                          }
                        />
                        <span>{color}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Sizes</h4>
                <ul className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-600">
                  {sizes.map((size) => (
                    <li key={size}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-black"
                          checked={selectedSizes.includes(size)}
                          onChange={() =>
                            handleCheckboxChange(
                              size,
                              setSelectedSizes,
                              selectedSizes
                            )
                          }
                        />
                        <span>{size}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price range</h4>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-black"
              />
              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                <span>₦0</span>
                <span>₦{price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </aside>


          {/* Product Grid */}
          <main className="flex-1">
            {loadingProducts ? (
              <p className="text-center py-10">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-center py-10">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                                    <div key={product.id} className="border rounded-lg p-4 flex flex-col">
<Link to={`/explore/${product.id}`}>
                      <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <p className="text-gray-500 mb-2">${product.price}</p>
                    </Link>

                    {/* Variant, Color, Size selection if needed */}
                    {product.colors && (
                      <select
                        value={product.selectedColor || ""}
                        onChange={(e) => product.selectedColor = e.target.value}
                        className="border rounded p-1 mb-2"
                      >
                        <option value="">Select Color</option>
                        {product.colors.map((color) => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    )}

                    {product.sizes && (
                      <select
                        value={product.selectedSize || ""}
                        onChange={(e) => product.selectedSize = e.target.value}
                        className="border rounded p-1 mb-2"
                      >
                        <option value="">Select Size</option>
                        {product.sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    )}

                    <button
                      onClick={() => addToCart(product)}
                      disabled={cartLoading}
                      className="mt-auto bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                    >
                      {cartLoading ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
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

