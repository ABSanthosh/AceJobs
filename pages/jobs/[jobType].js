import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import JobListing from "../../Components/JobListing/JobListing";
import "../../styles/routes/Job/JobPage.scss";
import { useRouter } from "next/router";
import Modal from "../../Components/Modal/Modal";
import { useEffect, useState } from "react";
import Link from "next/link";
import StateCity from "../../Components/StateCityDropDown/StateCity";
import FancyInput from "../../Components/FancyInput/FancyInput";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { useMediaQuery } from "react-responsive";

export async function getServerSideProps(ctx) {
  const { jobType, view } = ctx.query;

  const jobs = [
    ...[...Array(20)].map((_, index) => ({
      title: `Skilled Job ${index}`,
      postedDate: "7 March",
      type: "skilled",
      postedBy: "Salesforce",
      jobDescription: "",
      location: "Ghaziabad, Uttar Pradesh, India",
    })),
    // ============= Unskilled Jobs =============
    ...[...Array(20)].map((_, index) => ({
      title: `Semi-skilled Job ${index}`,
      postedDate: "7 March",
      type: "semi-skilled",
      postedBy: "Salesforce",
      jobDescription: "",
      location: "Ghaziabad, Uttar Pradesh, India",
    })),
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

  const filterToggleQuery = useMediaQuery({ query: "(max-width: 1010px)" });

  const [isEmpModalOpen, setIsEmpModalOpen] = useState(
    query.view === undefined
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (query.view === undefined) {
      window.location.hash = "#emp-status";
    }
  }, []);

  useEffect(() => {
    if (filterToggleQuery) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        document.querySelector(".JobPage__filterBox--contents").style = `
          position: fixed;
          top: 70px;
          margin-top: 10px
          `;
      } else {
        document.querySelector(".JobPage__filterBox--contents").style = "";
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });

  useEffect(() => {
    if (isFilterOpen) {
      document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflowY = "auto";
    }
  }, [isFilterOpen]);

  useEffect(() => {
    if (
      document.getElementsByClassName(
        "JobPage__filterBox--activeFilterBox"
      )[0] &&
      !filterToggleQuery
    ) {
      document.getElementsByTagName("html")[0].style.overflowY = "auto";
      document
        .getElementsByClassName("JobPage__filterBox--activeFilterBox")[0]
        .classList.remove("JobPage__filterBox--activeFilterBox");
    }
  }, [filterToggleQuery]);

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
            <h2>Are you looking for a...</h2>
            <ul className="JobPageModal--buttons">
              <li>
                <Link href={`/jobs/${jobType}/?view=employee`}>
                  <a>Job</a>
                </Link>
              </li>
              <li>
                <Link href={`/jobs/${jobType}/?view=employer`}>
                  <a>Worker</a>
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
          <FancyButton
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{
              width: "100%",
              flexDirection: "row",
              gap: "10px",
            }}
            invertButton={true}
          >
            <span data-icon={String.fromCharCode(57682)} />
            Filter
          </FancyButton>

          <div
            className={`JobPage__filterBox JobPage__filterBox${
              isFilterOpen ? "--activeFilterBox" : ""
            }`}
          >
            <div className="JobPage__filterBox--contents">
              <button
                className="JobPage__filterBox--close"
                onClick={() => setIsFilterOpen(false)}
              >
                &#10799;
              </button>
              <h2>Filters</h2>
              <div className="JobPage__filterBox--column">
                <h3>Experience</h3>
                <div className="JobPage__filterBox--row">
                  <input type="checkbox" id="noExp" />
                  <label htmlFor="noExp">No Experience</label>
                </div>
                <div className="JobPage__filterBox--row">
                  <input type="checkbox" id="12Exp" />
                  <label htmlFor="12Exp">1-2 Years</label>
                </div>
                <div className="JobPage__filterBox--row">
                  <input type="checkbox" id="34Exp" />
                  <label htmlFor="34Exp">3-4 Years</label>
                </div>
                <div className="JobPage__filterBox--row">
                  <input type="checkbox" id="5Exp" />
                  <label htmlFor="5Exp">5 and above</label>
                </div>
              </div>
              <div className="JobPage__filterBox--column">
                <h3>Salary</h3>
                <div className="JobPage__filterBox--row">
                  <FancyInput
                    placeholder="1,000"
                    type="number"
                    onChange={() => {}}
                  />
                  to
                  <FancyInput
                    placeholder="10,000"
                    type="number"
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className="JobPage__filterBox--column">
                <h3>Location</h3>
                <StateCity />
              </div>
            </div>
          </div>
          <div className="JobPage__jobListings">
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
