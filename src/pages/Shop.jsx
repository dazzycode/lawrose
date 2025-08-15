import { useState, useEffect } from "react";
import { FaBars, FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

 
export default function Shop() {

  const [menuOpen, setMenuOpen] = useState(false);
const productData = [
  {
    name: "Black Hoodie",
    category: "Men",
    collection: "Autumm-Winter (25)",
    color: "Black",
    size: "M",
    priceValue: 15000,
    price: "₦15,000",
    image: "/product1.png",
  },
  {
    name: "White Shirt",
    category: "Women",
    collection: "Autumm-Winter (25)",
    color: "White",
    size: "S",
    priceValue: 8000,
    price: "₦8,000",
    image: "/collection1.png",
  },
  {
    name: "Black Hoodie",
    category: "Men",
    collection: "Autumm-Winter (25)",
    color: "Burgundy",
    size: "S",
    priceValue: 15000,
    price: "₦45,000",
    image: "/model.png",
  },
  {
    name: "White Shirt",
    category: "Kids",
    collection: "Spring-Summer (25)",
    color: "Blue",
    size: "XL",
    priceValue: 8000,
    price: "₦20,000",
    image: "/bag.png",
  },
    {
    name: "Black Hoodie",
    category: "Kids",
    collection: "Spring-Summer (25)",
    color: "Black",
    size: "M",
    priceValue: 15000,
    price: "₦15,000",
    image: "/shirt.png",
  },
  {
    name: "White Shirt",
    category: "Women",
    collection: "Core Cllections",
    color: "White",
    size: "S",
    priceValue: 8000,
    price: "₦8,000",
    image: "/collection2.png",
  },
    {
    name: "Black Hoodie",
    category: "Accessories",
    collection: "Core Cllections",
    color: "Black",
    size: "M",
    priceValue: 15000,
    price: "₦15,000",
    image: "/collection3.png",
  },
  {
    name: "White Shirt",
    category: "Women",
    collection: "Core Cllections",
    color: "Olive",
    size: "S",
    priceValue: 8000,
    price: "₦8,000",
    image: "/collection4.png",
  },
   {
    name: "Black Hoodie",
    category: "Accessories",
    collection: "Golf-Club Collections",
    color: "Black",
    size: "M",
    priceValue: 15000,
    price: "₦15,000",
    image: "/bag.png",
  },
  {
    name: "White Shirt",
    category: "Women",
    collection: "Golf-Club Collections",
    color: "White",
    size: "S",
    priceValue: 8000,
    price: "₦8,000",
    image: "/shirt.png",
  },
    {
    name: "Black Hoodie",
    category: "Men",
    collection: "Autumm-Winter (25)",
    color: "Black",
    size: "M",
    priceValue: 15000,
    price: "₦15,000",
    image: "/woman.png",
  },
  {
    name: "White Shirt",
    category: "Men",
    collection: "Golf-Club Collections",
    color: "White",
    size: "S",
    priceValue: 8000,
    price: "₦8,000",
    image: "/men.png",
  }, 
];

  const [allProducts] = useState(productData);
  const [products, setProducts] = useState(productData);

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [price, setPrice] = useState(100000);

  const handleCheckboxChange = (value, setter, selectedArray) => {
    if (selectedArray.includes(value)) {
      setter(selectedArray.filter((item) => item !== value));
    } else {
      setter([...selectedArray, value]);
    }
  };

  const handleClear = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPrice(100000);
  };

  useEffect(() => {
    let filtered = allProducts;

    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedCollections.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCollections.includes(product.collection)
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColors.includes(product.color)
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSizes.includes(product.size)
      );
    }

    filtered = filtered.filter((product) => product.priceValue <= price);

    setProducts(filtered);
  }, [
    search,
    selectedCategories,
    selectedCollections,
    selectedColors,
    selectedSizes,
    price,
    allProducts,
  ]);
const [openDropdown, setOpenDropdown] = useState(false);

  const handleMenuClick = () => {
    setOpenDropdown(false);
  };
