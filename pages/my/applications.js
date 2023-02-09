import "../../styles/routes/My/My.scss";
import Header from "../../Components/Header/Header";
import Link from "next/link";
import FancySelect from "../../Components/FancySelect/FancySelect";
import { useRouter } from "next/router";

export default function Applications() {
  const router = useRouter();
  return (
    <div className="ApplicationsMain">
      <div className="ApplicationsMain__top">
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
          defaultValue="applications"
        />
      </div>
      Hello
    </div>
  );
}

Applications.getLayout = function getLayout(page) {
  return (
    <div className="MyLayout">
      <Header isSmall={true} />
      <div className="MyLayout__page">
        <ul className="MyLayout__panel">
          <li className="MyLayout__panel--item">
            <Link href="/my/dashboard">Dashboard</Link>
          </li>
          <li className="MyLayout__panel--activeItem">
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
