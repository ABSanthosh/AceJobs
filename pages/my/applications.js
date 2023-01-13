import "../../styles/routes/My/My.scss";
import Header from "../../Components/Header/Header";
import Link from "next/link";

export default function Applications() {
  return <div className="ApplicationsMain">Applications here</div>;
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
            <Link href="/my/applications">applications</Link>
          </li>
        </ul>
        {page}
      </div>
    </div>
  );
};
