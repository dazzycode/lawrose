import { useState } from "react";
import {  FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Collection() {
      const navigate = useNavigate();
      const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    
      const handleMenuClick = () => {
        setOpenDropdown(false);
      };
    const [collectionOpen, setCollectionOpen] = useState(false);
  return (
<div className="min-h-screen w-full overflow-x-hidden px-2 sm:px-6 md:px-3 bg-white text-gray-900">
      {/* Top navigation */}
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
            image={'/collection2.png'}
            tag={'Spring-Summer 2025'}
            title={'Bloom & Breeze'}
            description={'Embrace the warmth of spring with our latest collection featuring lightweight fabrics, vibrant colors, and effortless silhouettes.'}
            itemsAvailable={4}
            slug={"/summer"}

          />

          {/* Card 2 */}
          <CollectionCard
            image={'/collection1.png'}
            tag={'Autumn-Winter 2025'}
            title={'Urban Warmth'}
            description={'Sophisticated layers and rich textures define our autumn-winter collection, designed for the modern urban lifestyle.'}
            itemsAvailable={12}
          slug={"/winter"}

          />

          {/* Card 3 */}
          <CollectionCard
            image={'/collection3.png'}
            tag={'Core Collection'}
            title={'Timeless Essentials'}
            description={'Our foundational pieces that transcend seasons and trends. Built to last, designed to endure.'}
            itemsAvailable={8}
            slug={"/core"}

          />

          {/* Card 4 */}
          <CollectionCard
            image={'/collection4.png'}
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


