import React, { useState,useEffect } from 'react';
import config from "../Config.json";
import CookieHelper from '../Functions/CookieHelper';

const Dashboard = () => {
  const [offers, setOffers] = useState([]);
  const [count, setCount] = useState([]);
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {

    getOffers();
  }, []);

  const getOffers=()=>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${CookieHelper.getCookieValue("token")}`);
    fetch(config.Domain+`offer?index=${startIndex}&size=${itemsPerPage}`,{  headers: headers}) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('API veri alımı başarısız.');
        }
        return response.json();
      })
      .then((data) => {
        setOffers(data.result);
        setCount(data.count);
      })
      .catch((error) => {
        console.error('Hata:', error);
      });
  }


  const totalPages = Math.ceil(count / itemsPerPage);

  const onPageChange = (page) => {
    getOffers();
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;


  return (
    <div className="container mx-auto mb-4 border m-2 p-8 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Teklif Veren Şirketler Tablosu</h2>
        <button className="bg-red-500 rounded-xl m-2 p-2 mx-auto">Excel</button>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300">Firma Ünvanı</th>
            <th className="border border-gray-300">Ürün Adı</th>
            <th className="border border-gray-300">Teklifi</th>
            <th className="border border-gray-300">Kur Tipi</th>
            <th className="border border-gray-300">E-Mail</th>
            <th className="border border-gray-300">Telefon Numarası</th>
            <th className="border border-gray-300">Teklif Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td className="border border-gray-300">{offer.companyTitle}</td>
              <td className="border border-gray-300">{offer.productTitle}</td>
              <td className="border border-gray-300">{offer.price.toLocaleString()}</td>
              <td className="border border-gray-300">{offer.currencyType}</td>
              <td className="border border-gray-300">{offer.offerUserEmail}</td>
              <td className="border border-gray-300">{offer.offerUserPhone}</td>
              <td className="border border-gray-300">{offer.creationTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sayfalama düğmeleri */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-3 py-1 rounded-md mx-1 ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md mx-1 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-3 py-1 rounded-md mx-1 ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
