import React, { useState,useEffect } from 'react';
import CodeValidationWithTimer from './CodeValidationWithTimer';
import config from "../Config.json";
import CookieHelper from '../Functions/CookieHelper';


const OfferSideBar = ({product}) => {

    const [isValidationCodeOpen, setValidationCodeTrue] = useState(false);
    const isSendApi= true

    const [companyTitle, setCompanyTitle] = useState('');
    const handleCompanyTitle = (e) => { setCompanyTitle(e.target.value); };

    const [offerUserEmail, setOfferUserEmail] = useState('');
    const handleOfferUserEmail = (e) => { setOfferUserEmail(e.target.value); };

    const [offerUserPhone, setOfferUserPhone] = useState('');
    const handleOfferUserPhone = (e) => { setOfferUserPhone(e.target.value); };

    const [amount, setAmount] = useState('');
    const handleAmount = (e) => { setAmount(e.target.value); };

    const [price, setPrice] = useState('');
    const handlePrice = (e) => { setPrice(e.target.value); };

    const [currencyType, setCurrencyType] = useState("TL");
    const handleCurrencyType = (e) => { ;setCurrencyType(e.target.value); };

    const [kvkkAgreed, setKvkkAgreed] = useState(false);

    const handleKvkkAgreement = () => {
      setKvkkAgreed(!kvkkAgreed);
    };
    
    useEffect(() => {
      const cookies = document.cookie;
      const offerDataCookie = cookies.split('; ').find(cookie => cookie.startsWith('offerData='));
      if (offerDataCookie) {
        const offerDataJson = offerDataCookie.split('=')[1];
        const offerData = JSON.parse(offerDataJson);
        setCompanyTitle(offerData.companyTitle);
        setOfferUserEmail(offerData.offerUserEmail.toString());
        setOfferUserPhone(offerData.offerUserPhone);
        setAmount(offerData.amount);
        setPrice(offerData.price);
        setCurrencyType(offerData.currencyType);
    
      }
  }, []); 

    const handleSendValidationMail = async () => { 
    // Geçerli tarihe 10 yıl ekleyin
    if (!kvkkAgreed){
      alert('KVKK onayı Seçilmedi. Lütfen Seçiniz. Bilgileriniz paylaşılmayacaktır.');
      return;
    }

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);

    // JSON formatındaki veriyi çerez olarak yaz
    console.log("asdas",offerData)
      document.cookie = `offerData=${JSON.stringify(offerData)}; expires=${expirationDate.toUTCString()}; path=/`;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      try {
        const currentTimeInMilliseconds = Date.now();
        const currentTimeInSeconds = Math.floor(currentTimeInMilliseconds / 1000);
        var req={
          key:currentTimeInSeconds.toString(),
          email:offerUserEmail
        };

        const response = await fetch(config.Domain+'offer/send-validation', {
          method: 'POST',
          body: JSON.stringify(req),
          headers: headers, // Authorization başlığını ekleyin
        });
        var res= await response.json();
        if (response.ok) {
          alert('Kod Mail Adresinize gönderildi.');
        } else {
          alert(JSON.stringify(res.errors));
        }
      } catch (error) {
        console.error('Mail Gönderimi Hata:', error);
      }
      setValidationCodeTrue(!isValidationCodeOpen);
    };
    var offerData= {
      companyTitle:companyTitle,
      offerUserEmail:offerUserEmail,
      offerUserPhone:offerUserPhone,
      productTitle:product.title,
      amount:amount,
      price:price,
      currencyType:currencyType,
      code:"",
      isApprovedContract: true
    }

  return (
<div className="w-full">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
        Şirket Ünvanınız
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text" placeholder="Geomed Aş." onChange={handleCompanyTitle} value={companyTitle}></input>
    </div>

    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mailadres">
        Mail Adresiniz
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mailadres" type="text" placeholder="geomed@gmail.com" onChange={handleOfferUserEmail}value={offerUserEmail}></input>
    </div>
    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone-number">
        Telefon Numaranız
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone-number" type="number" placeholder="0905315555555" onChange={handleOfferUserPhone} value={offerUserPhone}>
      </input>
    </div>
    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedProduct">Seçtiğiniz Ürün</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="selectedProduct" type="text" placeholder="Femur" value={product.title} readOnly ></input>
    </div>

    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCount">Adet</label>
         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="productCount" type="number"  placeholder="1000" min="0" step="1" onChange={handleAmount} value={amount} />
    </div>

    <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Teklif Edilen Ücret</label>
         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number"  placeholder="1000" min="0" step="1" onChange={handlePrice} value={price} />
    </div>

    <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="moneyType" >Para Tipi</label>
    
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-state" value={currencyType}  onChange={handleCurrencyType}>
          <option value="TL">TL</option>
          <option value="DOLAR">DOLAR</option>
          <option value="EURO">EURO</option>
        </select>
        </div>
        
  <div className=" flex items-center space-x-2">
  <input
    className="w-5 h-5"
    type="checkbox"
    checked={kvkkAgreed}
    onChange={handleKvkkAgreement}
  />
  <a className="hover:bg-red-400" href="/kvkk">
    KVKK (Kişisel Verilerin Korunması) Metni üzerinde bilgi sahibi oldum ve kabul ediyorum.
  </a>
</div>


    <div className="flex items-center justify-between">
      <button className={`${(isSendApi && isValidationCodeOpen)? "bg-gray-500" : "bg-red-500 hover:bg-red-400" }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button" onClick={handleSendValidationMail} disabled={(isSendApi && isValidationCodeOpen)} >Teklifi Gönder</button>
    </div>
    {(isSendApi && isValidationCodeOpen) && (
        <div>
           <CodeValidationWithTimer offerData={offerData}/>
        </div>
      )}
  </form>
</div>
  )
}

export default OfferSideBar
