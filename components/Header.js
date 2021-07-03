import React from "react";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center">
          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-myonelight lg:items-center lg:justify-center mb-4 md:mb-0">
            <span className="ml-3 text-xl">NextDeals</span>
          </a>
        </div>
      </header>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-col text-center w-full">
            <h2 className="text-xs text-myonelight2 tracking-widest font-medium title-font mb-1">
              Best game prices across 32 stores
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-myonelighter">
            Powered with NextJS and CheapSharkApi
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
