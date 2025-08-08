import React, { useState } from "react";
import { FaArrowLeft, FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState("information");
const cartItems = [
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
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10000; // example value
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const renderTabContent = () => {
    switch (activeTab) {
      case "information":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Information Form */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Contact Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="p-2 border rounded" placeholder="First Name" />
                  <input className="p-2 border rounded" placeholder="Last Name" />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="p-2 border rounded" placeholder="Email" />
                  <input className="p-2 border rounded" placeholder="Phone" />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="p-2 border rounded" placeholder="Country" />
                  <input className="p-2 border rounded" placeholder="State / Region" />
                  <input className="p-2 border rounded col-span-2" placeholder="Address" />
                  <input className="p-2 border rounded" placeholder="City" />
                  <input className="p-2 border rounded" placeholder="Postal Code" />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Shipping Option</h3>
                <div className="space-y-2">
                  <label className="flex justify-between items-center border p-3 rounded cursor-pointer">
                    <div>DHL Express</div>
                    <div>₦26,000</div>
                  </label>
                  <label className="flex justify-between items-center border p-3 rounded cursor-pointer">
                    <div>FedEx International Priority</div>
                    <div>₦45,000</div>
                  </label>
                </div>
              </div>

              <button className="bg-black text-white py-2 px-6 rounded mt-4">Proceed →</button>
            </div>

            {/* Order Summary */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Your Order</h3>
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/product1.png"
                      alt="T-shirt"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">Basic {item === 1 ? "Heavy" : "Fit"} T-Shirt</p>
                      <p className="text-sm text-gray-500">Black, L</p>
                    </div>
                  </div>
                  <p className="font-medium">₦35,000</p>
                </div>
              ))}
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦70,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₦0</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦70,000</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "shipping":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Delivery Method</h3>
                <div className="space-y-2">
                  <label className="flex justify-between items-center border p-3 rounded cursor-pointer">
                    <div>
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-sm text-gray-500">Delivered within 3-5 business days</p>
                    </div>
                    <div className="font-semibold">₦5,000</div>
                  </label>
                  <label className="flex justify-between items-center border p-3 rounded cursor-pointer">
                    <div>
                      <p className="font-medium">Next Day Delivery</p>
                      <p className="text-sm text-gray-500">Delivered by tomorrow if ordered by 12 noon</p>
                    </div>
                    <div className="font-semibold">₦10,000</div>
                  </label>
                </div>
              </div>
              <button className="bg-black text-white py-2 px-6 rounded">Continue to Payment →</button>
            </div>

            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Your Order</h3>
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/product1.png"
                      alt="T-shirt"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">Basic {item === 1 ? "Heavy" : "Fit"} T-Shirt</p>
                      <p className="text-sm text-gray-500">Black, L</p>
                    </div>
                  </div>
                  <p className="font-medium">₦35,000</p>
                </div>
              ))}
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦70,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₦5,000</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦75,000</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "payment":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-semibold mb-4">Select preferred payment method</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between border p-4 rounded cursor-pointer">
                  <span className="flex items-center text-sm gap-8">Pay with card <img src="/visa.png" alt="visa" className="h-8" /></span>
                </label>
                <label className="flex items-center justify-between border p-4 rounded cursor-pointer">
                  <span className="flex items-center text-sm gap-2">Pay with Paypal <img src="/visa.png" alt="paypal" className="h-8" /></span>
                </label>
                <label className="flex items-center justify-between border p-4 rounded cursor-pointer">
                  <span className="flex items-center text-sm gap-2">Pay using Google pay <img src="/gpay.png" alt="gpay" className="h-6" /></span>
                </label>
                <label className="flex items-center justify-between border p-4 rounded cursor-pointer">
                  <span className="flex items-center text-sm gap-2">Pay using Apple pay <img src="/gpay.png" alt="apple" className="h-6" /></span>
                </label>
              </div>
              <button className="bg-black text-white py-2 px-6 rounded">Place Order</button>
            </div>

           <div className="md:col-span-2 border p-4">
        <div className="flex justify-between items-center  pb-2 mb-4">
          <h2 className="font-semibold text-lg">YOUR ORDER</h2>
          <span className="text-sm text-blue-900">({totalItems})</span>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-4 border-b last:border-b-0"
          >
            {/* Product Image */}
            <img src={item.image} alt={item.name} className="w-[150px] h-[150px] object-cover" />

            {/* Product Info */}
            <div className="flex-1 px-4">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm myt-5 text-gray-500">{item.color}</p>
              <span className="block my-10 text-sm text-blue-900">({item.quantity})</span>
            </div>

            {/* Price & Quantity */}
            <div className="text-right">
                             
         <button className="text-red-700 my-10 underline text-sm mt-1">Delete</button>
  <p className="font-medium">₦{item.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-16 py-3 flex justify-between items-center text-sm">
     {/* Left Menu */}
      <Link
                     to="/"
                     className="flex items-center gap-1 text-black hover:text-gray-600 transition-colors"
                   >
                     <FaArrowLeft /> <span className="hidden md:inline">Back</span>
                   </Link>
     <nav className="space-x-6">
       <Link to="/" className="hover:underline">Men</Link>
       <Link to="/" className="hover:underline">Women</Link>
       <Link to="/" className="hover:underline">Collection</Link>
       <Link to="/" className="hover:underline">Shop</Link>
     </nav>
   
     {/* Right Icons */}
     <div className="flex items-center space-x-2 text-gray-700">
       <button className="p-2 rounded-full text-black bg-transparent  hover:bg-black hover:text-white transition-colors duration-300">
         <FaSearch />
       </button>
   
       <button className="p-2 rounded-full text-black bg-transparent  hover:bg-black hover:text-white transition-colors duration-300">
         <FaHeart />
       </button>
   
       <button className="p-2 rounded-full text-black bg-transparent  hover:bg-black hover:text-white transition-colors duration-300">
         <FaShoppingCart />
       </button>
   
       <button>
         <img
           src="/model.png"
           alt="user"
           className="w-6 h-6 rounded-full object-cover"
         />
       </button>
     </div>
   </header>
   

      {/* Checkout Tabs */}
      <div className="px-8 pt-10">
        <h2 className="text-2xl font-bold mb-6">CHECKOUT</h2>
        <div className="flex space-x-6 border-b pb-2">
          {['information', 'shipping', 'payment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`uppercase text-gray-600 text-sm pb-2  ${
                activeTab === tab ? 'font-bold text-black' : 'border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white px-8 py-12 grid grid-cols-2 md:grid-cols-6 gap-6 text-sm mt-12">
        <div>
          <h5 className="font-bold mb-2">Women</h5>
          <ul>
            <li>All Women</li>
            <li>Shirts</li>
            <li>T-Shirts</li>
            <li>Tops</li>
            <li>Jackets</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">Men</h5>
          <ul>
            <li>All Men</li>
            <li>Shirts</li>
            <li>T-Shirts</li>
            <li>Shorts</li>
            <li>Jackets</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">Kids</h5>
          <ul>
            <li>All Kids</li>
            <li>Shirts</li>
            <li>T-Shirts</li>
            <li>Shorts</li>
            <li>Jackets</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">Shopping</h5>
          <ul>
            <li>Your cart</li>
            <li>Your orders</li>
            <li>Compared items</li>
            <li>Wishlist</li>
            <li>Shipping Details</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">More links</h5>
          <ul>
            <li>Blogs</li>
            <li>Gift center</li>
            <li>Buying guide</li>
            <li>New arrivals</li>
            <li>Clearance</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">Stay In Touch</h5>
          <p className="text-xs mb-2">Sign up to get special offers, free giveaways and once-in-a-lifetime deals.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 text-black rounded"
          />
        </div>
      </footer>
      <div className="bg-black text-white text-center py-4 text-xs">
        <span className="mx-4">Terms & Conditions</span>
        <span className="mx-4">Privacy Policy</span>
        <div className="flex justify-center space-x-4 mt-2">
          <span>📘</span>
          <span>🐦</span>
          <span>📸</span>
          <span>🎵</span>
        </div>
      </div>
    </div>
  );
}