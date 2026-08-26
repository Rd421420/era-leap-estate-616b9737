import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileCallBar from "./MobileCallBar";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="pb-[52px] md:pb-0">
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileCallBar />
    </>
  );
};

export default Layout;