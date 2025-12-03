import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import FlashDeals from "@/components/FlashDeals";
import Brands from "@/components/Brands";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <FlashDeals />
        <Brands />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
