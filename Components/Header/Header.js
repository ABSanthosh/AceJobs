import React from "react";
import "./Header.scss";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  const [navState, setNavState] = React.useState(false);
  const [hash, setHash] = React.useState("");
  const { user } = useAuth();

  React.useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);
    });
  }, []);

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
            <a href="#events">For Employers</a>
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
