"use client";
import React, { useState, useRef } from "react";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = ({ title, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollRef = useRef(null);

  const trendyProducts = products.slice(0, 2);
  const newArrivals = products.slice(1, 3);
  const bestSellers = products.slice(2, 4);

  const router = useRouter();
  const handleProductClick = (productId) => {
    const product = products.find((p) => p.id === productId);
    router.push(`/products/${productId}`);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleViewAll = () => {
    router.push("/products");
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const getProductsToDisplay = () => {
    switch (activeCategory) {
      case "trendy":
        return trendyProducts;
      case "newArrivals":
        return newArrivals;
      case "bestSellers":
        return bestSellers;
      default:
        return products;
    }
  };

  const renderProductCards = () => {
    const productsToDisplay = getProductsToDisplay();
    return productsToDisplay.map((product) => (
      <motion.div
        key={product.id}
        layout
        variants={itemVariants}
        whileHover={{
          y: -5,
          boxShadow:
            "0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 5px 5px -5px rgba(0, 0, 0, 0.04)",
        }}
        className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 bg-white transform hover:scale-102 flex-shrink-0 w-40 md:w-52 mr-4"
      >
        <motion.div
          className="aspect-w-1 aspect-h-1 w-full overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-48 w-full object-cover object-center cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          />
        </motion.div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-base font-bold text-indigo-600">{product.price}</p>
        </div>
      </motion.div>
    ));
  };

  const CategoryButton = ({ category, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleCategoryClick(category)}
      className={`px-3 py-2 font-semibold text-sm transition-colors duration-300 ${
        activeCategory === category
          ? "bg-white text-black border border-black shadow-md hover:shadow-lg"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {label}
    </motion.button>
  );

  return (
    <div className="min-h-screen" data-aos="fade-up">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h1>
          {title === "All Products" && (
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              <CategoryButton category="all" label="All Products" />
              <CategoryButton category="trendy" label="Trendy" />
              <CategoryButton category="newArrivals" label="New Arrivals" />
              <CategoryButton category="bestSellers" label="Best Sellers" />
            </motion.div>
          )}
        </motion.div>

        <div className="relative">
          <div className="flex justify-end mb-4">
            <Button
              onClick={handleViewAll}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              View All
            </Button>
          </div>
          <div className="overflow-hidden">
            <motion.div
              ref={scrollRef}
              layout
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {renderProductCards()}
            </motion.div>
          </div>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
