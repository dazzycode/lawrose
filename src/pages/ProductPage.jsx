import React, { useState } from "react";
import { FaHeart, FaSearch, FaShoppingCart, FaArrowLeft, FaEnvelope, FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function ProductPage() {
  const images = [
    "/product1.png",
    "/product2.png",
    "/product3.png",
        "/shirt.png",

  ];
const products = new Array(8).fill({
  name: "Embroidered Semi-collar Shirt",
  price: "₦15,000",
  image: "/shirt.png",
});
  const [selectedImage, setSelectedImage] = useState(images[0]);
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


      {/* Product Section */}

  

    <div className="grid justify-center mx-auto md:grid-cols-2 gap-8 p-8 md:p-16">
  {/* Left: Image viewer */}
  <div className="flex flex-col md:flex-row gap-4">
    {/* Main Image */}
    <div className="flex-1 flex items-center justify-center">
      <img
        src={selectedImage}
        alt="Main product"
        className="w-full max-w-md object-cover border rounded"
      />
    </div>

    {/* Thumbnails */}
    <div
      className="
        flex gap-3 mt-4 md:mt-10
        md:flex-col
        justify-center md:justify-start
      "
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Thumbnail ${index}`}
          className={`w-16 h-16 object-cover border rounded cursor-pointer transition-all duration-200 ${
            selectedImage === img
              ? "border-black"
              : "border-gray-300 hover:border-black"
          }`}
          onClick={() => setSelectedImage(img)}
        />
      ))}
    </div>
  </div>


      {/* Right: Product details */}
     <div className="p-8 max-w-md mx-20 border rounded-md">
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">ABSTRACT PRINT SHIRT</h2>
    <p className="text-xl font-bold">₦35,000</p>
    <p className="text-gray-700 text-xs">MRP incl. of all taxes</p>
    <p className="text-black text-sm">
      Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.<br />
      Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.
    </p>

    {/* Color options */}
    <div>
      <p className="mt-5 text-[#0000008C] text-xs mb-1">Color</p>
      <div className="flex gap-2">
        {["#000", "#999", "#ccc", "#fff", "#5af0deff", "#87ceeb"].map(
          (color, i) => (
            <div
              key={i}
              className="w-12 h-10 border rounded"
              style={{ backgroundColor: color }}
            ></div>
          )
        )}
      </div>
    </div>

    {/* Size options */}
    <div>
      <p className="mt-4 text-[#0000008C] text-xs mb-1">Size</p>
      <div className="flex gap-2">
        {["XS", "S", "M", "L", "XL"].map((size) => (
          <button
            key={size}
            className="border px-6 py-3 text-sm rounded hover:border-black"
          >
            {size}
          </button>
        ))}
      </div>
      <p className="text-[#0000008C] text-xs mt-4 ">
        FIND YOUR SIZE | MEASUREMENT GUIDE
      </p>
    </div>

   <div className="flex items-center gap-6 mt-4">
  <Link to="/cart" ><button className="px-6 py-2 w-[280px] bg-[#D9D9D9] text-white text-sm rounded hover:bg-gray-700 transition">
    ADD TO CART
  </button></Link>
    <FaHeart className="text-[#D9D9D9] text-xl cursor-pointer hover:text-black transition" />

</div>

  </div>
</div>
</div>


      {/* You May Also Like */}
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
