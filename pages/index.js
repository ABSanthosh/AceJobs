import FancyButton from "../Components/FancyButton/FancyButton";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import JobCategoryBox from "../Components/JobCategoryBox/JobCategoryBox";
import Testimonial from "../Components/Testimonial/Testimonial";
import "../styles/routes/Home.scss";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      locale,
    },
  };
}

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home({ locale }) {
  const t = useTranslations("Home");
  const [emblaRef] = useEmblaCarousel({
    loop: true,
  });

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
      <section className="JobsSection">
        <div className="JobsSection__content">
          <h2>Find a Job...</h2>
          <div className="JobsSection__content--listing">
            <JobCategoryBox
              href="jobs/category/design"
              title={"Tutor"}
              icon={58982}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={"Driver"}
              icon={58673}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={"Personal trainer"}
              icon={60227}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={"Caretaker"}
              icon={58696}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={"Cook"}
              icon={58721}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={"Social Media Manager"}
              icon={60315}
            />
            <JobCategoryBox
              href="jobs/category/design"
              type="find"
              title="Find More"
            />
          </div>
        </div>
      </section>

      <section className="ReviewSection">
        <div className="ReviewSection__content">
          <h2>What our users say...</h2>
          <div className="ReviewSection__content--listing" ref={emblaRef}>
            <div className="ReviewSection__content--listingContainer">
              <Testimonial
                userName="John Doe"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed"
                rating={4}
              />
              <Testimonial
                userName="John Doe"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed"
                rating={4}
              />
              <Testimonial
                userName="John Doe"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed"
                rating={4}
              />
              <Testimonial
                userName="John Doe"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed"
                rating={4}
              />
              <Testimonial
                userName="John Doe"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed"
                rating={4}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
