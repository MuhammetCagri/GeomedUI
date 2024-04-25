import React, { useState, useEffect } from 'react';
import ProductItem from "./ProductItem"
//import productData from "./ProductData"
import Config from "../Config.json"
const Products = () => {
  const [productData, setData] = useState([]);

  useEffect(() => {fetchData(); }, []);

  const fetchData = () => {
    fetch(Config.Domain+"product/all")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('API isteği sırasında bir hata oluştu:', error);
      });
  };


  return (
    <div className="grid xl:grid-cols-3 grid-cols-1 gap-5 map-8"> 
       {productData.map((product)=>(
       <ProductItem key= {product.id} product={product}/>
       ))}  
    </div>
  )
}

export default Products
