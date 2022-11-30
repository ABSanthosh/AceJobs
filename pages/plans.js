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
        <h2>Predictable pricing, no surprises</h2>
        <section className="EmployerPage__pricingBoxes">
          <div className="EmployerPage__pricingBoxes--col">
            <span>Coming Soon</span>
          </div>
          <div className="EmployerPage__pricingBoxes--col">
            <span>Coming Soon</span>
          </div>
          <div className="EmployerPage__pricingBoxes--col">
            <span>Coming Soon</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
