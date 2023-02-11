import FancyButton from "../Components/FancyButton/FancyButton";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import JobCategoryBox from "../Components/JobCategoryBox/JobCategoryBox";
import Testimonial from "../Components/Testimonial/Testimonial";
import "../styles/routes/Home.scss";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import { getJobsByIds } from "../db/jobs.db";
import { fetchReviews } from "../db/user.db";

export async function getStaticProps({ locale }) {
  const jobs = await getJobsByIds([
    "bf1d2ca",
    "201f3a7",
    "517242b",
    "45a1a5e",
    "85317af",
    "93e9d1b",
  ]);

  const reviews = await fetchReviews();
  console.log(reviews);
  
  // 1	5	Devanshi Puri	Putting together a website is a task, finding the right individual or company is even more complex. Thank you acejobs for help.
  // 2	3	Sarthak Vivek	Excellent, working with acejobs was great. Thanks to their knowledge and determination our website looks great and functions really good.
  // 3	4	Sanjana Muthukumaran	Great design team and quick turn around on all projects and request. With their help we have improved our google search results.
  // 4	5	Tanmay Sachan	Good to work with Acejobs.
  // 5	5	Kartikeya Rawat	A great platform for part-time jobs.
  // 6	2	Sanchi Aggarwal	Very useful to find drivers here as there is less availability of so many of them at the same time.

  // insert into Reviews (id, rating, userName, content) values (1, 5, 'Devanshi Puri', 'Putting together a website is a task, finding the right individual or company is even more complex. Thank you acejobs for help.');
  // insert into Reviews (id, rating, userName, content) values (2, 3, 'Sarthak Vivek', 'Excellent, working with acejobs was great. Thanks to their knowledge and determination our website looks great and functions really good.');
  // insert into Reviews (id, rating, userName, content) values (3, 4, 'Sanjana Muthukumaran', 'Great design team and quick turn around on all projects and request. With their help we have improved our google search results.');
  // insert into Reviews (id, rating, userName, content) values (4, 5, 'Tanmay Sachan', 'Good to work with Acejobs.');
  // insert into Reviews (id, rating, userName, content) values (5, 5, 'Kartikeya Rawat', 'A great platform for part-time jobs.');
  // insert into Reviews (id, rating, userName, content) values (6, 2, 'Sanchi Aggarwal', 'Very useful to find drivers here as there is less availability of so many of them at the same time.');

  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      locale,
      jobs: JSON.parse(JSON.stringify(jobs)),
      reviews,
    },
  };
}

export default function Home({ locale, jobs, reviews }) {
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
              {/* <span>Apply for</span> */}
              {/* <FancyButton
                isLink={true}
                href="/jobs/semi-skilled"
                style={{ width: "180px" }}
              >
                {t("HeroSection.FancyButtons.semiSkilled")}
              </FancyButton> */}
              <FancyButton
                isLink={true}
                href="/jobs/skilled"
                style={{ width: "180px" }}
              >
                Learn More
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
            {jobs.map((job, index) => (
              <JobCategoryBox
                key={job.id}
                href={`/jobs/apply/${job.id}`}
                title={job.title}
                icon={parseInt(job.icon)}
                imageIndex={index}
                style={{
                  width: "100%",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ReviewSection">
        <div className="ReviewSection__content">
          <h2>What our users say...</h2>
          <div className="ReviewSection__content--listing" ref={emblaRef}>
            <div className="ReviewSection__content--listingContainer">
              {reviews.map((review) => (
                <Testimonial
                  key={review.id}
                  content={review.content}
                  userName={review.userName}
                  rating={review.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
