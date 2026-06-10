import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileCallBar from "./MobileCallBar";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-[52px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
};

export default Layout;