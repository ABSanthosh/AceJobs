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
  } else if (context.req.session.user.isEmployer) {
    return {
      redirect: {
        permanent: false,
        destination: "/my/dashboard",
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
      name:
        videoResume !== null && videoResume.name !== ""
          ? videoResume.name
          : nanoid(),
      workExperience:
        videoResume !== null && videoResume.workExperience !== ""
          ? videoResume.workExperience
          : nanoid(),
      expectedSalary:
        videoResume !== null && videoResume.expectedSalary !== ""
          ? videoResume.expectedSalary
          : nanoid(),
      phoneNo:
        videoResume !== null && videoResume.phoneNo !== ""
          ? videoResume.phoneNo
          : nanoid(),
      timeSlots:
        videoResume !== null && videoResume.timeSlots !== ""
          ? videoResume.timeSlots
          : nanoid(),
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
              videoId={videoData.name}
              userId={user.uid}
              type="name"
              isFetchable={videoResume !== null && videoResume.name !== ""}
            />
          </div>
          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Work Experience</label>
            <VideoRecorder
              videoId={videoData.workExperience}
              userId={user.uid}
              type="workExperience"
              isFetchable={
                videoResume !== null && videoResume.workExperience !== ""
              }
            />
          </div>

          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Expected Salary</label>
            <VideoRecorder
              userId={user.uid}
              type="expectedSalary"
              isFetchable={
                videoResume !== null && videoResume.expectedSalary !== ""
              }
              videoId={videoData.expectedSalary}
            />
          </div>
          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Phone No.</label>
            <VideoRecorder
              userId={user.uid}
              type="phoneNo"
              isFetchable={videoResume !== null && videoResume.phoneNo !== ""}
              videoId={videoData.phoneNo}
            />
          </div>
          <div className="VideoResumeMain__left--row">
            <label data-mandatory>Time Slots</label>
            <VideoRecorder
              userId={user.uid}
              type="timeSlots"
              isFetchable={videoResume !== null && videoResume.timeSlots !== ""}
              videoId={videoData.timeSlots}
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
