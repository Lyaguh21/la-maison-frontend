import ChefsChoiceSection from "./sections/ChefsChoiceSection";
import Footer from "./sections/Footer";
import HeroSection from "./sections/HeroSection";
import HistorySection from "./sections/HistorySection";
import LocationSection from "./sections/LocationSection";

export default function Landing() {
  return (
    <>
      <HeroSection />
      <HistorySection />
      <ChefsChoiceSection />
      <LocationSection />
      <Footer />
    </>
  );
}
