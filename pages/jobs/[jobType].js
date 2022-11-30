import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import JobListing from "../../Components/JobListing/JobListing";
import "../../styles/routes/Job/JobPage.scss";

export async function getServerSideProps(ctx) {
  const { jobType } = ctx.query;

  const jobs = [
    {
      title: "Beautician",
      postedDate: "7 March",
      postedBy: "Salesforce",
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ipsum dolor sit",
      location: "Ghaziabad, Uttar Pradesh, India",
      type: "skilled",
    },
    {
      title: "Copywriter",
      postedDate: "7 March",
      postedBy: "Salesforce",
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ipsum dolor sit",
      location: "Ghaziabad, Uttar Pradesh, India",
      type: "skilled",
    },
    {
      title: "Graphic designer",
      postedDate: "7 March",
      postedBy: "Salesforce",
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ipsum dolor sit",
      location: "Ghaziabad, Uttar Pradesh, India",
      type: "skilled",
    },
    // ============= Unskilled Jobs =============
    {
      title: "Driver",
      postedDate: "7 March",
      postedBy: "Salesforce",
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ipsum dolor sit",
      location: "Ghaziabad, Uttar Pradesh, India",
      type: "semi-skilled",
    },
    {
      title: "Gardener",
      postedDate: "7 March",
      postedBy: "Salesforce",
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ipsum dolor sit",
      location: "Ghaziabad, Uttar Pradesh, India",
      type: "semi-skilled",
    },
    {
      title: "Plumber",
      postedDate: "7 March",
      postedBy: "Salesforce",
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ipsum dolor sit",
      location: "Ghaziabad, Uttar Pradesh, India",
      type: "semi-skilled",
    },
  ];

  return {
    props: {
      jobType,
      jobs,
    },
  };
}

export default function JobPage({ jobType, jobs }) {
  return (
    <div className="JobPage">
      <Header />
      <main className="JobPage__main">
        <h1>{jobType} Jobs</h1>
        <section className="JobPage__main--container">
          {jobs
            .filter((item) => item.type === jobType)
            .map((item, index) => (
              <JobListing
                postedDate={item.postedDate}
                postedBy={item.postedBy}
                jobTitle={item.title}
                jobDescription={item.jobDescription}
                location={item.location}
              />
            ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
