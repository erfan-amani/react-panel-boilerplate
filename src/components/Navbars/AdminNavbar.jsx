import React from "react";

import UserDropdown from "@/components/Dropdowns/UserDropdown";

export default function Navbar() {
  return (
    <>
      <nav className="flex flex-col w-full z-10 bg-transparent md:flex-nowrap md:bg-lightBlue-600">
        <div className="p-4 hidden md:inline-block">
          <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap">
            <a
              className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              Dashboard
            </a>

            <ul className="flex-col md:flex-row list-none items-center hidden md:flex ml-auto">
              <UserDropdown />
            </ul>
          </div>
        </div>

        <div id="breadcrumbs"></div>
      </nav>
    </>
  );
}
