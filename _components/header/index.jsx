"use client";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SubHeader from "./SubHeader";

// Custom hook for scroll effect
const useScrollEffect = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};

// Custom hook for active tab
const useActiveTab = (isMounted) => {
  const [activeTab, setActiveTab] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    if (isMounted) {
      if (pathname === "/") setActiveTab("home");
      else if (pathname === "/search") setActiveTab("search");
      else if (pathname === "/products") setActiveTab("products");
      else if (pathname === "/cart") setActiveTab("cart");
      else if (pathname === "/account") setActiveTab("user");
    }
  }, [isMounted, pathname]);

  return [activeTab, setActiveTab];
};

// SearchBar component
const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleKeyPress,
  isMobile,
}) => (
  <div className={`${isMobile ? "" : "hidden md:flex"} items-center space-x-6`}>
    <div className="relative group">
      <input
        type="text"
        placeholder="Search products..."
        className="border-2 border-gray-300 focus:border-blue-500 text-black bg-gray-100 rounded-full md:py-1 lg:py-2 pl-6 pr-12 md:w-80 lg:w-96 focus:w-96 focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-500 transition-colors duration-300"
        onClick={handleSearch}
      >
        <CiSearch size={24} />
      </button>
    </div>
  </div>
);

// MobileNavButton component
const MobileNavButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  onSearch,
}) => (
  <button onClick={onClick} className="focus:outline-none">
    <div className="flex flex-col items-center">
      <Icon
        size={24}
        className={isActive ? "text-blue-500" : "text-gray-600"}
        onClick={onSearch}
      />
      <span
        className={`text-xs mt-1 ${
          isActive ? "text-blue-500" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </div>
  </button>
);

// Main Header component
const Header = ({ navItems, isSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const isScrolled = useScrollEffect();
  const [activeTab, setActiveTab] = useActiveTab(isMounted);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() && isMounted) {
      console.log("Search for:", searchQuery);
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleTabClick = (tab) => {
    if (!isMounted) return;
    setActiveTab(tab);
    router.push(tab === "home" ? "/" : `/${tab}`);
  };

  if (!isMounted) return null;

  return (
    <div className="font-sans">
      <div
        className={`bg-white text-gray-800 shadow-lg fixed top-0 w-full z-50 transition-all duration-300 `}
      >
        <div
          className="container mx-auto flex justify-center
        md:justify-between items-center py-1 px-2"
        >
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/Bajaj-Logo.png"
              alt="logo"
              className="h-8 w-12 md:h-10 md:w-16"
            />
          </Link>
          {isSearch && (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              handleKeyPress={handleKeyPress}
              isMobile={false}
            />
          )}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <p className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                  {item.icon}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <SubHeader />
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          <MobileNavButton
            icon={FaHome}
            label="Home"
            isActive={activeTab === "home"}
            onClick={() => handleTabClick("home")}
          />
          <MobileNavButton
            icon={CiSearch}
            label="Search"
            isActive={activeTab === "search"}
            onClick={() => handleTabClick("search")}
            onSearch={handleSearch}
          />
          <MobileNavButton
            icon={BsBox}
            label="Product"
            isActive={activeTab === "products"}
            onClick={() => handleTabClick("products")}
          />
          <MobileNavButton
            icon={FaShoppingCart}
            label="Cart"
            isActive={activeTab === "cart"}
            onClick={() => handleTabClick("cart")}
          />
          <MobileNavButton
            icon={FaUser}
            label="User"
            isActive={activeTab === "user"}
            onClick={() => handleTabClick("account")}
          />
        </div>
      </div>

      {/* Mobile search bar (visible when search tab is active) */}
      {activeTab === "search" && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-50 p-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleKeyPress={handleKeyPress}
            isMobile={true}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
