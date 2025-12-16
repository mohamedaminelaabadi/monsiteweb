import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MoviesCarousel from '@/components/MoviesCarousel';
import Categories from '@/components/Categories';
import Features from '@/components/Features';
import Platforms from '@/components/Platforms';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MoviesCarousel />
        <Categories />
        <Features />
        <Platforms />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
