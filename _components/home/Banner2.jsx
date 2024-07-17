import { Button } from "@/components/ui/button";
import React from "react";

const Banner2 = () => {
  return (
    <div>
      {" "}
      <section className="overflow-hidden bg-[url(https://static.vecteezy.com/system/resources/thumbnails/004/707/502/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg)] bg-cover bg-top bg-no-repeat">
        <div className="bg-black/40 p-8 md:p-12 lg:px-16 lg:py-28">
          <div className="text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Trending T-Shirt
            </h2>

            <div className="mt-4 sm:mt-8">
              <Button className="inline-block rounded-md bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700 hover:border">
                Shop now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner2;
