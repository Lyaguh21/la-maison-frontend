import Header from "./components/Header";
import HeroSection from "./sections/HeroSection";
import HistorySection from "./sections/HistorySection";
import ChefsChoiceSection from "./sections/ChefsChoiceSection";
import LocationSection from "./sections/LocationSection";
import FooterSection from "./sections/FooterSection";

export default function Landing() {
  return (
    <>
      <Header />
      <HeroSection />
      <HistorySection />
      <ChefsChoiceSection />
      <LocationSection />
      <FooterSection />
    </>
  );
}
