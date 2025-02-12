import Banner from "@/components/about/Banner";
import Contact from "@/components/about/Contact";
import Details from "@/components/about/Details";
import Faq from "@/components/about/Faq";
import Footer from "@/components/home/Footer";
import Logo from "@/components/home/Logo";
import Navbar from "@/components/home/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />

      <div>
        <Banner />
        <Details />
        <Faq />
        <Contact />
        <Logo />
      </div>
      <Footer /></>
  );
};

export default page;
