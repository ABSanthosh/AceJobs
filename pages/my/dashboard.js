import "../../styles/routes/My/My.scss";
import Header from "../../Components/Header/Header";
import Link from "next/link";
import FancySelect from "../../Components/FancySelect/FancySelect";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { updateUser } from "../../operations/my.fetch";
import { fetchUserById } from "../../db/user.db";

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
    },
  };
}

export default function Dashboard({ user }) {
  const router = useRouter();

  const [isSaveButton, setIsSaveButton] = useState(false);

  const [localUserData, setLocalUserData] = useState({
    uid: user.uid,
    displayName: user?.displayName || "",
    address: user?.address || "",
    age: user?.age || 0,
    phone: user?.phone || 0,
    email: user?.email || "",
    occupation: user?.occupation || "",
    workExperience: user?.workExperience || [],
  });

  useEffect(() => {
    if (user) {
      setLocalUserData({
        uid: user.uid,
        displayName: user.displayName,
        address: user.address,
        age: user.age,
        phone: user.phone,
        email: user.email,
        occupation: user.occupation,
        workExperience: user.workExperience,
      });
    }
  }, [user]);

  useEffect(() => {
    if (
      localUserData.displayName !== user.displayName ||
      localUserData.address !== user.address ||
      localUserData.age !== user.age ||
      localUserData.phone !== user.phone ||
      localUserData.email !== user.email ||
      localUserData.occupation !== user.occupation ||
      localUserData.workExperience !== user.workExperience
    ) {
      setIsSaveButton(true);
    } else {
      setIsSaveButton(false);
    }
  }, [localUserData]);

  return (
    <div className="DashboardMain">
      <div className="DashboardMain__top">
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
          defaultValue="dashboard"
        />
      </div>
      <div className="DashboardMain__left">
        <div className="DashboardMain__left--row">
          <label>
            Name
            <span>*</span>
          </label>
          <input
            type="text"
            defaultValue={localUserData?.displayName}
            onChange={(e) => {
              setLocalUserData({
                ...localUserData,
                displayName: e.target.value,
              });
            }}
          />
        </div>
        <div className="DashboardMain__left--row">
          <label>
            Address<span>*</span>
          </label>
          <textarea
            defaultValue={localUserData?.address}
            onChange={(e) => {
              setLocalUserData({
                ...localUserData,
                address: e.target.value,
              });
            }}
          />
        </div>
        <div
          className="DashboardMain__left--column"
          style={{ maxWidth: "440px" }}
        >
          <div className="DashboardMain__left--row">
            <label>
              Age<span>*</span>
            </label>
            <input
              type="number"
              defaultValue={localUserData?.age}
              onChange={(e) => {
                setLocalUserData({
                  ...localUserData,
                  age: parseInt(e.target.value),
                });
              }}
            />
          </div>
          <div className="DashboardMain__left--row">
            <label>phone</label>
            <input type="tel" value={localUserData?.phone} disabled />
          </div>
        </div>
        <div className="DashboardMain__left--row">
          <label>
            Email
            <i>(Optional)</i>
          </label>
          <input
            type="email"
            defaultValue={localUserData?.email}
            onChange={(e) => {
              setLocalUserData({
                ...localUserData,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="DashboardMain__left--row">
          <label>
            Occupation
            <span>*</span>
          </label>
          <input
            type="text"
            defaultValue={localUserData?.occupation}
            onChange={(e) => {
              setLocalUserData({
                ...localUserData,
                occupation: e.target.value,
              });
            }}
          />
        </div>
        <div className="DashboardMain__left--row">
          <label>
            Work Experiences
            <i>(Optional)</i>
          </label>
          <input
            type="text"
            defaultValue={localUserData?.workExperience}
            onChange={(e) => {
              setLocalUserData({
                ...localUserData,
                workExperience: e.target.value,
              });
            }}
          />
        </div>

        {isSaveButton && (
          <FancyButton
            style={{ width: "100%", marginTop: "16px" }}
            onClick={async () => {
              await updateUser(localUserData).then((res) => {
                if (res.status === 200) {
                  window.alert("User data updated successfully");
                }
                setIsSaveButton(false);
              });
            }}
          >
            Save
          </FancyButton>
        )}
      </div>

      {/* <div className="DashboardMain__right">
        <span data-icon={String.fromCharCode(59475)} />
      </div> */}
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <div className="MyLayout">
      <Header isSmall={true} />
      <div className="MyLayout__page">
        <ul className="MyLayout__panel">
          <li className="MyLayout__panel--activeItem">
            <Link href="/my/dashboard">Dashboard</Link>
          </li>
          <li className="MyLayout__panel--item">
            <Link href="/my/applications">Applications</Link>
          </li>
          <li className="MyLayout__panel--item">
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
