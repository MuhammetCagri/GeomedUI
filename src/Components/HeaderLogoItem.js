import React, { useState,useEffect } from 'react';
import config from "../Config.json";
import CookieHelper from '../Functions/CookieHelper';

const HeaderLogoItem = () => {

  const [title, setTitle] = useState("");
  const [downloadLink, setLink] = useState("");

  useEffect(() => {getHeader(); }, []);

  const getHeader = async () => {  
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${CookieHelper.getCookieValue("token")}`);
    try {
      const response = await fetch(config.Domain+'page/header', {
        method: 'GET',
        headers: headers, // Authorization başlığını ekleyin
      });
      var res= await response.json();
      if (response.ok) {
        setTitle(res.title)
        setLink(res.downloadLink)
        console.log("dfee",response.title);
      } else {
        alert(JSON.stringify(res.errors));
      }
    } catch (error) {
      console.error('Ürün yükleme sırasında bir hata oluştu:', error);
    }
  };

  return (
    <div className="relative flex items-center">
    <img className="h-14 object-cover rounded-full" src={downloadLink} alt="product-images" style={{ width: '90px', height: '90px' }} />
    <div className="ml-3">
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  </div>
  )
}

export default HeaderLogoItem
