import FancyButton from "../../../Components/FancyButton/FancyButton";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import "../../../styles/routes/Job/ApplyPage.scss";

export async function getServerSideProps(ctx) {
  const { jobSlug } = ctx.query;
  return {
    props: {
      jobSlug,
    },
  };
}

export default function ApplyPage({ jobSlug }) {
  return (
    <div className="ApplyPage">
      <Header />
      <main className="ApplyPage__main">
        <h1>Apply for: {jobSlug}</h1>
        <section className="ApplyPage__main--container">
          <div className="ApplyPage__main--videoResume">
            <p>Upload a Video Resume</p>
            <div>
              <span>Drag and Drop</span> or <span>Click to select</span>
            </div>
          </div>
          <span>Or</span>
          <FancyButton>Apply for a detailed resume</FancyButton>
        </section>
      </main>
      <Footer />
    </div>
  );
}
