import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import JobListing from "../../Components/JobListing/JobListing";
import "../../styles/routes/Job/JobPage.scss";
import { useRouter } from "next/router";
import Modal from "../../Components/Modal/Modal";
import { useEffect, useState } from "react";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  const { jobType, view } = ctx.query;

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

  if (view !== undefined && view !== "employee" && view !== "employer") {
    return {
      redirect: {
        permanent: false,
        destination: `/jobs/${jobType}/?view=employee`,
      },
    };
  }

  return {
    props: {
      jobType,
      jobs,
    },
  };
}

export default function JobPage({ jobType, jobs }) {
  const router = useRouter();
  const { query, pathname, asPath } = router;

  const [isEmpModalOpen, setIsEmpModalOpen] = useState(
    query.view === undefined
  );

  useEffect(() => {
    if (query.view === undefined) {
      window.location.hash = "#emp-status";
    }
  }, []);

  return (
    <div className="JobPage">
      <Header />
      {isEmpModalOpen && (
        <Modal
          setModalState={setIsEmpModalOpen}
          modalState={isEmpModalOpen}
          hash="emp-status"
          containerStyle={{
            minHeight: "auto",
            width: "370px",
          }}
          showCloseButton={false}
        >
          <div className="JobPageModal">
            <h2>Are you an...</h2>
            <ul className="JobPageModal--buttons">
              <li>
                <Link href={`/jobs/${jobType}/?view=employee`}>
                  <a>Employee</a>
                </Link>
              </li>
              <li>
                <Link href={`/jobs/${jobType}/?view=employer`}>
                  <a>Employer</a>
                </Link>
              </li>
            </ul>
          </div>
        </Modal>
      )}
      <main className="JobPage__main">
        <h1>{jobType} Jobs</h1>
        {query.view === "employee" && <h3>Employees are looking for...</h3>}
        {query.view === "employer" && <h3>Hire a...</h3>}
        <section className="JobPage__main--container">
          {jobs
            .filter((item) => item.type === jobType)
            .map((item, index) => (
              <JobListing
                key={index}
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
