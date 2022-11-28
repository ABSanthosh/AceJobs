import { useEffect, useState } from "react";
import "./Header.scss";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import FancySelect from "../FancySelect/FancySelect";
import { useRouter } from "next/router";
import FancyButton from "../FancyButton/FancyButton";

function Header() {
  const [navState, setNavState] = useState(false);
  const [hash, setHash] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const [localLocale, setLocalLocale] = useState(locale);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);
    });
  }, []);

  useEffect(() => {
    setLocalLocale(locale);
  }, [locale]);

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
    <nav className="HeaderWrapper">
      <Link href="/">
        <a className="HeaderWrapper__logo">
          <img src="/Img/logos/logo.svg" />
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
                <img src="/Img/logos/logo.svg" />
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
          <li className="HeaderWrapper__MenuList--item">
            <FancySelect
              defaultValue={localLocale}
              onChange={(locale) => {
                router.push({ pathname, query }, asPath, { locale: locale });
              }}
              options={[
                { value: "en", label: "English" },
                { value: "hi", label: "हिंदी" },
              ]}
            />
          </li>
          <li className="HeaderWrapper__MenuList--item">
            <FancyButton
              style={{ height: "33px" }}
              isLink={true}
              href={!user ? "#login" : "/my/profile"}
            >
              {user ? "Profile" : "Login"}
            </FancyButton>
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
    </nav>
  );
}

export default Header;
