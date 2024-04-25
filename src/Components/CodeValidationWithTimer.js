import React, { useState, useEffect } from 'react';
import config from "../Config.json";

const CodeValidationWithTimer = ({offerData}) => {
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [timer, setTimer] = useState(120); // 120 saniye (2 dakika) süre

  const handleChange = (e) => {
    const enteredCode = e.target.value;
    setCode(enteredCode);
  };

  useEffect(() => {
    // Her saniyede bir zamanlayıcıyı güncelle
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Süre dolduğunda veya doğru kod girildiğinde zamanlayıcıyı temizle
    if (timer === 0 || isValid) {
      clearInterval(interval);
    }

    // Komponent çıkışında zamanlayıcıyı temizle
    return () => clearInterval(interval);
  }, [timer, isValid]);

  const handleSendOffer = async () => { 
    offerData.code=code;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      try {
        const response = await fetch(config.Domain+'offer', {
          method: 'POST',
          body: JSON.stringify(offerData),
          headers: headers,
        });
        var res= await response.json();
        if (response.ok) {
          setIsValid(true);
          alert('Teklifiniz Gönderildi.');
        } else {
          alert("HATALI KOD!\n"+JSON.stringify(res.errors));
        }
      } catch (error) {
        console.error('Mail Gönderimi Hata:', error);
      }
    };



  return (
    <div>
      <h1>{`${timer === 0 && !isValid ? "Bilgileri Kontrol Edip Tekrar Teklif Veriniz" : `Mailinize Gelen Kodu Giriniz (Süre: ${timer} saniye)`}`}</h1>
      <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="code" 
        type="text"
        placeholder="Kodu Giriniz"
        value={code}
        onChange={handleChange}
        disabled={timer === 0 || isValid} // Süre dolduğunda veya doğru kod girildiğinde devre dışı bırak
      />
      {timer > 0 && !isValid && (
        <p style={{ color: 'red' }}>Süreniz doldu veya kod doğrulanmadı.</p>
      )}
      {isValid && <p style={{ color: 'green' }}> Teklifiniz Gönderildi!</p>}

      <div className="flex items-center justify-between">
     <button

     
    className={`${(timer === 0 || isValid)? "bg-gray-500" : "bg-red-500 hover:bg-red-400" }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} 
    
    type="button"  onClick={handleSendOffer} disabled={timer === 0 || isValid} >Kodu Gönder
  </button>
</div>
    </div>
  );
};

export default CodeValidationWithTimer;
