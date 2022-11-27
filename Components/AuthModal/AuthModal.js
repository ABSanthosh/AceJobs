import React, { useState } from "react";
import "./AuthModal.scss";
import { useRouter } from "next/router";
import PinInput from "react-pin-input";
import FancyButton from "../FancyButton/FancyButton";
import BlurredSpinner from "../BlurredSpinner/BlurredSpinner";

export default function AuthModal() {
  const [hash, setHash] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [isOtpSent, setIsOtpSent] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  React.useEffect(() => {
    setHash(window.location.hash);

    if (
      window.location.hash === "#login" ||
      window.location.hash === "#signup"
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);

      if (
        window.location.hash === "#login" ||
        window.location.hash === "#signup"
      ) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    });
  });

  React.useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="AuthModal">
          <div className="AuthModal__container">
            {showLoader && (
              <BlurredSpinner
                style={{
                  borderRadius: "2px",
                  border: "1.5px solid transparent",
                }}
              />
            )}
            <div className="AuthModal__container--header">
              <p>Sign in to Ace Jobs with Mobile Number </p>
              <span
                className="AuthModal__container--close"
                onClick={() => {
                  // setIsOpen(false);
                  // setHash("");
                  // window.location.hash = "";
                  // router.replace(window.location.pathname);
                }}
              >
                &#10799;
              </span>
            </div>
            <div className="AuthModal__containerBody">
              <form
                className="AuthModal__containerBody--row"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label htmlFor="phone">Phone Number</label>
                <input
                  className="AuthModal__containerBody--phoneInput"
                  type="text"
                  name="phone"
                  id="phone"
                  required
                />
                <FancyButton
                  style={{
                    width: "100%",
                    height: "33px",
                  }}
                >
                  Send OTP
                </FancyButton>
                {phoneNumberError && (
                  <span
                    className="AuthModal__containerBody--errorMsg"
                    data-icon={String.fromCharCode(57344)}
                  >
                    <p>Please enter a valid phone number</p>
                  </span>
                )}
              </form>
              {isOtpSent && (
                <div className="AuthModal__containerBody--row">
                  <label htmlFor="otp">OTP</label>
                  <PinInput
                    length={6}
                    initialValue=""
                    type="numeric"
                    autoSelect={true}
                    inputStyle={{
                      margin: "0",
                      color: "#757575",
                      border: "1.5px solid #dddddd",
                      width: "35px",
                      height: "35px",
                      fontSize: "15px",
                      borderRadius: "4px",
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onComplete={async (value) => {
                      console.log(value);
                    }}
                    inputFocusStyle={{
                      border: "2px solid",
                    }}
                  />
                  {otpError && (
                    <span
                      className="AuthModal__containerBody--errorMsg"
                      data-icon={String.fromCharCode(57344)}
                    >
                      <p>Invalid OTP</p>
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="AuthModal__container--resendOtp">
              <p>Didn't get OTP?</p>
              <span>Resend OTP</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
