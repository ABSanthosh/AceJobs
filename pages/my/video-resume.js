import "../../styles/routes/My/My.scss";
import Header from "../../Components/Header/Header";
import Link from "next/link";
import FancySelect from "../../Components/FancySelect/FancySelect";
import { useRouter } from "next/router";
import { fetchUserById, fetchVideoResumeById } from "../../db/user.db";
const VideoRecorder = dynamic(
  () => import("../../Components/VideoRecorder/VideoRecorder"),
  { ssr: false }
);
import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import dynamic from "next/dynamic";

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
      videoResume: await fetchVideoResumeById(context.req.session.user.uid),
    },
  };
}

export default function VideoResume({ user, videoResume }) {
  const router = useRouter();
  const nanoid = customAlphabet("1234567890abcdef", 7);

  const [videoData, setVideoData] = useState({
    name: "",
    workExperience: "",
    expectedSalary: "",
    phoneNo: "",
    timeSlots: "",
  });

  useEffect(() => {
    setVideoData({
      name: nanoid(),
      workExperience: nanoid(),
      expectedSalary: nanoid(),
      phoneNo: nanoid(),
      timeSlots: nanoid(),
    });
  }, []);

  return (
    <div className="VideoResumeMain">
      <div className="VideoResumeMain__top">
        <FancySelect
          options={[
            { value: "dashboard", label: "Dashboard" },
            { value: "applications", label: "Applications" },
            { value: "resume", label: "Resume" },
            { value: "video-resume", label: "Video Resume" },
          ]}
          style={{
            height: "32px",
            width: "240px",
            fontSize: "14px",
          }}
          onChange={(e) => {
            router.replace(`/my/${e}`);
          }}
          defaultValue="video-resume"
        />
      </div>

      <div className="VideoResumeMain">
        <div className="VideoResumeMain__left">
          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Name</label>
            <VideoRecorder
              videoId={
                videoResume?.name && videoResume?.name !== ""
                  ? videoResume.name
                  : videoData.name
              }
              userId={user.uid}
              type="name"
              isFetchable={videoResume?.name !== ""}
            />
          </div>
          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Work Experience</label>
            <VideoRecorder
              videoId={
                videoResume?.workExperience &&
                videoResume?.workExperience !== ""
                  ? videoResume.workExperience
                  : videoData.workExperience
              }
              userId={user.uid}
              type="workExperience"
              isFetchable={videoResume?.workExperience !== ""}
            />
          </div>

          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Expected Salary</label>
            <VideoRecorder
              userId={user.uid}
              type="expectedSalary"
              isFetchable={videoResume?.expectedSalary !== ""}
              videoId={
                videoResume?.expectedSalary &&
                videoResume?.expectedSalary !== ""
                  ? videoResume.expectedSalary
                  : videoData.expectedSalary
              }
            />
          </div>
          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Phone No.</label>
            <VideoRecorder
              userId={user.uid}
              type="phoneNo"
              isFetchable={videoResume?.phoneNo !== ""}
              videoId={
                videoResume?.phoneNo && videoResume?.phoneNo !== ""
                  ? videoResume.phoneNo
                  : videoData.phoneNo
              }
            />
          </div>
          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Time Slots</label>
            <VideoRecorder
              userId={user.uid}
              type="timeSlots"
              isFetchable={videoResume?.timeSlots !== ""}
              videoId={
                videoResume?.timeSlots && videoResume?.timeSlots !== ""
                  ? videoResume.timeSlots
                  : videoData.timeSlots
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

VideoResume.getLayout = function getLayout(page) {
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
          <li className="MyLayout__panel--item">
            <Link href="/my/resume">Resume</Link>
          </li>
          <li className="MyLayout__panel--activeItem">
            <Link href="/my/video-resume">Video Resume</Link>
          </li>
        </ul>
        {page}
      </div>
    </div>
  );
};