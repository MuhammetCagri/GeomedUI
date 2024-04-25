import React, { useState, useEffect } from 'react';
import config from "../Config.json";

const Contact = () => {
  const [body, setBody] = useState([]);
  useEffect(() => {fetchData(); }, []);

  const fetchData = () => {
    fetch(config.Domain+"page/type/1")
      .then((response) => response.text())
      .then((data) => {
        setBody (data);
      })
      .catch((error) => {
        console.error('API isteği sırasında bir hata oluştu:', error);
      });
  };
  return ( 

<div className="mb-4 border m-2 p-8 rounded-lg shadow-lg">
  <div className="post__description custom-word-break font-semibold text-xl" dangerouslySetInnerHTML={{ __html: body}}  />
</div>
  )
}

export default Contact
