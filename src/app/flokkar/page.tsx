import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";

export default function Home() {
  return (
    <div>
        <Navigation />
        <Categories title="Allir Flokkar" />
        <Footer/>
    </div>
  );
}
