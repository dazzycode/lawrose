import React from "react";
import { FaEnvelope, FaHeart, FaPlus, FaSearch, FaShoppingCart, } from "react-icons/fa";
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
  return (
    <div className="font-libre bg-white text-black">

<header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-16 py-3 flex justify-between items-center text-sm">
  {/* Left Menu */}
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


      {/* Header Hero Image */}
      <div className="w-full h-[500px] mt-5 bg-cover bg-center" style={{ backgroundImage: `url('/banner.png')` }} />

      {/* Product Grid Section */}
      <section className="py-10 px-4 md:px-16">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {products.map((item, index) => (
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

        <div className="text-center mt-8">
         <Link to="/explore"> <button className="border hover:bg-black hover:text-white px-8 py-2 text-sm">Explore</button></Link>
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
         <Link to="/explore"> <button className="border hover:bg-black hover:text-white px-8 py-2 text-sm">Explore</button></Link>
        </div>
      </section>

      {/* Second Product Section */}
      <section className="py-10 px-4 md:px-16">
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
            <h4 className="font-semibold mb-2">Women</h4>
            <ul>
              <li>Dresses</li>
              <li>Tops</li>
              <li>Bottoms</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Men</h4>
            <ul>
              <li>Shirts</li>
              <li>Trousers</li>
              <li>Footwears</li>
              <li>Watches</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kids</h4>
            <ul>
              <li>Age 2-5</li>
              <li>Age 6-10</li>
              <li>Accessories</li>
              <li>Shoes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Shopping</h4>
            <ul>
              <li>My Cart</li>
              <li>Wishlist</li>
              <li>Track Order</li>
              <li>Help Desk</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">More links</h4>
            <ul>
              <li>Contact Us</li>
              <li>Blog</li>
              <li>FAQs</li>
              <li>About</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Stay In Touch</h4>
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
</div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-4 text-center">
          <p>Terms & Conditions | Privacy Policy</p>
          <p className="text-xs mt-2">&copy; 2025 Your Store</p>
        </div>
      </footer>
    </div>
  );
}
