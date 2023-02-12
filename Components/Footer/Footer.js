import Link from "next/link";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="FooterWrapper" id="contact">
      <div className="FooterWrapper__container">
        <div className="FooterWrapper__left">
          <img
            className="FooterWrapper__left--logo"
            src="/Img/logos/logo-text-white.svg"
          />

          <p className="FooterWrapper__left--copyrightUnderLogo">
            © 2022 Ace Jobs. All Rights Reserved
          </p>
        </div>

        <div className="FooterWrapper__right">
          <ul className="FooterWrapper__right--Service">
            <li className="FooterWrapper__right--rowHeading">Pages</li>
            <li>
              <Link href="/#">
                <a className="FooterWrapper__right--rowItem">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/team">
                <a className="FooterWrapper__right--rowItem">Team</a>
              </Link>
            </li>
            <li>
              <Link href="/jobs/skilled">
                <a className="FooterWrapper__right--rowItem">Jobs</a>
              </Link>
            </li>
          </ul>

          <ul className="FooterWrapper__right--Service">
            <li className="FooterWrapper__right--rowHeading">Contacts</li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--rowImage"
                src="/Img/mail.svg"
              /> */}
              <a
                className="FooterWrapper__right--rowItem"
                href="mailto:acejobs.com@gmail.com"
              >
                acejobs.co.in@gmail.com
              </a>
            </li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--rowImage"
                src="/Img/phone.svg"
              /> */}
              <a
                className="FooterWrapper__right--rowItem"
                href="tel:7065565068"
              >
                +91 7065565068
              </a>
            </li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--rowImage"
                src="/Img/map.svg"
              /> */}
              <a className="FooterWrapper__right--rowItem" href="/">
                Delhi, Noida
              </a>
            </li>
          </ul>

          <ul className="FooterWrapper__right--Service">
            <li className="FooterWrapper__right--rowHeading">Social Media</li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--RowIcon"
                src="/Img/instagram.svg"
              /> */}
              <a
                className="FooterWrapper__right--rowItem"
                href="https://instagram.com/acejobs.co.in?igshid=YmMyMTA2M2Y="
                target="_blank"
                referrerPolicy="no-referrer"
              >
                Instagram
              </a>
            </li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--RowIcon"
                src="/Img/linkedin.svg"
              /> */}
              <a
                className="FooterWrapper__right--rowItem"
                href="https://www.youtube.com/channel/UC7H_g-un7thobMDcJ_5eyvA"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                Youtube
              </a>
            </li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--RowIcon"
                src="/Img/facebook.svg"
              /> */}
              <a className="FooterWrapper__right--rowItem" href="/">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="FooterWrapper__left--Copyright">Ace Jobs copyright @2022</p>
    </div>
  );
}
