import React, { useEffect, useRef, useState } from "react";
import "./AuthModal.scss";
import { useRouter } from "next/router";
import PinInput from "react-pin-input";
import FancyButton from "../FancyButton/FancyButton";
import BlurredSpinner from "../BlurredSpinner/BlurredSpinner";

// FireBase
import { firebaseApp } from "../../firebase/firebaseInit";
import firebase from "firebase/compat/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { getUserInAPI } from "../../operations/auth.fetch";
import Fetcher from "../../utils/Fetcher";

export default function AuthModal() {
  const [hash, setHash] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const buttonRef = useRef(null);

  const { setUser } = useAuth();

  const auth = getAuth();
  useEffect(() => {
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

  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      setHash("");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="AuthModal">
          <div className="AuthModal__container">
            <div
              id="reCaptchaContainer"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
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
                  setIsOpen(false);
                  setHash("");
                  window.location.hash = "";
                  router.replace(window.location.pathname);
                }}
              >
                &#10799;
              </span>
            </div>
            <div className="AuthModal__containerBody">
              <form
                className="AuthModal__containerBody--row"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setShowLoader(true);

                  window.recaptchaVerifier = new RecaptchaVerifier(
                    "reCaptchaContainer",
                    {
                      size: "invisible",
                      callback: async (response) => {
                        window.appVerifierResponse = response;
                      },
                    },
                    auth
                  );
                  try {
                    const confirmationResult = await signInWithPhoneNumber(
                      auth,
                      `+91-${phoneNumber}`,
                      window.recaptchaVerifier
                    );
                    window.confirmationResult = confirmationResult;
                    setIsOtpSent(true);
                    setShowLoader(false);
                  } catch (error) {
                    setOtpError(error.message);
                    setShowLoader(false);
                  }
                }}
              >
                <label htmlFor="phone">Phone Number</label>
                <input
                  className="AuthModal__containerBody--phoneInput"
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  required
                />

                <FancyButton
                  innerRef={buttonRef}
                  style={{
                    width: "100%",
                    height: "33px",
                  }}
                  type="submit"
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
                      setShowLoader(true);
                      try {
                        const result = await window.confirmationResult.confirm(
                          value
                        );
                        const {
                          uid,
                          displayName,
                          email,
                          phoneNumber: phone,
                        } = result.user;

                        const {
                          createdAt,
                          creationTime,
                          lastLoginAt,
                          lastSignInTime,
                        } = result.user.metadata;

                        const { accessToken, expirationTime, refreshToken } =
                          result.user.stsTokenManager;

                        const response = await getUserInAPI({
                          uid,
                          displayName: displayName ? displayName : "",
                          email: email ? email : "",
                          phone,
                          createdAt: String(createdAt),
                          creationTime,
                          lastLoginAt: String(lastLoginAt),
                          lastSignInTime,
                          accessToken: accessToken ? String(accessToken) : "",
                          expirationTime: expirationTime
                            ? String(expirationTime)
                            : "",
                          refreshToken: refreshToken,
                          address: "",
                          age: 0,
                          occupation: "",
                          workExperience: "",
                        });

                        setIsOpen(false);
                        setUser(response.user);
                        window.location.hash = "";
                        router.replace(window.location.pathname);
                      } catch (error) {
                        setOtpError(error.message);
                        setShowLoader(false);
                      }
                      setShowLoader(false);
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
            {isOtpSent && (
              <div className="AuthModal__container--resendOtp">
                <p>Didn't get OTP?</p>
                <span>Resend OTP</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
