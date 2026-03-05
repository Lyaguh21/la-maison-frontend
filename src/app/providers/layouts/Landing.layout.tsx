import { Footer } from "@/pages/widgets/footer";
import { Header } from "@/pages/widgets/header";
import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
