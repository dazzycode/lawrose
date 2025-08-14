import React, { useState } from "react";
import { FaHeart, FaSearch, FaShoppingCart,  FaEnvelope, FaPlus, FaTimes, FaBars, FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function ProductPage() {
  const images = [
    "/product1.png",
    "/product2.png",
    "/product3.png",
        "/shirt.png",

  ];
          const [menuOpen, setMenuOpen] = useState(false);
  
const products = new Array(8).fill({
  name: "Embroidered Semi-collar Shirt",
  price: "₦15,000",
  image: "/shirt.png",
});
 const [openDropdown, setOpenDropdown] = useState(false);
    
      const handleMenuClick = () => {
        setOpenDropdown(false);
      };
    const [collectionOpen, setCollectionOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <div className="font-libre overflow-x-hidden  w-full px-4 sm:px-6 md:px-3 bg-white text-black">
      {/* Top Navbar */}
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

      {/* Product Section */}

  

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-8 md:p-16 max-w-7xl mx-auto">
  {/* Left: Image viewer */}
  <div className="flex flex-col md:flex-row gap-4 md:h-[500px] h-auto">
    {/* Main Image */}
    <div className="flex-1 flex items-center justify-center">
      <img
        src={selectedImage}
        alt="Main product"
        className="w-full h-full object-cover border rounded max-h-[400px] md:max-h-none"
      />
    </div>

    {/* Thumbnails */}
    <div
      className="
        flex gap-3
        md:flex-col
        justify-center md:justify-start
        h-auto md:h-full
        overflow-x-auto md:overflow-y-auto
        scrollbar-thin scrollbar-thumb-gray-300
      "
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Thumbnail ${index}`}
          className={`w-16 h-16 sm:w-20 sm:h-20 object-cover border rounded cursor-pointer transition-all duration-200 ${
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
  <div className="p-4 sm:p-6 lg:p-8 border rounded-md max-w-full md:max-w-md mx-auto md:mx-0">
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
        <div className="flex gap-2 flex-wrap">
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
        <div className="flex gap-2 flex-wrap">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className="border px-6 py-3 text-sm rounded hover:border-black"
            >
              {size}
            </button>
          ))}
        </div>
        <p className="text-[#0000008C] text-xs mt-4">
          FIND YOUR SIZE | MEASUREMENT GUIDE
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 flex-wrap mt-4">
        <Link to="/cart">
          <button className="px-6 py-2 w-full sm:w-[280px] bg-[#D9D9D9] text-white text-sm rounded hover:bg-gray-700 transition">
            ADD TO CART
          </button>
        </Link>
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
                 <div
                       key={index}
                       className="rounded-lg overflow-hidden hover:shadow-md bg-white"
                     >
                       {/* Top section: image */}
                       <div className="bg-gray-100 p-4 flex items-center justify-center">
                         <img src={item.image} alt={item.name} className="w-full" />
                       </div>
               
                       {/* Bottom section: name + price + plus button */}
                       <div className="p-3 flex items-center justify-between">
                         <div>
                           <div className="text-xs font-medium text-gray-900">{item.name}</div>
                           <div className="text-xs text-gray-600">{item.price}</div>
                         </div>
                         <button className="bg-transparent border border-gray-400 text-gray-500 p-2 rounded-md flex items-center justify-center hover:bg-gray-200">
                           <FaPlus size={14} />
                         </button>
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
                   
                              </footer>
    </div>
  );
}
