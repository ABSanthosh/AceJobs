import "../../styles/routes/My/My.scss";
import Header from "../../Components/Header/Header";
import Link from "next/link";
import FancySelect from "../../Components/FancySelect/FancySelect";
import { useRouter } from "next/router";
import { fetchEmployerById, fetchUserById } from "../../db/user.db";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { useState } from "react";
import Fetcher from "../../utils/Fetcher";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/#login",
      },
    };
  }

  return {
    props: {
      user: await fetchUserById(context.req.session.user.uid),
      employer: await fetchEmployerById(context.req.session.user.uid),
    },
  };
}

export default function EmployerData({ employer, user }) {
  const router = useRouter();

  const [employerData, setEmployerData] = useState({
    uid: user.uid,
    organizationName: employer?.organizationName || "",
    organizationAddress: employer?.organizationAddress || "",
    industry: employer?.industry || "",
    organizationSize: employer?.organizationSize || "",
    organizationType: employer?.organizationType || "",
    logo: employer?.logo || "",
    tagLine: employer?.tagLine || "",
  });

  return (
    <div className="EmployerDataMain">
      <div className="EmployerDataMain__top">
        <FancySelect
          options={[
            { value: "dashboard", label: "Dashboard" },
            { value: "applications", label: "Applications" },
            { value: "employer", label: "Employer Data" },
          ]}
          style={{
            height: "32px",
            width: "240px",
            fontSize: "14px",
          }}
          onChange={(e) => {
            router.replace(`/my/${e}`);
          }}
          defaultValue="applications"
        />
      </div>
      <div className="EmployerDataMain__left">
        <div className="EmployerDataMain__left--row">
          <label data-mandatory>Organization Name</label>
          <input
            type="text"
            value={employerData.organizationName}
            onChange={(e) => {
              setEmployerData({
                ...employerData,
                organizationName: e.target.value,
              });
            }}
          />
        </div>
        <div className="EmployerDataMain__left--row">
          <label data-mandatory>Organization Address</label>
          <textarea
            value={employerData.organizationAddress}
            onChange={(e) => {
              setEmployerData({
                ...employerData,
                organizationAddress: e.target.value,
              });
            }}
          />
        </div>
        <div className="EmployerDataMain__left--row">
          <label data-mandatory>Industry</label>
          <input
            type="text"
            value={employerData.industry}
            onChange={(e) => {
              setEmployerData({
                ...employerData,
                industry: e.target.value,
              });
            }}
          />
        </div>
        <div className="EmployerDataMain__left--row">
          <label data-mandatory>Organization Size</label>
          <input
            type="text"
            value={employerData.organizationSize}
            onChange={(e) => {
              setEmployerData({
                ...employerData,
                organizationSize: e.target.value,
              });
            }}
          />
        </div>
        <div className="EmployerDataMain__left--row">
          <label data-mandatory>Organization Type</label>
          <input
            type="text"
            value={employerData.organizationType}
            onChange={(e) => {
              setEmployerData({
                ...employerData,
                organizationType: e.target.value,
              });
            }}
          />
        </div>
        <div className="EmployerDataMain__left--row">
          <label>Logo</label>
          <input type="file" />
        </div>
        <div className="EmployerDataMain__left--row">
          <label>Tagline</label>
          <textarea
            value={employerData.tagline}
            onChange={(e) => {
              setEmployerData({
                ...employerData,
                tagline: e.target.value,
              });
            }}
          />
        </div>

        <FancyButton
          disabled={
            !Object.values(employerData)
              .filter((_, index) => index !== 6 && index !== 7)
              .every((value) => value !== "")
          }
          onClick={async () => {
            if (
              !Object.values(employerData)
                .filter((_, index) => index !== 6 && index !== 7)
                .every((value) => value !== "")
            )
              return;

            await Fetcher("/api/user/update-employer", {
              method: "POST",
              body: employerData,
            }).then((res) => {
              if (res.status === 200) {
                alert("Successfully updated employer data");
              }
            });
          }}
          style={{ width: "100%", marginBottom: "50px" }}
        >
          Save
        </FancyButton>
      </div>
    </div>
  );
}

EmployerData.getLayout = function getLayout(page) {
  return (
    <div className="MyLayout">
      <Header isSmall={true} />
      <div className="MyLayout__page">
        <ul className="MyLayout__panel">
          <li className="MyLayout__panel--item">
            <Link href="/my/dashboard">Dashboard</Link>
          </li>
          <li className="MyLayout__panel--item">
            <Link href="/my/applications">Applications</Link>
          </li>
          <li className="MyLayout__panel--activeItem">
            <Link href="/my/employer">Employer Data</Link>
          </li>
        </ul>
        {page}
      </div>
    </div>
  );
};
