import "../../styles/routes/My/My.scss";
import Header from "../../Components/Header/Header";
import Link from "next/link";
import FancySelect from "../../Components/FancySelect/FancySelect";
import { useRouter } from "next/router";
import { fetchResumeById, fetchUserById } from "../../db/user.db";
import { useState } from "react";
import ChipInput from "../../Components/ChipInput/ChipInput";
import FancyButton from "../../Components/FancyButton/FancyButton";
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
      resume: await fetchResumeById(context.req.session.user.uid),
      user: await fetchUserById(context.req.session.user.uid),
    },
  };
}

export default function Resume({ resume, user }) {
  const [localResumeData, setLocalResumeData] = useState(
    resume || {
      uid: user.uid,
      name: "",
      workExperience: "",
      hireReason: "",
      hirePast: "",
      phoneNo: user.phone || "",
      timeSlots: "",
      aadhaarNo: "",
      panNo: "",
    }
  );
  const [workExperience, setWorkExperience] = useState(
    resume?.workExperience.split("|") || []
  );
  const [isJustSaved, setIsJustSaved] = useState(false);
  const router = useRouter();

  return (
    <div className="ResumeMain">
      <div className="ResumeMain__top">
        <FancySelect
          options={[
            { value: "dashboard", label: "Dashboard" },
            { value: "applications", label: "Applications" },
            { value: "resume", label: "Resume" },
            { value: "video-resume", label: "Video Resume"}
          ]}
          style={{
            height: "32px",
            width: "240px",
            fontSize: "14px",
          }}
          onChange={(e) => {
            router.replace(`/my/${e}`);
          }}
          defaultValue="resume"
        />
      </div>
      <div className="ResumeMain__left">
        <div className="ResumeMain__left--row">
          <label data-mandatory>Name</label>
          <input
            type="text"
            defaultValue={localResumeData?.name}
            onChange={(e) => {
              setLocalResumeData({
                ...localResumeData,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="ResumeMain__left--row">
          <label data-mandatory>Work Experiences</label>
          <ChipInput
            chips={workExperience}
            onRemove={(chipIndex) => {
              workExperience.splice(chipIndex, 1);
              setWorkExperience([...workExperience]);
            }}
            onChange={(newChip) => {
              setWorkExperience([...workExperience, newChip]);
              setLocalResumeData({
                ...localResumeData,
                workExperience: workExperience.join("|"),
              });
            }}
          />
        </div>
        <div className="ResumeMain__left--row">
          <label data-mandatory>Why should we hire you?</label>
          <textarea
            defaultValue={localResumeData?.hireReason}
            onChange={(e) => {
              setLocalResumeData({
                ...localResumeData,
                hireReason: e.target.value,
              });
            }}
          />
        </div>
        <div className="ResumeMain__left--row">
          <label data-mandatory>Reason for leaving previous job</label>
          <textarea
            defaultValue={localResumeData?.hirePast}
            onChange={(e) => {
              setLocalResumeData({
                ...localResumeData,
                hirePast: e.target.value,
              });
            }}
          />
        </div>
        <div className="ResumeMain__left--row">
          <label data-mandatory>Phone Number</label>
          <input
            type="text"
            defaultValue={localResumeData?.phoneNo}
            onChange={(e) => {
              setLocalResumeData({
                ...localResumeData,
                phoneNo: e.target.value,
              });
            }}
          />
        </div>
        <div className="ResumeMain__left--row">
          <label data-mandatory>Time Slots</label>
          <FancySelect
            options={[
              { value: "9am-12pm", label: "9am-12pm" },
              { value: "12pm-3pm", label: "12pm-3pm" },
              { value: "3pm-6pm", label: "3pm-6pm" },
              { value: "6pm-9pm", label: "6pm-9pm" },
            ]}
            style={{
              height: "32px",
              width: "100%",
              fontSize: "14px",
            }}
            onChange={(e) => {
              setLocalResumeData({
                ...localResumeData,
                timeSlots: e,
              });
            }}
            defaultValue={localResumeData?.timeSlots}
          />
        </div>
        <div className="ResumeMain__left--row">
          <label data-mandatory>Aadhaar Number</label>
          <input
            type="text"
            defaultValue={localResumeData?.aadhaarNo}
            onChange={(e) => {
              setLocalResumeData({
                ...localResumeData,
                aadhaarNo: e.target.value,
              });
            }}
          />
        </div>

        <div className="ResumeMain__left--row">
          <label data-mandatory>PAN Number</label>
          <input
            type="text"
            defaultValue={localResumeData?.panNo}
            onChange={(e) => {
              setLocalResumeData({
                ...localResumeData,
                panNo: e.target.value,
              });
            }}
          />
        </div>
        {(JSON.stringify(localResumeData) !== JSON.stringify(resume) ||
          !isJustSaved) && (
          <div className="ResumeMain__left--column">
            <FancyButton
              style={{ width: "100%", height: "32px" }}
              invertButton={true}
              onClick={() => {
                setLocalResumeData(resume);
                setWorkExperience(
                  localResumeData.workExperience
                    .split("|")
                    .filter((e) => e !== "")
                );
              }}
            >
              Cancel
            </FancyButton>

            <FancyButton
              style={{ width: "100%", height: "32px" }}
              onClick={async () => {
                if (
                  localResumeData.name === "" ||
                  localResumeData.workExperience === "" ||
                  localResumeData.hireReason === "" ||
                  localResumeData.hirePast === "" ||
                  localResumeData.phoneNo === "" ||
                  localResumeData.timeSlots === "" ||
                  localResumeData.aadhaarNo === "" ||
                  localResumeData.panNo === ""
                ) {
                  alert("Please fill all the fields");
                  return;
                }

                await Fetcher("/api/user/update-resume", {
                  method: "POST",
                  body: {
                    ...localResumeData,
                    workExperience: workExperience.join("|"),
                  },
                }).then((res) => {
                  if (res.status === 200) {
                    alert("Resume Saved");
                    setLocalResumeData(localResumeData);
                    setIsJustSaved(true);
                  } else {
                    alert("Error Saving Resume");
                  }
                });
              }}
            >
              Save
            </FancyButton>
          </div>
        )}
      </div>
    </div>
  );
}

Resume.getLayout = function getLayout(page) {
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
            <Link href="/my/resume">Resume</Link>
          </li>
          <li className="MyLayout__panel--item">
            <Link href="/my/video-resume">Video Resume</Link>
          </li>
        </ul>
        {page}
      </div>
    </div>
  );
};