const [collectionOpen, setCollectionOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
      {/* Navbar */}

    <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-gray-200 px-4 md:px-8 py-3 flex justify-between items-center">
         {/* Left Side with Logo */}
         <div className="flex items-center gap-6">
           <Link to="/">
             <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
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
                 <svg className="w-3 h-3 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
               <img src="/model.png" alt="user" className="w-6 h-6 rounded-full object-cover" />
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
   
         {/* Mobile Nav */}
         {menuOpen && (
           <nav className="absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col p-4 md:hidden shadow-lg">
             <Link to="/men" className="py-2 border-b" onClick={handleMenuClick}>Men</Link>
             <Link to="/women" className="py-2 border-b" onClick={handleMenuClick}>Women</Link>
   
             {/* Collection Dropdown for Mobile */}
             <div>
               <button
                 onClick={() => setOpenDropdown(!openDropdown)}
                 className="w-full flex justify-between items-center py-2 border-b"
               >
                 Collection
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                 </svg>
               </button>
               {openDropdown && (
                 <div className="flex flex-col pl-4">
                   {[
                     { name: "Spring-Summer (25)", path: "/summer" },
                     { name: "Autumm-Winter (25)", path: "/winter" },
                     { name: "Core Collections", path: "/core" },
                     { name: "Golf Club Collection", path: "/golf" }
                   ].map((col) => (
                     <Link
                       key={col.name}
                       to={col.path}
                       className="py-2 border-b text-gray-700 hover:bg-gray-100"
                       onClick={handleMenuClick}
                     >
                       {col.name}
                     </Link>
                   ))}
                 </div>
               )}
             </div>
   
             <Link to="/shop" className="py-2 border-b" onClick={handleMenuClick}>Shop</Link>
           </nav>
         )}
       </header>

  
       
     

      {/* Hero */}
     <div
  className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage:
      "url('/collectionbg.png')",
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* full overlay */}
  <div className="relative z-10 text-center p-6">
<p className="text-white tracking-[0.8em] uppercase">shop</p>
    <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug">
      Discover our complete collection
      <br /> of premium fashion pieces
    </h2>
  </div>
</div>


   


    <div className="flex-col flex md:flex-row px-8 py-10 gap-8">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full lg:block">
        <div className="border border-black p-4 rounded">
          <div className="py-5 rounded">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Filter</h3>
              <button
                onClick={handleClear}
                className="text-sm text-gray-500 hover:text-black"
              >
                Clear all
              </button>
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["All", "Men", "Women", "Kids", "Accessories"].map((cat) => (
                <li key={cat}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={selectedCategories.includes(cat)}
                      onChange={() =>
                        handleCheckboxChange(
                          cat,
                          setSelectedCategories,
                          selectedCategories
                        )
                      }
                    />
                    <span>{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Collections</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Spring-Summer (25)", "Autumm-Winter (25)", "Core Cllections", "Golf-Club Collections"].map((col) => (
                <li key={col}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={selectedCollections.includes(col)}
                      onChange={() =>
                        handleCheckboxChange(
                          col,
                          setSelectedCollections,
                          selectedCollections
                        )
                      }
                    />
                    <span>{col}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Colors</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
              {[
                "Black",
                "White",
                "Sage Green",
                "Navy",
                "Olive",
                "Khaki",
                "Blue",
                "Charcoal",
                "Burgundy",
                "Grey",
                "Cream",
                "Red",
                "Camel",
                "Stone",
              ].map((color) => (
                <li key={color}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={selectedColors.includes(color)}
                      onChange={() =>
                        handleCheckboxChange(
                          color,
                          setSelectedColors,
                          selectedColors
                        )
                      }
                    />
                    <span>{color}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Sizes</h4>
            <ul className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-600">
              {["S", "M", "L", "XL", "30", "32", "34", "36", "38", "XXL"].map(
                (size) => (
                  <li key={size}>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-black"
                        checked={selectedSizes.includes(size)}
                        onChange={() =>
                          handleCheckboxChange(
                            size,
                            setSelectedSizes,
                            selectedSizes
                          )
                        }
                      />
                      <span>{size}</span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Price range</h4>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-black"
            />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>₦0</span>
              <span>₦{price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="bg-white shadow-sm hover:shadow-md transition p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mb-4 w-full h-64 object-cover"
              />
              <h3 className="font-medium text-sm mb-2">{product.name}</h3>
              <p className="text-gray-700 font-semibold">{product.price}</p>
            </div>
          ))}
        </div>
      </main>
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