import Footer from "../components/homePage/footer";
import Main from "../components/homePage/main";
import Navbar from "../components/homePage/navbar";

export default async function Home() {
  return (
    <div className=" h-screen">
      <div className="bg-slate-900 dark:bg-gray-900 astro-MEQNHB5A">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
