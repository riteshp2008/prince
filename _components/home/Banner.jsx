"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const dummyData = [
  {
    id: 1,
    text: "Products from Just ₹99",
    highlight: "Just ₹99",
    image:
      "https://img.freepik.com/free-psd/collection-items-girl-gender-reveal_23-2150983237.jpg?size=626&ext=jpg&ga=GA1.1.761205328.1720123392&semt=ais_hybrid",
    link: "/products/1",
  },
  {
    id: 2,
    text: "Exclusive Collection at Amazing Prices",
    highlight: "Amazing Prices",
    image:
      "https://img.freepik.com/free-photo/spring-wardrobe-switch-flat-lay_23-2150264148.jpg?size=626&ext=jpg&ga=GA1.1.761205328.1720123392&semt=ais_hybrid",
    link: "/products/2",
  },
  {
    id: 3,
    text: "Discover Our New Arrivals",
    highlight: "New Arrivals",
    image:
      "https://img.freepik.com/free-psd/view-hawaiian-shirt-with-pattern_23-2150819247.jpg?size=626&ext=jpg&ga=GA1.1.761205328.1720123392&semt=ais_hybrid",
    link: "/products/3",
  },
];

const Banner = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dummyData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mt-14 overflow-hidden bg-gray-200">
      <div className="relative w-full h-[70vh] flex items-center">
        <AnimatePresence>
          {dummyData.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full h-full flex items-center"
                >
                  <div className="w-1/2 pl-8 md:pl-16 z-10">
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-5xl md:text-7xl font-bold mb-6 text-navy-900 leading-tight"
                    >
                      {slide.text.split(" ").map((word, i) =>
                        slide.highlight.includes(word) ? (
                          <span key={i} className="text-purple-600">
                            {word}{" "}
                          </span>
                        ) : (
                          word + " "
                        )
                      )}
                    </motion.h2>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <Button
                        onClick={() => router.push(slide.link)}
                        variant="outline"
                        className="bg-white text-black border-2 border-black hover:bg-gray-300 hover:border-purple-700 transition duration-300 px-8 py-3 text-lg shadow-lg"
                      >
                        Shop Now
                        <ArrowRight className="h-6 w-6 ml-2 inline-block" />
                      </Button>
                    </motion.div>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1/2">
                    <motion.img
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      src={slide.image}
                      alt="Banner Image"
                      className="hidden md:block absolute right-0 top-3 h-full object-cover"
                    />
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Banner;
