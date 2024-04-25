import React, { useState, useEffect } from 'react';
import config from "../Config.json";

const Main = () => {
    const [youtubeUrl, setyoutubeUrlState] = useState([]);
    const [body, setHtmlTextState] = useState([]);
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

  return ( 
<div className="p-8 mb-4 border m-2 rounded-lg shadow-lg">
 <div className="aspect-w-16 aspect-h-9">
    <iframe
    src={youtubeUrl} // Video URL'sini /embed eklemeyi unutmayın
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    autoPlay // Otomatik olarak videoyu başlatır
    muted> 
    </iframe>
</div>
<div>
    <br></br>
  <div className="post__description custom-word-break font-semibold text-xl" dangerouslySetInnerHTML={{ __html: body}}  />
</div>
</div>
  )
}

export default Main