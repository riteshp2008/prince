import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const CategoryDropdown = ({ category, subCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubCategoryClick = (subCategory) => {
    const href = `/${category.toLowerCase().replace(" ", "-")}/${subCategory
      .toLowerCase()
      .replace(" ", "-")}`;
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {category}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {subCategories.map((subCategory, index) => (
            <button
              key={index}
              onClick={() => handleSubCategoryClick(subCategory)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
            >
              {subCategory}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SubHeader = () => {
  const categories = [
    {
      name: "New Arrivals",
      subCategories: ["This Week", "This Month", "Last 30 Days"],
    },
    {
      name: "Best Sellers",
      subCategories: ["Electronics", "Fashion", "Home & Kitchen"],
    },
    {
      name: "Deals",
      subCategories: ["Daily Deals", "Clearance", "Bundle Offers"],
    },
    {
      name: "Clearance",
      subCategories: ["Up to 50% Off", "Last Chance", "Overstock"],
    },
    {
      name: "Category",
      subCategories: ["Electronics", "Fashion", "Home", "Beauty", "Sports"],
    },
    {
      name: "Track Order",
      subCategories: ["By Order ID", "By Email", "By Phone Number"],
    },
  ];

  return (
    <div className="hidden md:flex justify-center items-center space-x-4 bg-blue-500 py-2 px-4">
      {categories.map((category) => (
        <CategoryDropdown
          key={category.name}
          category={category.name}
          subCategories={category.subCategories}
        />
      ))}
    </div>
  );
};

export default SubHeader;
