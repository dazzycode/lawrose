import React, { useState } from "react";
import { FaBars, FaChevronRight, FaFacebook, FaInstagram, FaTimes, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaArrowLeft, FaEnvelope, FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState("information");
      const [menuOpen, setMenuOpen] = useState(false);

  // Example cart state
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
 
   const navigate = useNavigate();
 const [selected, setSelected] = useState("");
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
const shippingCost = 24000; // or set dynamically from selected option
const total = subtotal + shippingCost;

  const methods = [
    {
      id: "card",
      label: "Pay with card",
      logo: (
        <div className="flex space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa"
            className="w-8 h-5 object-contain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="Mastercard"
            className="w-8 h-5 object-contain"
          />
        </div>
      ),
    },
    {
      id: "paypal",
      label: "Pay with Paypal",
      logo: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="Paypal"
          className="w-12 h-5 object-contain"
        />
      ),
    },
    {
      id: "gpay",
      label: "Pay using Google pay",
      logo: (
        <img
          src="/gpay.png"
          alt="Google Pay"
          className="w-12 h-5 object-contain"
        />
      ),
    },
    {
      id: "applepay",
      label: "Pay using Apple pay",
      logo: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple Pay"
          className="w-8 h-5 object-contain"
        />
      ),
    },
  ];

  
 const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

 const [openDropdown, setOpenDropdown] = useState(false);
 
   const handleMenuClick = () => {
     setOpenDropdown(false);
   };
 const [collectionOpen, setCollectionOpen] = useState(false);
 // Product count & total quantity
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
     <div className="min-h-screen w-full overflow-x-hidden px-2 sm:px-6 md:px-3 bg-white text-gray-900">
      {/* Top navigation */}
     <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-8 py-3 flex justify-between items-center">
                   {/* Left Side */}
                   <div className="flex items-center gap-4">
                    
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
             
                   {/* Right Side */}
                   <div className="flex items-center gap-3 text-gray-700">
                     {/* Desktop Icons */}
                     <div className="hidden md:flex items-center gap-3">
                       <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
                         <FaSearch size={16} />
                       </button>
                       <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
                         <FaHeart size={16} />
                       </button>
                       <Link to="/cart"> <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
                     <FaShoppingCart size={16} />
                   </button></Link>
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
             
                   {/* Mobile Menu */}
                   {menuOpen && (
  <div className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-start p-4 md:hidden">
    <Link to="/men" className="py-2 w-full hover:underline" onClick={() => setMenuOpen(false)}>Men</Link>
    <Link to="/women" className="py-2 w-full hover:underline" onClick={() => setMenuOpen(false)}>Women</Link>

    {/* Collection Dropdown */}
    <div className="w-full">
      <button
        onClick={() => setCollectionOpen(!collectionOpen)}
        className="py-2 w-full flex justify-between items-center hover:underline"
      >
        Collection
        <span>{collectionOpen ? "▲" : "▼"}</span>
      </button>
      {collectionOpen && (
        <div className="pl-4 flex flex-col">
          <Link
            to="/summer"
            className="py-1 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
           Spring-Summer (25)
          </Link>
          <Link
            to="/winter"
            className="py-1 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Autumm-Winter (25)
          </Link>
          <Link
            to="/core"
            className="py-1 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
Core Collections          </Link>
 <Link
            to="/gulf"
            className="py-1 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
Gulf Club Collection         </Link>
        </div>
      )}
    </div>

    <Link to="/shop" className="py-2 w-full hover:underline" onClick={() => setMenuOpen(false)}>Shop</Link>

    {/* Icons */}
    <div className="flex gap-3 mt-4">
      <button className="p-2 rounded-full border border-gray-300">
        <FaSearch size={16} />
      </button>
      <button className="p-2 rounded-full border border-gray-300">
        <FaHeart size={16} />
      </button>
       <Link to="/cart"> <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors">
                     <FaShoppingCart size={16} />
                   </button></Link>
      <button>
        <img
          src="/model.png"
          alt="user"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>
    </div>
  </div>
)}
                 </header>
   <div className="w-full mx-5 p-4">
  {/* Header */}
  <h1 className="text-xl font-bold mb-6 uppercase">Checkout</h1>

  {/* Layout */}
  <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-16">
    
    {/* Left Column - Tabs in bordered container */}
    <div className="border max-w-6xl p-4 bg-white">
      {/* Tabs */}
      <div className="flex space-x-6 pb-2 mb-8 border-b">
        {["information", "shipping", "payment"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`uppercase text-sm font-medium ${
              activeTab === tab ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "information" && (
          <div>
            <h2 className="text-sm font-semibold mb-4">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border text-xs p-2 w-full" placeholder="First Name" />
              <input className="border text-xs p-2 w-full" placeholder="Last Name" />
            </div>
            <input className="border text-xs  p-2 w-full mt-4" placeholder="Email" />
            <input className="border text-xs p-2 w-full mt-4" placeholder="Phone" />

            <h2 className="text-sm font-semibold mt-6 mb-4">
              Shipping Address
            </h2>
            <input className="border text-xs p-2 w-full" placeholder="Country" />
            <input
              className="border p-2 text-xs w-full mt-4"
              placeholder="State / Region"
            />
            <input className="border text-xs p-2 w-full mt-4" placeholder="Address" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input className="border text-xs  p-2 w-full" placeholder="City" />
              <input
                className="border text-xs  p-2 w-full"
                placeholder="Postal Code"
              />
            </div>

            <button
              onClick={() => setActiveTab("payment")}
              className="mt-6 bg-gray-800 text-white py-3 text-sm px-6 flex items-center justify-center"
            >
              Payment →
            </button>
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h2 className="text-sm font-semibold mb-4">Shipping Option</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between border p-4">
                <span className="text-xs">DHL Express</span>
                <span className="font-bold  text-xs">₦24,000</span>
                <input type="radio" name="shipping" />
              </label>
              <label className="flex items-center justify-between border p-4">
                <span className="text-xs">FedEx International Priority</span>
                <span className="font-bold text-xs">₦54,000</span>
                <input type="radio" name="shipping" />
              </label>
            </div>
          </div>
        )}

     {activeTab === "payment" && (
  <div className="space-y-4">
    <p className="text-sm">Select preferred payment method</p>
    {methods.map((method) => (
      <label
        key={method.id}
        className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-black transition"
      >
        {/* Left Side */}
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            value={method.id}
            checked={selected === method.id}
            onChange={() => setSelected(method.id)}
            className="accent-black w-4 h-4"
          />
          <span className="text-sm">{method.label}</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {method.logo}
          <FaChevronRight className="text-gray-400" />
        </div>
      </label>
    ))}

    {/* Button under payment methods */}
    
    {selected ? (
  <Link
    to="/signup"
    className="mt-6 bg-black hover:bg-gray-900 w-[200px] text-white py-2 text-sm flex items-center justify-center"
  >
    Complete Payment →
  </Link>
) : (
  <button
    disabled
    className="mt-6 bg-gray-400 w-[200px] text-white py-2 text-sm flex items-center justify-center cursor-not-allowed"
  >
    Complete Payment →
  </button>
)}

  </div>
)}

        
      </div>
      
    </div>

    {/* Right Column - Order Summary */}
  <div className="p-4 sm:p-6 lg:p-8 border rounded-md max-w-full md:max-w-md mx-auto md:mx-0">
 <div className="flex justify-between items-center pb-2 mb-4">
              <h2 className="font-semibold text-lg">YOUR ORDER</h2>
              <span className="text-sm text-blue-900">
                ( {totalQuantity} items)
              </span>
            </div>      <div className="space-y-4">
        {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-[150px] h-[150px] object-cover" />
                <div className=" px-4">
                  <h3 className="font-medium text-xs ">{item.name}</h3>
                  <p className="text-xs my-5 text-gray-500">{item.color}</p>
                  <span className="block my-10 text-sm text-blue-900">({item.quantity})</span>
                </div>
                <div className="text-right">
                  <button onClick={() => handleDelete(item.id)} className="text-red-700 mb-20 underline text-sm mt-1">
                   clear
                  </button>
                  <p className="text-sm font-medium">₦{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
      </div>
     <div className="border-t mt-4 mb-8 pt-4 space-y-2">
  <div className="flex mb-5 justify-between">
    <span className="text-sm">Subtotal</span>
    <span className="text-xs">₦{subtotal.toLocaleString()}</span>
  </div>
  <div className="flex mt-5 justify-between">
    <span className="text-sm">Shipping</span>
    <span className="text-xs">₦{shippingCost.toLocaleString()}</span>
  </div>
  <div className="flex border-t justify-between font-bold text-lg">
    <span className="text-sm">Total</span>
    <span className="text-xs">₦{total.toLocaleString()}</span>
  </div>
</div>

    </div>
  </div>
</div>
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
              
                         </footer>
</div>
  );
}