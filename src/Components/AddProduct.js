import React, { useState } from 'react';
import config from "../Config.json";
import CookieHelper from '../Functions/CookieHelper';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value)
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Lütfen bir dosya seçin.');
      return;
    }

    // Dosyayı sunucuya gönderme işlemini burada gerçekleştirin
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('description', desc);
    
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${CookieHelper.getCookieValue("token")}`);
    try {
      const response = await fetch(config.Domain+'product', {
        method: 'POST',
        body: formData,
        headers: headers, // Authorization başlığını ekleyin
      });
      var res= await response.json();
      if (response.ok) {
        alert('Ürün başarıyla yüklendi.');
      } else {
        alert(JSON.stringify(res.errors));
      }
    } catch (error) {
      console.error('Ürün yükleme sırasında bir hata oluştu:', error);
    }
  };


  return (
    <div className=" mb-4 border m-2 p-8 rounded-lg shadow-lg">
       <div>
        <h1 className="font-semibold text-xl">ÜRÜN YÜKLE</h1>
        <br/>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title" 
        type="text"
        placeholder="Ürün Başlığı Giriniz"
        value={title}
        onChange={handleTitleChange}     
      />
       <br/>
       <br/>
      <textarea
        className="shadow appearance-none border rounded h-40 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="description" 
        type="text"
        placeholder="Ürün Açıklaması Giriniz"
        value={desc}
        onChange={handleDescChange}     
      />
         <br/>
         <br/>
        <input type="file" name="file" accept=".png,.jpeg,.jpg" onChange={handleFileChange} />
        <br/>
        <br/>
        <button className="bg-red-500 text-white  hover:bg-red-400 rounded-xl px-2 py-1" onClick={handleSubmit}>Kaydet</button>    

       </div>
    </div>
  )
}

export default AddProduct
