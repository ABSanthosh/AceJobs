import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "../../styles/routes/Job/JobPage.scss";

export async function getServerSideProps(ctx) {
  const { jobType } = ctx.query;
  return {
    props: {
      jobType,
    },
  };
}

export default function JobPage({ jobType }) {
  return (
    <div className="JobPage">
      <Header />
      <main className="JobPage__main">
        <h1>{jobType} Jobs</h1>
      </main>
      <Footer />
    </div>
  );
}
