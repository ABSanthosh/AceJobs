import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "./LanguageModal.scss";

function LanguageModal() {
  const [hash, setHash] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { pathname, locale } = router;
  // const [currentLocale, setCurrentLocale] = useState("");
  // useEffect(() => {
  //   localStorage.setItem("locale", currentLocale);
  // }, [currentLocale]);

  useEffect(() => {
    setHash(window.location.hash);

    if (window.location.hash === "#set-lang") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);

      if (window.location.hash === "#set-lang") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    });

    window.addEventListener("load", () => {
      if (!localStorage.getItem("locale")) {
        window.location.hash = "#set-lang";
      }
    });

    return () => {
      window.removeEventListener("hashchange", () => {});
      window.removeEventListener("load", () => {});
    };
  });

  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="LanguageModalWrapper">
          <div className="LanguageModal">
            <span
              className="LanguageModal--close"
              onClick={() => {
                setIsOpen(false);
                setHash("");
                window.location.hash = "";
                router.replace(window.location.pathname);

                if (!localStorage.getItem("locale")) {
                  localStorage.setItem("locale", "en");
                }
              }}
            >
              &#10799;
            </span>
            <h2>Select your preferred language</h2>
            <div className="LanguageModal--row">
              <h4>Available</h4>
              <ul className="LanguageModal__options">
                <li>
                  <Link href={`${pathname}`} locale="en">
                    <a
                      onClick={() => {
                        localStorage.setItem("locale", "en");
                      }}
                    >
                      English
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={`${pathname}`} locale="hi">
                    <a
                      onClick={() => {
                        localStorage.setItem("locale", "hi");
                      }}
                    >
                      Hindi
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="LanguageModal--row">
              <h4>Coming Soon</h4>
              <ul className="LanguageModal__options">
                <li>
                  <Link href={`${pathname}`} locale="ta">
                    <a>Tamil</a>
                  </Link>
                </li>
                <li>
                  <Link href={`${pathname}`} locale="te">
                    <a>Telugu</a>
                  </Link>
                </li>
                <li>
                  <Link href={`${pathname}`} locale="ml">
                    <a>Malayalam</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LanguageModal;
