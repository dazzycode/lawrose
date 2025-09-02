import React, { useEffect, useState } from 'react';
import {  FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Collection() {
      const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const baseURL = "https://lawrose-apps.onrender.com";
      const handleMenuClick = () => {
        setOpenDropdown(false);
      };
    const [collectionOpen, setCollectionOpen] = useState(false);
    // Live search suggestions
  useEffect(() => {
    if (!searchTerm) return setResults([]);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data } = await axios.get(`${baseURL}/products/search/suggestions`, {
          params: { q: searchTerm, limit: 10 },
        });
        setResults(data || []);
      } catch (err) {
        console.error("Search suggestions error:", err);
        setResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSelect = (item) => {
    setSearchTerm("");
    setResults([]);
    if (item.slug) navigate(`/product/${item.slug}`);
  };
  
  return (
<div className="min-h-screen w-full overflow-x-hidden px-2 sm:px-6 md:px-3 bg-white text-gray-900">
      {/* Top navigation */}
    <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-8 py-3 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <Link to="/"><img src="/logo.png" alt="Logo" className="h-8 w-auto" /></Link>
      
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
                        {[{ name: "Spring-Summer", path: "/summer" }, 
                          { name: "Autumn-Winter", path: "/winter" },
                          { name: "Core Collections", path: "/core" },
                          { name: "Golf Club Collection", path: "/golf" }]
                          .map(col => (
                            <Link key={col.name} to={col.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{col.name}</Link>
                          ))}
                      </div>
                    )}
                  </div>
                  <Link to="/shop" className="hover:underline">Shop</Link>
                </nav>
              </div>
      
              {/* Right Side Icons */}
              <div className="flex items-center gap-3 text-gray-700">
                <div className="hidden md:flex items-center gap-3 relative w-80">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-3 py-2 rounded-lg w-full"
                  />
                  <FaSearch size={16} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                  {searchTerm && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                      {results.length ? results.map(item => (
                        <div key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={() => handleSearchSelect(item)}>
                          {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded" />}
                          <span>{item.name}</span>
                        </div>
                      )) : <div className="px-4 py-2 text-gray-500">No products found</div>}
                    </div>
                  )}
                </div>
      
                  <Link to="/wishlist">  <button className="p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"><FaHeart size={16} /></button></Link>
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
                <button className="md:hidden p-2 rounded-full text-black hover:bg-black hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                </button>
              </div>
      
              {/* Mobile Nav */}
              {menuOpen && (
                <nav className="absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col p-4 md:hidden shadow-lg">
                  <Link to="/men" className="py-2 border-b">Men</Link>
                  <Link to="/women" className="py-2 border-b">Women</Link>
                  <div className="relative">
                    <button onClick={() => setOpenDropdown(!openDropdown)} className="w-full flex justify-between items-center py-2 border-b">
                      Collection
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                    {openDropdown && (
                      <div className="flex flex-col pl-4">
                        {[{ name: "Spring-Summer", path: "/summer" }, 
                          { name: "Autumn-Winter", path: "/winter" },
                          { name: "Core Collections", path: "/core" },
                          { name: "Golf Club Collection", path: "/golf" }]
                          .map(col => <Link key={col.name} to={col.path} className="py-2 border-b text-gray-700 hover:bg-gray-100">{col.name}</Link>)}
                      </div>
                    )}
                  </div>
                  <Link to="/shop" className="py-2 border-b">Shop</Link>
                   <div className="py-2 md:flex items-center gap-3 relative w-80">
                                      <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border px-3 py-2 rounded-lg w-full"
                                      />
                                      <FaSearch size={16} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                                      {searchTerm && (
                                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                                          {results.length ? results.map(item => (
                                            <div key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={() => handleSearchSelect(item)}>
                                              {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded" />}
                                              <span>{item.name}</span>
                                            </div>
                                          )) : <div className="px-4 py-2 text-gray-500">No products found</div>}
                                        </div>
                                      )}
                                    </div>
                </nav>
              )}
            </header>

      

      {/* Hero */}
      <section className="relative">
        <div className="h-96 py-5 w-full bg-black/50 bg-center bg-cover" style={{ backgroundImage: "url('/collectionbg.png')" }}>
          <div className="absolute inset-0  flex items-center justify-center">
            <div className="text-center max-w-3xl px-6">
                              <p className="mt-4 tracking-[0.8em] uppercase text-white/90">collections</p>

              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                Discover our curated collections,
                <br />each telling a unique story through carefully crafted pieces
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-6">
          <div className="space-x-2">
            <span className="inline-block h-1 w-1 rounded-full bg-gray-400" />
            <span className="inline-block h-1 w-1 rounded-full bg-gray-300" />
            <span className="inline-block h-1 w-1 rounded-full bg-gray-300" />
          </div>
        </div>
      </section>

      {/* Collections grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <CollectionCard
            image={'/summer.png'}
            tag={'Spring-Summer 2025'}
            title={'Bloom & Breeze'}
            description={'Embrace the warmth of spring with our latest collection featuring lightweight fabrics, vibrant colors, and effortless silhouettes.'}
            itemsAvailable={4}
            slug={"/summer"}

          />

          {/* Card 2 */}
          <CollectionCard
            image={'/winter.png'}
            tag={'Autumn-Winter 2025'}
            title={'Urban Warmth'}
            description={'Sophisticated layers and rich textures define our autumn-winter collection, designed for the modern urban lifestyle.'}
            itemsAvailable={12}
          slug={"/winter"}

          />

          {/* Card 3 */}
          <CollectionCard
            image={'/core.png'}
            tag={'Core Collection'}
            title={'Timeless Essentials'}
            description={'Our foundational pieces that transcend seasons and trends. Built to last, designed to endure.'}
            itemsAvailable={8}
            slug={"/core"}

          />

          {/* Card 4 */}
          <CollectionCard
            image={'/golf.png'}
            tag={'Golf Club Collection'}
            title={'Refined Leisure'}
            description={'Sophisticated sportswear that transitions seamlessly from the golf course to the clubhouse.'}
            itemsAvailable={12}
             slug={"/golf"}

          />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold">Can't decide which collection speaks to you?</h3>
          <p className="mt-2 text-sm text-gray-600">Browse our complete catalog</p>
         <Link to="/shop"> <button className="mt-4 inline-block hover:bg-gray-600 hover:text-black  px-6 py-2 bg-black text-white rounded-md">Browse all products</button></Link>
        </div>
      </main>

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

function CollectionCard({ image, tag, title, description, itemsAvailable, slug }) {
  return (
    <article className="bg-white h-full rounded-lg overflow-hidden shadow-sm border">
      <div className="h-96 bg-gray-100 overflow-hidden">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <span className="text-xs md:text-sm text-black bg-gray-400 px-2 py-1 rounded-lg inline-block">
          {tag}
        </span>
        <h3 className="mt-3 text-lg font-bold">{title}</h3>
        <p className="mt-2 text-xs  md:text-sm text-gray-600">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs  md:text-sm text-gray-500">{itemsAvailable} Pieces available</div>
          <Link 
            to={slug}  
            className="text-xs  md:text-sm text-black inline-flex items-center"
          >
            Explore collection →
          </Link>
        </div>
      </div>
    </article>
  );
}


