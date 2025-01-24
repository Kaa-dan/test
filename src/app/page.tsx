import Banner from "@/components/home/Banner";
import Benefits from "@/components/home/Benefits";
import Category from "@/components/home/Category";
import Deals from "@/components/home/Deals";
import Featured from "@/components/home/Featured";
import Offers from "@/components/home/Offers";
import Shop from "@/components/home/Shop";
import Testimonial from "@/components/home/Testimonial";

export default function Home() {
  return (
    <div>
      <Banner />
      <div id="benefits">
        <Benefits />
      </div>
      <div id="offers">
        <Offers />
      </div>
      <div id="deals">
        <Deals />
      </div>
      <div id="shop">
        <Shop />
      </div>
      <div id="featured">
        <Featured />
      </div>
      <div id="category">
        <Category />
      </div>
      <div id="testimonial">
        <Testimonial />
      </div>
    </div>
  );
}
