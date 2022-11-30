import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "./Modal.scss";

function Modal({
  containerStyle,
  setModalState,
  modalState,
  hash,
  onModalClose = () => {},
  children,
  showCloseButton = true,
}) {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === `#${hash}`) {
      setModalState(true);
    } else {
      setModalState(false);
    }

    window.addEventListener("hashchange", () => {
      if (window.location.hash === `#${hash}`) {
        setModalState(true);
      } else {
        setModalState(false);
      }
    });

    window.addEventListener("load", () => {
      if (!localStorage.getItem("locale")) {
        window.location.hash = `#${hash}`;
      }
    });

    return () => {
      window.removeEventListener("hashchange", () => {});
      window.removeEventListener("load", () => {});
    };
  });

  useEffect(() => {
    if (modalState) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }, [modalState]);

  return (
    <div className="ModalWrapper">
      <div className="Modal" style={containerStyle}>
        {showCloseButton && (
          <span
            className="Modal--close"
            onClick={() => {
              setModalState(false);
              onModalClose();
              window.location.hash = "";
              router.replace(window.location.pathname);
            }}
          >
            &#10799;
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
