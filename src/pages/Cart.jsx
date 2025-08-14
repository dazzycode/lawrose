import React, { useState } from "react";
import { FaArrowLeft, FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaPlus, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const products = new Array(8).fill({
    name: "Embroidered Semi-collar Shirt",
    price: "₦15,000",
    image: "/shirt.png",
  });
      const [menuOpen, setMenuOpen] = useState(false);

  // Use state for cart so we can delete items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Basic Heavy T-Shirt",
      color: "Black/L",
      price: 15000,
      quantity: 1,
      image: "/product1.png"
    },
    {
      id: 2,
      name: "Basic Fit T-Shirt",
      color: "Black/L",
      price: 35000,
      quantity: 1,
      image: "/product1.png"
    }
  ]);

  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!isChecked) {
      setError("You must agree to the Terms and Conditions before continuing.");
      return;
    }
    setError("");
    navigate("/continue"); // proceed to the next page
  };
  // Product count & total quantity
  const productCount = cartItems.length;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10000; // example value
  const total = subtotal + shipping;
const [openDropdown, setOpenDropdown] = useState(false);

  const handleMenuClick = () => {
    setOpenDropdown(false);
  };
const [collectionOpen, setCollectionOpen] = useState(false);

  return (
    <div className="font-libre w-full overflow-x-hidden  px-4 sm:px-6 md:px-3 bg-white text-black">

      {/* Header */}

    <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-8 py-3 flex justify-between items-center">
  {/* Left Side with Logo + Nav */}
  <div className="flex items-center gap-6">
    {/* Logo */}
    <Link to="/">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-8 w-auto"
      />
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
          <svg
            className="w-3 h-3 mt-[2px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {openDropdown && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
            {[
              { name: "Spring-Summer (25)", path: "/summer" },
              { name: "Autumm-Winter (25)", path: "/winter" },
              { name: "Core Collections", path: "/core" },
              { name: "Golf Club Collection", path: "/golf" }
            ].map((col) => (
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
      <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
        <FaSearch size={16} />
      </button>
      <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
        <FaHeart size={16} />
      </button>
      <Link to="/cart">
        <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
          <FaShoppingCart size={16} />
        </button>
      </Link>
      <button>
        <img
          src="/model.png"
          alt="user"
          className="w-6 h-6 rounded-full object-cover"
        />
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
</header>


      {/* Cart Section */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Your Order */}
        <div className="md:col-span-2 border p-4">
          <div>
            <div className="flex justify-between items-center pb-2 mb-4">
              <h2 className="font-semibold text-lg">YOUR ORDER</h2>
              <span className="text-sm text-blue-900">
                ({productCount} products, {totalQuantity} items)
              </span>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-[150px] h-[150px] object-cover" />
                <div className="flex-1 px-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm my-5 text-gray-500">{item.color}</p>
                  <span className="block my-10 text-sm text-blue-900">({item.quantity})</span>
                </div>
                <div className="text-right">
                  <button onClick={() => handleDelete(item.id)} className="text-red-700 my-10 underline text-sm mt-1">
                    Delete
                  </button>
                  <p className="font-medium">₦{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="border p-4">
          <h3 className="font-semibold mb-4">ORDER SUMMARY</h3>
          <div className="flex my-2 justify-between text-sm mb-2">
            <span className="text-xs">Subtotal</span>
            <span className="text-xs">₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-xs">Shipping</span>
            <span className="text-xs">₦{shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-10 pt-4 mb-4">
            <p>TOTAL <span className="text-xs text-gray-700">(TAX INCL.)</span></p>
            <p>₦{total.toLocaleString()}</p>
          </div>


    <div className="p-4 max-w-sm mx-auto">
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          className="mr-2"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <span className="text-xs text-gray-600">
          I agree to the Terms and Conditions
        </span>
      </div>

      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

      <button
        onClick={handleContinue}
        className="w-full bg-gray-200 hover:bg-black hover:text-white py-2 text-sm font-medium"
      >
        CONTINUE
      </button>
    </div>
 </div>
      </div>

      {/* Recommendations */}
      <section className="py-10 px-4 md:px-16">
        <h2 className="text-xl text-center mb-5 font-semibold">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden hover:shadow-md bg-white">
              <div className="bg-gray-100 p-4 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.price}</div>
                </div>
              <Link to="/explore">  <button className="bg-transparent border border-gray-400 text-gray-500 p-2 rounded-md flex items-center justify-center hover:bg-gray-200">
                  <FaPlus size={14} />
                </button></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

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
