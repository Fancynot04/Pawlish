import { BookingSteps } from "@/components/BookingSteps";
import { ContactSection } from "@/components/ContactSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MemberBanner } from "@/components/MemberBanner";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { StoreEnvironmentCarousel } from "@/components/StoreEnvironmentCarousel";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <MemberBanner />
        <BookingSteps />
        <Reviews />
        <StoreEnvironmentCarousel />
        <ContactSection />
      </main>
    </>
  );
}
