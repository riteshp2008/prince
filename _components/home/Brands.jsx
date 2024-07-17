"use client";

import React from "react";
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-card";

const Brands = () => {
  return (
    <div className="h-fit rounded-md flex flex-col antialiased bg-white items-center text-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
    </div>
  );
};

const testimonials = [
  {
    image: "https://www.svgrepo.com/show/315271/whatsapp.svg",
    name: "WhatsApp",
  },
  {
    image: "https://www.svgrepo.com/show/315263/snapchat.svg",
    name: "Snapchat",
  },
  {
    image: "https://www.svgrepo.com/show/315283/apple.svg",
    name: "Apple",
  },
];

export default Brands;
