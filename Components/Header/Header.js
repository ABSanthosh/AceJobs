import { useEffect, useState } from "react";
import "./Header.scss";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  const [navState, setNavState] = useState(false);
  const [hash, setHash] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        document.querySelector(".HeaderWrapper").style.height = "70px";
      } else {
        document.querySelector(".HeaderWrapper").style.height = "";
      }
    });

    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);
    });

    return () => {
      window.removeEventListener("scroll", () => {});
      window.removeEventListener("hashchange", () => {});
    };
  });

  return (
    <div className="HeaderWrapper">
      <Link href="/">
        <a className="HeaderWrapper__logo">
          <img src="/Img/logo.svg" />
        </a>
      </Link>
      <div
        className={`HeaderWrapper__Menu ${
          navState ? "HeaderWrapper__Menu--open" : ""
        }`}
      >
        <ul className="HeaderWrapper__MenuList--left">
          <li className="HeaderWrapper__MenuList--logo">
            <Link href="/">
              <a>
                <img src="/Img/logo.svg" />
              </a>
            </Link>
          </li>
        </ul>
        <ul className="HeaderWrapper__MenuList--right">
          <li className="HeaderWrapper__MenuList--item">
            <a href="/">For Employers</a>
          </li>
          <li className="HeaderWrapper__MenuList--item">
            <SearchBar />
          </li>
        </ul>
      </div>
      <div className="HeaderWrapper__Hamburger">
        <input
          type="checkbox"
          id="NavBarInput"
          onChange={() => {
            setNavState(!navState);
          }}
        />
        <div className="hamButton">
          <label className="HamMenu" htmlFor="NavBarInput">
            <span className="span HL1" />
            <span className="span HL2" />
            <span className="span HL3" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Header;
