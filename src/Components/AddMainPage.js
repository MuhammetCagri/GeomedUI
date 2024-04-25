import React, { useState, useEffect } from 'react';
import CookieHelper from '../Functions/CookieHelper';
import config from "../Config.json"

const AddMainPage = () => {
  const [htmlText, setHtmlTextState]= useState('');
  const [youtubeUrl, setyoutubeUrlState]= useState('');
  const handleHtmlTextState =(e)=>{
   setHtmlTextState(e.target.value);
  };
  useEffect(() => {fetchData(); }, []);
  const fetchData = () => {
    fetch(config.Domain+"page/type/0")
      .then((response) => response.text())
      .then((data) => {
        var lines=data.split('\n');
        var youtubeUrl= lines[0];
        lines.shift();
        var body = lines.join("\n");
        setyoutubeUrlState(youtubeUrl);
        setHtmlTextState (body);

      })
      .catch((error) => {
        console.error('API isteği sırasında bir hata oluştu:', error);
      });
  };

  
  const handleSubmit = async () => { 
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${CookieHelper.getCookieValue("token")}`);
    headers.append('Content-Type', 'application/json');
    const req = {
      text:youtubeUrl+"\n"+htmlText,
      pageType:0
    };
    try {
      const response = await fetch(config.Domain+'page', {
        method: 'POST',
        body: JSON.stringify(req),
        headers: headers, // Authorization başlığını ekleyin
      });
      var res= await response.json();
      if (response.ok) {
        alert('Sayfa Güncellendi.');
      } else {
        alert(JSON.stringify(res.errors));
      }
    } catch (error) {
      console.error('Sayfa güncellenirken hata oluştu:', error);
    }
  };
  
  return (
    <div className=" mb-4 border m-2 p-8 rounded-lg shadow-lg">
    <h1 className="font-semibold text-xl">ANA SAYFAYI DÜZENLE</h1>
    <br/>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="youtubeUrl" 
        type="text"
        placeholder="Youtube Url"
        value={youtubeUrl}
        onChange={(e)=>setyoutubeUrlState(e.target.value)}  />
         <br/>
         <br/>
    <textarea
        className="shadow appearance-none border rounded w-full h-80 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="mainPage" 
        type="text"
        placeholder="Html olarak ana sayfayı giriniz."
        value={htmlText}
        onChange={handleHtmlTextState}  
      />
          <br/>
          <br/>
        <button className="bg-red-500 text-white  hover:bg-red-400 rounded-xl px-2 py-1" onClick={handleSubmit}>Kaydet</button>
    </div>
  )
}

export default AddMainPage
