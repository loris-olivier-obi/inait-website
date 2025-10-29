import Home from "@/components/pages/Home";
import Footer from "@/components/segments/navigation/Footer";

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Home />
      <Footer />
    </div>
  );
}
