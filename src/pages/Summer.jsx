import React, { useState } from 'react';
import {  FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaPlus, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function Summer() {
  const [activeTab, setActiveTab] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ['All', 'Shirts', 'Skirts', 'Trousers', 'Jackets'];
  const products = Array(8).fill({
    name: 'Embroidered Seersucker Shirt',
    price: '₦25,000',
    category: 'Shirts',
    image: '/shirt.png'
  });

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter(p => p.category === activeTab);
 const [openDropdown, setOpenDropdown] = useState(false);
    
      const handleMenuClick = () => {
        setOpenDropdown(false);
      };
    const [collectionOpen, setCollectionOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden w-full  sm:px-6 md:px-3 bg-white text-gray-900">
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
 

      {/* Hero section */}
      <section className="relative">
        <div
          className="h-[28rem] w-full bg-center bg-cover"
          style={{ backgroundImage: "url('/collectionbg.png')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="max-w-lg">
                <span className="text-xs md:text-sm text-gray-200 bg-white/20 px-2 py-2 rounded">Spring Summer 2025</span>
                <h1 className="text-white text-3xl md:text-4xl font-bold mt-2">Bloom & Breeze</h1>
                <p className="mt-3 text-white/90">
                  Embrace the warmth of spring with our latest collection featuring lightweight fabrics,
                  vibrant colors, and effortless silhouettes.
                </p>
                <Link to="/continue"><button className="mt-4 px-4 py-2 bg-white text-black rounded">Shop collection</button></Link>
              </div>
              <div className="w-full mx-10 md:w-1/2">
                <img src="/collection2.png" alt="Bloom & Breeze" className="rounded-lg md:h-96 h-48 " />
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
      src="/woman.png"
      alt="Story"
      className="h-72  object-cover md:h-auto"
    />

    {/* Text Content */}
    <div className="p-6 text-justify">
      <h3 className="font-semibold mb-2">The Story</h3>
      <p className="text-sm text-gray-600 mb-4">
        Inspired by the first bloom of spring and the gentle summer breeze, this
        collection celebrates renewal and freedom. Each piece is designed to
        move with you through the changing season.
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
       <div className="flex items-center justify-between mb-6">
  {/* Left side - Title */}
  <h2 className="text-lg font-bold">
    Collection pieces ({filteredProducts.length})
  </h2>

  {/* Right side - Tabs */}
  <div className="flex space-x-2">
    {categories.map(cat => (
      <button
        key={cat}
        onClick={() => setActiveTab(cat)}
        className={`px-4 py-1 rounded-full text-sm ${
          activeTab === cat
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
</div>


        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredProducts.map((product, i) => (
            <div key={i} className="text-center">
               <div className="bg-gray-100 p-4 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="h-full object-cover" />
                       </div>
               
                       {/* Bottom section: name + price + plus button */}
                       <div className="p-3 flex  justify-between">
                         <div>
              <p className="mt-2 text-xs  md:text-sm font-medium">{product.name}</p>
              <p className="text-xs md:text-sm text-left text-gray-500">{product.price}</p>
                         </div>
                       <Link to="/explore">  <button className="bg-transparent border border-gray-400 text-gray-500 p-2 rounded-md flex items-center justify-center hover:bg-gray-200">
                           <FaPlus size={14} />
                         </button></Link>
                       </div>             </div>
          ))}
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
