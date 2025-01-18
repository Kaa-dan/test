import Banner from "@/components/home/Banner";
import Benefits from "@/components/home/Benefits";
import Category from "@/components/home/Category";
import Offers from "@/components/home/Offers";
import Shop from "@/components/home/Shop";
import Testimonial from "@/components/home/Testimonial";

export default function Home() {
  return (
    <div>
      <Banner />
      <Benefits />
      <Offers />
      <Shop />
      <Category />
      <Testimonial />
    </div>
  );
}
