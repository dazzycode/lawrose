import React, { useState, useEffect } from "react";
import { FaHeart, FaSearch, FaShoppingCart, FaEnvelope, FaTimes, FaBars, FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const BASE_URL = "https://lawrose-apps.onrender.com/api";

export default function ProductPage({ user }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialProduct = location.state?.product;

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({ color: "", size: "" });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  // Load product on mount or when navigating
  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setSelectedImage(initialProduct.images?.[0] || initialProduct.featuredImage || "");
      setSelectedVariant({
        color: initialProduct.colors?.[0] || "",
        size: initialProduct.sizes?.[0] || ""
      });
    } else if (productId) {
      fetchProductDetails(productId);
    } else {
      navigate("/shop");
    }
  }, [productId, initialProduct]);

  // Fetch product details
  const fetchProductDetails = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      const productData = data.product || data;

      setProduct(productData);
      setSelectedImage(productData.featuredImage || productData.images?.[0] || "");
      setSelectedVariant({
        color: productData.colors?.[0] || "",
        size: productData.sizes?.[0] || ""
      });

      fetchRelatedProducts(id);
    } catch (err) {
      console.error(err);
      navigate("/shop");
    }
  };

  // Fetch related products (optional)
  const fetchRelatedProducts = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}/related?limit=4`);
      if (!res.ok) return;
      const data = await res.json();
      setRelatedProducts(data.products || data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    if (!selectedVariant.color || !selectedVariant.size) return alert("Please select color and size");

    try {
      const res = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          selectedColor: selectedVariant.color,
          selectedSize: selectedVariant.size,
        }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="font-libre overflow-x-hidden w-full px-4 sm:px-6 md:px-3 bg-white text-black">
      {/* Navbar */}
      <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/"><img src="/logo.png" alt="Logo" className="h-8 w-auto" /></Link>
          <nav className="hidden md:flex items-center gap-4 text-sm relative">
            <Link to="/men" className="hover:underline">Men</Link>
            <Link to="/women" className="hover:underline">Women</Link>
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
                  {[{ name: "Spring-Summer (25)", path: "/summer" },
                    { name: "Autumn-Winter (25)", path: "/winter" },
                    { name: "Core Collections", path: "/core" },
                    { name: "Golf Club Collection", path: "/golf" }
                  ].map((col) => (
                    <Link key={col.name} to={col.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {col.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/shop" className="hover:underline">Shop</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"><FaSearch size={16} /></button>
            <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"><FaHeart size={16} /></button>
            <Link to="/cart">
                  <Link to="/wishlist">  <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"><FaHeart size={16} /></button></Link>
            </Link>
            <button>
              <img src="/model.png" alt="user" className="w-6 h-6 rounded-full object-cover" />
            </button>
          </div>
          <button className="md:hidden p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </header>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-8 md:p-16 max-w-7xl mx-auto">
        {/* Left: Images */}
        <div className="flex flex-col md:flex-row gap-4 md:h-[500px] h-auto">
          <div className="flex-1 flex items-center justify-center">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover border rounded max-h-[400px] md:max-h-none" />
          </div>
          <div className="flex gap-3 md:flex-col justify-center md:justify-start h-auto md:h-full overflow-x-auto md:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            {product.images?.map((img, i) => (
              <img key={i} src={img} alt={product.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover border rounded cursor-pointer hover:border-black" onClick={() => setSelectedImage(img)} />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="p-4 sm:p-6 lg:p-8 border rounded-md max-w-full md:max-w-md mx-auto md:mx-0 space-y-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-xl font-bold">₦{product.price}</p>
          <p className="text-gray-700 text-xs">MRP incl. of all taxes</p>
          <p className="text-black text-sm">{product.description}</p>

          {/* Variants */}
          <div>
            {product.colors?.length > 0 && (
              <>
                <p className="mt-5 text-[#0000008C] text-xs mb-1">Color</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c, i) => (
                    <div key={i} onClick={() => setSelectedVariant({ ...selectedVariant, color: c })} className={`w-12 h-10 border rounded cursor-pointer transition-all duration-200 ${selectedVariant.color === c ? "ring-2 ring-offset-2 ring-black" : "hover:scale-105"}`} style={{ backgroundColor: c }} />
                  ))}
                </div>
              </>
            )}

            {product.sizes?.length > 0 && (
              <>
                <p className="mt-4 text-[#0000008C] text-xs mb-1">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s, i) => (
                    <button key={i} onClick={() => setSelectedVariant({ ...selectedVariant, size: s })} className={`border px-6 py-3 text-sm rounded transition-all duration-200 ${selectedVariant.size === s ? "bg-black text-white border-black" : "hover:border-black"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap mt-4">
            <button onClick={handleAddToCart} className="px-6 py-2 w-full sm:w-[280px] bg-[#D9D9D9] text-white text-sm rounded hover:bg-gray-700 transition">
              ADD TO CART
            </button>
            <FaHeart className="text-[#D9D9D9] text-xl cursor-pointer hover:text-black transition" />
          </div>
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
            <div className="flex items-center my-6 border border-white rounded-md w-[200px]">
              <span className="px-3 text-white"><FaEnvelope /></span>
              <input type="email" placeholder="Enter your email" className="flex-1 p-2 bg-transparent placeholder-gray-400 text-white outline-none" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-4 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
          <p className="text-gray-300 cursor-pointer hover:text-white transition">Terms & Conditions</p>
          <p className="text-gray-400 cursor-pointer hover:text-white transition">Privacy Policy</p>
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
