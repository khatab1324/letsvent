"use client";
import { CategroyField } from "@/lib/definitions";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdInventory2 } from "react-icons/md";

export const SideBar = ({ categorys }: { categorys: CategroyField }) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };
  return (
    <div>
      {" "}
      <button
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>{" "}
      <aside
        className={clsx("fixed top-0  h-screen w-64  transition-transform  ", {
          "max-sm:-translate-x-full ": !isOpenSideBar,
          " translate-x-0": isOpenSideBar,
        })}
      >
        <p className="w-full h-10 bg-slate-500 flex justify-center items-center">
          <Link href={"/inventory"}>inventory</Link>
        </p>
        <div className=" w-full h-full bg-slate-400 px-3 py-4">
          <ul className="space-y-2 font-medium">
            <span
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex justify-between hover:bg-slate-500 rounded-md p-1 "
            >
              <span className="flex text-base">
                <MdInventory2 className="mr-2 mt-1" /> Category
              </span>{" "}
              <IoIosArrowDown className="mt-1" />
            </span>
            <ul
              className={clsx("py-2 space-y-2", {
                hidden: !isCategoryOpen,
              })}
            >
              <li>item1</li>
              <li>item2</li>
              <li>item3</li>
            </ul>
            <li className="flex justify-between hover:bg-slate-500 rounded-md p-1">
              <Link href={"/customers"}>Customers</Link>
            </li>
            <li className="flex justify-between hover:bg-slate-500 rounded-md p-1">
              <Link href={"/selles"}>Selles</Link>
            </li>
            <hr />
            <li className="flex justify-between hover:bg-slate-700 rounded-md p-1">
              <Link href={"/"}>SignOut</Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
