import { Contact, FeaturedProducts, Hero, Services } from '../../components/HomeComponents';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </div>
  );
}
