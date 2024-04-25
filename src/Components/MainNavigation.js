import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import HeaderLogoItem from "./HeaderLogoItem";

const MainNavigation = () => {
  const [open, setOpen] = useState(false);

  const isTabActive = (path) => {
    return window.location.pathname === path;
  };

  return (
    <header className="flex justify-between items-center mb-4 border p-4 m-2 rounded-lg shadow-lg">
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full flex-wrap w-full">
        <HeaderLogoItem />
        <FiMenu
          className="lg:hidden block h-6 w-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        <nav
          className={`${open ? "block" : "hidden"} w-full lg:flex lg:items-center lg:w-auto `}
        >
          <ul className="text-base text-gray-600 lg:flex lg:justify-between">
            <li>
              <a
                className={`lg:px-5 py-2 block ${
                  isTabActive("/")
                    ? "text-red-600 border-b-2 border-red-600"
                    : "hover:text-red-600"
                } font-semibold`}
                href="/">Ana Sayfa
              </a>
            </li>
            <li>
              <a
                className={`lg:px-5 py-2 block ${
                  isTabActive("/urunler")
                    ? "text-red-600 border-b-2 border-red-600"
                    : "hover:text-red-600"
                } font-semibold`}
                href="/urunler">Ürünler
              </a>
            </li>
            <li>
              <a
                className={`lg:px-5 py-2 block ${
                  isTabActive("/hakkimizda")
                    ? "text-red-600 border-b-2 border-red-600"
                    : "hover:text-red-600"
                } font-semibold`}
                href="/hakkimizda">Hakkımızda
              </a>
            </li>
            <li>
              <a
                className={`lg:px-5 py-2 block ${
                  isTabActive("/iletisim")
                    ? "text-red-600 border-b-2 border-red-600"
                    : "hover:text-red-600"
                } font-semibold`}
                href="/iletisim">İletişim
                </a>
            </li>
            <li>
              <a
                className={`lg:px-6 py-2 block bg-red-600 text-white rounded-xl text-center`}href="/login">Giriş
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
