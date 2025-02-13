"use client";
import { useEffect } from "react";
import Banner from "@/components/home/Banner";
import Benefits from "@/components/home/Benefits";
import Category from "@/components/home/Category";
import Deals from "@/components/home/Deals";
import Featured from "@/components/home/Featured";
import Offers from "@/components/home/Offers";
import Shop from "@/components/home/Shop";
import Testimonial from "@/components/home/Testimonial";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
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
        {/* <div id="logo">
          <Logo />
        </div> */}
        <div id="category">
          <Category />
        </div>
        <div id="testimonial">
          <Testimonial />
        </div>
      </div>
      <Footer />
    </>
  );
}
