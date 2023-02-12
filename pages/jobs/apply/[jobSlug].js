import { useRouter } from "next/router";
import FancyButton from "../../../Components/FancyButton/FancyButton";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import { getJobsBySlug } from "../../../db/jobs.db";
import "../../../styles/routes/Job/ApplyPage.scss";
import { Cashify } from "../../../utils/Cashify";

export async function getServerSideProps(ctx) {
  const { jobSlug } = ctx.query;
  const job = await getJobsBySlug(jobSlug);
  return {
    props: {
      job: JSON.parse(JSON.stringify(job)),
      user: ctx.req.session.user === undefined ? null : ctx.req.session.user,
    },
  };
}

export default function ApplyPage({ job, user }) {
  const router = useRouter();

  return (
    <div className="ApplyPage">
      <Header />
      <main className="ApplyPage__main">
        <h1>
          Apply for <i>{job.title}</i> role
        </h1>
        <section className="ApplyPage__main--container">
          <div className="ApplyPage__main--details">
            <div className="ApplyPage__main--detailsRow">
              <label>Description</label>
              <p
                className="ApplyPage__main--fakeInput"
                dangerouslySetInnerHTML={{
                  __html: job.description.replaceAll("\n", "<br/>"),
                }}
              />
            </div>
            <div className="ApplyPage__main--detailsRow">
              <label>Location</label>
              <p className="ApplyPage__main--fakeInput">{job.location}</p>
            </div>
            <div className="ApplyPage__main--detailsRow">
              <label>Salary</label>
              <p className="ApplyPage__main--fakeInput">
                {job.salary
                  .split("-")
                  .map((s) => Cashify(s))
                  .join(" - ")}{" "}
                per month
              </p>
            </div>
            <div className="ApplyPage__main--detailsRow">
              <label>Created At</label>
              <p className="ApplyPage__main--fakeInput">
                {new Date(job.createdAt).toDateString()}
              </p>
            </div>
          </div>
          <div className="ApplyPage__main--videoResume">
            <p>Upload a Video Resume</p>
            <div>
              <span>Drag and Drop</span> or <span>Click to select</span>
            </div>
            <span>Or</span>
            <FancyButton
              isLink={true}
              href={user === null ? `${router.asPath}#login` : "/my/resume"}
            >
              Apply for a detailed resume
            </FancyButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
