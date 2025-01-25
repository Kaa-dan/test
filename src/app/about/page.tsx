import Banner from "@/components/about/Banner";
import Contact from "@/components/about/Contact";
import Details from "@/components/about/Details";
import Faq from "@/components/about/Faq";
import Logo from "@/components/home/Logo";
import React from "react";

const page = () => {
  return (
    <div>
      <Banner />
      <Details />
      <Faq />
      <Contact />
      <Logo />
    </div>
  );
};

export default page;
