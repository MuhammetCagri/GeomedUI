import { useState, useEffect } from 'react'; // useState ve useEffect'i ekleyin
import { Routes,Route,Link,useLocation,useRouteMatch } from 'react-router-dom';
import './App.css';
import MainNavigation from './Components/MainNavigation';
import Products from './Components/Products';
import Main from './Pages/Main';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import DashboardNavigation from './Components/DashboardNavigation';
import UpdatePages from './Pages/UpdatePages';
import CookieHelper from './Functions/CookieHelper.js';
import Kvkk from './Pages/Kvkk';
import { Helmet } from 'react-helmet';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = CookieHelper.getCookieValue("token");
    setIsLoggedIn(!!token && token.trim() !== '');
  }, []);
  return (
    <div >
      <Helmet>
        <title>GEOMED</title> {/* Yeni başlık adını buraya yazın */}
        <link rel="icon" type="image/png" href="./Documents/logo2.ico" /> {/* Yeni favicon dosya yolunu buraya yazın */}
      </Helmet>
      <div className="container mx-auto p-4">
      {isLoggedIn ? <DashboardNavigation/>: <MainNavigation/>}
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/urunler" element={<Products/>}/>
        <Route path="/hakkimizda" element={<AboutUs/>}/>
        <Route path="/iletisim" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/manage-page-and-product" element={<UpdatePages/>}/>
        <Route path="/kvkk" element={<Kvkk/>}/>
      </Routes>
      </div>

    </div>
  );
}

export default App;
