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
      {/* <section className="CategorySection">
        <div className="CategorySection__content">
          <h2>{t("CategorySection.title")}</h2>
          <div className="CategorySection__content--listing">
            <JobCategoryBox
              href="jobs/category/design"
              title={t("CategorySection.JobCategoryBox.one.title")}
              subTitle={t("CategorySection.JobCategoryBox.two.listings", {
                count: 10,
              })}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={t("CategorySection.JobCategoryBox.two.title")}
              subTitle={t("CategorySection.JobCategoryBox.two.listings", {
                count: 10,
              })}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={t("CategorySection.JobCategoryBox.three.title")}
              subTitle={t("CategorySection.JobCategoryBox.two.listings", {
                count: 10,
              })}
            />
            <JobCategoryBox
              href="jobs/category/design"
              title={t("CategorySection.JobCategoryBox.four.title")}
              subTitle={t("CategorySection.JobCategoryBox.two.listings", {
                count: 10,
              })}
            />
            <JobCategoryBox
              href="jobs/category"
              title={t("CategorySection.JobCategoryBox.final.title")}
              type="find"
            />
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
}
