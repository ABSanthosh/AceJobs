import "../../styles/routes/My/My.scss";
import Header from "../../Components/Header/Header";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import FancySelect from "../../Components/FancySelect/FancySelect";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="DashboardMain">
      <div className="DashboardMain__top">
        <FancySelect
          options={[
            { value: "dashboard", label: "Dashboard" },
            { value: "applications", label: "Applications" },
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
          <input type="text" defaultValue={user?.displayName} />
        </div>
        <div className="DashboardMain__left--row">
          <label>
            Address<span>*</span>
          </label>
          <textarea />
        </div>
        <div
          className="DashboardMain__left--column"
          style={{ maxWidth: "440px" }}
        >
          <div className="DashboardMain__left--row">
            <label>
              Age<span>*</span>
            </label>
            <input type="number" />
          </div>
          <div className="DashboardMain__left--row">
            <label>Mobile</label>
            <input type="tel" value={user?.phone} disabled />
          </div>
        </div>
        <div className="DashboardMain__left--row">
          <label>
            Email
            <i>(Optional)</i>
          </label>
          <input type="email" />
        </div>
        <div className="DashboardMain__left--row">
          <label>
            Occupation
            <span>*</span>
          </label>
          <input type="text" />
        </div>
        <div className="DashboardMain__left--row">
          <label>
            Work Experiences
            <i>(Optional)</i>
          </label>
          <input type="text" />
        </div>
      </div>

      <div className="DashboardMain__right">
        <span data-icon={String.fromCharCode(59475)} />
      </div>
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
            <Link href="/my/applications">applications</Link>
          </li>
        </ul>
        {page}
      </div>
    </div>
  );
};
