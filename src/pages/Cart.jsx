import React from "react";
import { FaArrowLeft, FaEnvelope, FaHeart, FaPlus, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {
    const products = new Array(8).fill({
  name: "Embroidered Semi-collar Shirt",
  price: "₦15,000",
  image: "/shirt.png",
});
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
  return (
     <div className="bg-white font-libre text-black">
          {/* Top Navbar */}
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
   
    
      {/* Cart Section */}
    
   
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Your Order */}
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
        <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" />
          <span className="text-xs text-gray-600">
            I agree to the Terms and Conditions
          </span>
        </div>
        <Link to="/continue"><button className="w-full bg-gray-200 hover:bg-black hover:text-white py-2 text-sm font-medium">
          CONTINUE
        </button></Link>
      </div>
    </div>
 

      {/* Recommendations */}
       <section className="py-10 px-4 md:px-16">
                 <h2 className="text-xl text-center mb-5 font-semibold">YOU MAY ALSO LIKE</h2>
     
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((item, index) => (
                     <div key={index} className="rounded-lg overflow-hidden hover:shadow-md">
                
                {/* Top section: image + plus inside colored bg */}
                <div className="bg-gray-100 p-4 flex flex-col items-center">
                  <img src={item.image} alt={item.name} className="w-full mb-2" />
                  <div className="bg-transparent border border-gray-400  text-gray-500 p-2 rounded-md flex items-center justify-center">
                    <FaPlus size={14} />
                  </div>
                </div>
          
                {/* Bottom section: name + price in white bg */}
                <div className="bg-white p-3">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.price}</div>
                </div>
                </div>
                    ))}
                  </div>
                </section>

      {/* Footer */}
      <footer className="bg-[#0b0d17] text-white px-4 md:px-16 py-12 grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Women</h4>
              <ul><li>All Women</li><li>Skirts</li><li>T-Shirts</li><li>Tops</li><li>Jackets</li></ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Men</h4>
              <ul><li>All Men</li><li>Shirts</li><li>T-Shirts</li><li>Shorts</li><li>Jackets</li></ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Kids</h4>
              <ul><li>All Kids</li><li>Shirts</li><li>T-Shirts</li><li>Shorts</li><li>Jackets</li></ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Shopping</h4>
              <ul><li>Your cart</li><li>Your orders</li><li>Compare items</li><li>Wishlist</li><li>Shipping Details</li></ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">More links</h4>
              <ul><li>Blogs</li><li>Gift center</li><li>Buying guides</li><li>New arrivals</li><li>Clearance</li></ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Stay In Touch</h4>
              <p className="mb-2">Get updates, free giveaways and once-in-a-lifetime deals.</p>
      <div className="flex items-center border border-white rounded-md w-[200px]">
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
    </div>        </div>
          </footer>
    
          {/* Bottom bar */}
          <div className="bg-[#0b0d17] text-white text-xs px-4 md:px-16 py-4 flex justify-between">
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
      </div>
  );
}