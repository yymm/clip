/**
 * This is the root component for defining the layout.
 * e.g. Header, Footer, Sidebar, etc.
 */
import { Outlet } from "@remix-run/react";
import Header from "./components/header";
import Footer from "./components/footer";
import "../../tailwind.css";

export default function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
      <Header />
      <div className="flex-grow container mx-auto p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
