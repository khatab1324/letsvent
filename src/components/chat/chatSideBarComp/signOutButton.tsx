import { signOut } from "next-auth/react";
import React from "react";
import { IoIosLogOut } from "react-icons/io";

export const SignOutButton = () => {
  return (
    <button
      className="mt-5 block rounded-full hover:bg-gray-700 bg-gray-500 w-10 h-10 p-3 md:block group-hover:block"
      onClick={() => signOut()}
    >
      <IoIosLogOut />
    </button>
  );
};
