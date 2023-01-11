import FancyButton from "../Components/FancyButton/FancyButton";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import JobCategoryBox from "../Components/JobCategoryBox/JobCategoryBox";
import "../styles/routes/Home.scss";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      locale,
    },
  };
}

export default function Home({ locale }) {
  const t = useTranslations("Home");

  return (
    <div className="LandingPage">
      <Header />
      <section className="HeroSection">
        <div className="HeroSection__left">
          <div className="HeroSection__top">
            <h1 className="HeroSection__top--title">
              {locale === "hi" && (
                <>
                  <span>{t("HeroSection.title.span")}</span>{" "}
                  {t("HeroSection.title.paragraph")}
                </>
              )}

              {locale === "en" && (
                <>
                  {t("HeroSection.title.paragraph")}{" "}
                  <span>{t("HeroSection.title.span")}</span>
                </>
              )}
            </h1>
            <p>{t("HeroSection.description")}</p>
            <div className="HeroSection__bottom">
              <span>Apply for</span>
              <FancyButton
                isLink={true}
                href="/jobs/semi-skilled"
                style={{ width: "180px" }}
              >
                {t("HeroSection.FancyButtons.semiSkilled")}
              </FancyButton>
              <FancyButton
                isLink={true}
                href="/jobs/skilled"
                style={{ width: "180px" }}
              >
                {t("HeroSection.FancyButtons.skilled")}
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
      <section className="TestimonialSection">
        <div className="TestimonialSection__content">
          <h2>Customer Reviews</h2>
          <div className="TestimonialSection__content--listing">
            <JobCategoryBox
              href="jobs/category/design"
              title={"Testimonial"}
              subTitle={"From plumber Raj"}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={"Testimonial"}
              subTitle={"From Carpenter Kumar"}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={"Testimonial"}
              subTitle={"From Electrician Ravi"}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={"Testimonial"}
              subTitle={"From Mechanic Ramesh"}
            />
            <JobCategoryBox
              href="jobs/category/design"
              type="find"
              title="Read More"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
