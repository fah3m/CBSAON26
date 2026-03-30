import { Outlet, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div>
      <Navbar />

      <main>
        {/* Outlet = where child routes render */}
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
