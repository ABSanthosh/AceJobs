import FancyButton from "../Components/FancyButton/FancyButton";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import JobCategoryBox from "../Components/JobCategoryBox/JobCategoryBox";
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
      <section className="CategorySection">
        <div className="CategorySection__content">
          <h2>Most Demanded Job Categories</h2>
          <div className="CategorySection__content--listing">
            <JobCategoryBox href="jobs/category/design" title="Design" subTitle="938 New Jobs" />
            <JobCategoryBox href="jobs/category/design" title="Design" subTitle="938 New Jobs" />
            <JobCategoryBox href="jobs/category/design" title="Design" subTitle="938 New Jobs" />
            <JobCategoryBox href="jobs/category/design" title="Design" subTitle="938 New Jobs" />
            <JobCategoryBox href="jobs/category" title="Find More" type="find" subTitle="938 New Jobs" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
