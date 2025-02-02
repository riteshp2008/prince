"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import Link from "next/link";
import { occasion } from "@/config/dummyData";
import { Button } from "@/components/ui/button";

const Occasion = () => {
  return (
    <div data-aos="fade-up">
      <div className="text-center pt-10 mb-8 md:mb-0">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Occasions
        </h1>
        <p className="text-center text-gray-600 -mb-10">
          Find the perfect gift for any occasion
        </p>
      </div>
      <div className="flex flex-wrap justify-center sm:gap-6 h-fit">
        {occasion.map((card, index) => (
          <CardContainer
            key={index}
            className="w-[16rem] md:w-[20rem] lg:w-[24rem] flex-shrink-0"
          >
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-blue-200 dark:border-white/[0.2] border-black/[0.1] h-min rounded-xl p-6 border transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardItem translateZ="100" className="w-full mb-4">
                <img
                  src={card.imageSrc}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={`thumbnail for ${card.text}`}
                />
              </CardItem>
              <div className="flex justify-center items-center">
                <CardItem
                  translateZ="50"
                  className="text-xl font-normal text-neutral-600 dark:text-black mb-3"
                >
                  {card.text}
                </CardItem>
              </div>
              <div className="flex justify-center items-center">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={card.link}
                  className="px-4 py-2 rounded-xl bg-black border border-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Shop Now
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
      {/* <div className="pb-8 text-center">
        <Button
          variant="outline"
          className="text-sm h-8 hover:bg-blue-300 transition-colors duration-300"
        >
          View All
        </Button>
      </div> */}
    </div>
  );
};

export default Occasion;
