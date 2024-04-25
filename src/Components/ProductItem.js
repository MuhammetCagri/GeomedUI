import React, { useState } from 'react';
import OfferSideBar from './OfferSideBar';

const ProductItem = ({product}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="border p-4 m-2 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 custom-word-break">{product.title}</h2>
      <img className="w-full h-50 object-cover rounded-t-lg" src={product.imagesLinks[0]} alt="product-images" />
      <div className="p-4 whitespace-normal">
        <div
          className="text-gray-500 m-0 p-2 custom-word-break">{product.description}
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 w-full"  onClick={toggleSidebar}>Teklif Ver</button>
      </div>
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-screen w-1/2 bg-white  shadow-lg overflow-y-scroll">
          <button className="bg-red-500 text-white text-right  hover:bg-red-400 rounded-xl px-2 py-1 absolute right-6" onClick={toggleSidebar}>Kapat</button>     
          <OfferSideBar product={product}/>    
        </div>
      )}

    </div>
  );
};

export default ProductItem;
