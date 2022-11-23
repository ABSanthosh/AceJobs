import FancyButton from "../Components/FancyButton/FancyButton";
import Header from "../Components/Header/Header";
import "../styles/routes/Home.scss";

export default function Home() {
  return (
    <div className="LandingPage">
      <Header />
      <section className="HeroSection">
        <div className="HeroSection__left">
          <div className="HeroSection__top">
            <h1 className="HeroSection__top--title">
              Finding the right job for <span>You!</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              sollicitudin sagittis risus, vitae tempus augue. Integer quis
              ultricies libero. Morbi malesuada nulla mauris, ac pretium leo
              venenatis viverra. Nunc accumsan ornare est, vel fringilla lectus
              porttitor at Clas.
            </p>
            <div className="HeroSection__bottom">
              <FancyButton
                isLink={true}
                href="/jobs/semi-skilled"
                style={{ width: "180px" }}
              >
                Semi-Skilled jobs
              </FancyButton>
              <FancyButton
                isLink={true}
                href="/jobs/skilled"
                style={{ width: "180px" }}
              >
                Skilled jobs
              </FancyButton>
            </div>
          </div>
        </div>
        <div className="HeroSection__right">
          <img
            className="HeroSection__right--heroImage"
            src="/Img/HeroImage.svg"
          />
        </div>
      </section>
    </div>
  );
}
