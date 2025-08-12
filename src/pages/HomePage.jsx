import React, { useState } from "react";
import { FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaPlus, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp, } from "react-icons/fa";
import { Link } from "react-router-dom";

const products = new Array(8).fill({
  name: "Embroidered Semi-collar Shirt",
  price: "₦15,000",
  image: "/shirt.png",
});

const categories = [
  { name: "Eyewears", image: "/model.png" },
  { name: "Bags", image: "/bag.png" },
  { name: "Footwears", image: "/model.png" },
];

export default function HomePage() {
        const [menuOpen, setMenuOpen] = useState(false);
   const [openDropdown, setOpenDropdown] = useState(false);
    
      const handleMenuClick = () => {
        setOpenDropdown(false);
      };
    const [collectionOpen, setCollectionOpen] = useState(false);
  return (
    <div className="font-libre  w-full  bg-white text-black">

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


      {/* Header Hero Image */}
      <section className="w-full px-4 sm:px-6 md:px-2">

      <div className="w-full h-[500px] mt-5 bg-cover bg-center" style={{ backgroundImage: `url('/banner.png')` }} />

      {/* Product Grid Section */}
      <section className="py-10 px-4 md:px-16">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {products.map((item, index) => (
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

        <div className="text-center mt-8">
         <Link to="/collection"> <button className="border hover:bg-black hover:text-white px-8 py-2 text-sm">Explore</button></Link>
        </div>
      </section>

      {/* Middle Banner */}
      <section className="relative bg-black/50 my-10">
        <img
          src="/peace.png"
          className="w-full object-cover h-[400px]"
          alt="peace"
        />
        <div className="absolute inset-0  mt-20 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-semibold mb-3">Peace Within</h2>
          <p className="text-sm mb-4 text-center max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis non diam malesuada placerat.
          </p>
         <Link to="/collection"> <button className="border hover:bg-black hover:text-white px-8 py-2 text-sm">Explore</button></Link>
        </div>
      </section>

      {/* Second Product Section */}
     <section className="py-10 px-4 md:px-16">
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

      {/* Categories */}
      <section className="py-10 px-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="text-center">
            <img src={cat.image} className="w-full h-84 object-cover mb-3" alt={cat.name} />
            <p className="text-sm font-medium">{cat.name}</p>
          </div>
        ))}
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
                  
                             </footer></section>
    </div>
  );
}
