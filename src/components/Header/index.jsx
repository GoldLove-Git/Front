import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { HEADER_TEXT } from "../../data/constants";
import searchIcon from "../../assets/icons/searchIcon.png";
import searchHoverIcon from "../../assets/icons/searchHoverIcon.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchHover, setIsSearchHover] = useState(0);

  const accessToken = localStorage.getItem("accessToken");

  const moveToTop = () => {
    if (location.pathname === "/mainpage")
      return window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/mainpage");
  };

  return (
    <>
      <header className="w-screen h-20 px-20 py-11 flex fixed flex-row justify-between items-center inset-x-0 top-0 left-0 z-50 bg-white border-b border-gray-200">
        <section>
          <div>
            <button
              className="font-mono text-3xl font-bold m-0 p-0 bg-transparent"
              onClick={() => moveToTop()}
            >
              {HEADER_TEXT}
            </button>
          </div>
        </section>
        <section className="flex items-center">
          <section className="h-4 flex items-center mr-3">
            <input className="border-b border-gray-200 px-4 py-2" />
            <button
              onMouseOver={() => setIsSearchHover(1)}
              onMouseOut={() => setIsSearchHover(0)}
              className="bg-white"
            >
              <img
                className="w-6 h-6"
                src={isSearchHover ? searchHoverIcon : searchIcon}
                alt="search"
              />
            </button>
          </section>
          <section>
            <button
              className="w-14 h-14 rounded-full relative flex justify-center overflow-hidden"
              onClick={() => {
                accessToken ? navigate("/mypage") : navigate("/");
              }}
            >
              <p className="relative top-1.5 text-sm text-slate-500">
                {accessToken ? "Mypage" : "login"}
              </p>
            </button>
          </section>
        </section>
      </header>
    </>
  );
};

export default Header;
