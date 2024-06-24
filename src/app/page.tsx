import Footer from "../components/homePage/footer";
import Main from "../components/homePage/main";
import Navbar from "../components/homePage/navbar";
// import {db} from "@/"
export default function Home() {
  return (
    <div className=" h-screen">
      <div className="bg-white dark:bg-gray-900 astro-MEQNHB5A">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
