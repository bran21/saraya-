import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { MenuSection } from '../components/MenuSection';
import { ReservationSection } from '../components/ReservationSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <MenuSection />
      <ReservationSection />
    </>
  );
}
