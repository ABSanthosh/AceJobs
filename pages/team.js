import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import "../styles/routes/EmployerPage.scss";

export async function getServerSideProps(ctx) {
  return {
    props: {},
  };
}

export default function EmployerPage() {
  return (
    <div className="EmployerPage">
      <Header />
      <main className="EmployerPage__main">
        <section className="EmployerPage__pricingBoxes">
          <img src="/Img/team.jpeg" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
