import React from "react";
import { RiUserAddFill } from "react-icons/ri";
import { AddFriend } from "./addFriend";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "@/auth";
import { SignOutButton } from "./signOutButton";
import { Account } from "./account";
import { AddGroup } from "./addGroup";

export const NavbarForSideBarSection = () => {
  return (
    <div className="header p-4 flex flex-row justify-between items-center flex-none">
      <Account />
      <p className="text-md font-bold hidden md:block group-hover:block">
        Messenger
      </p>
      <div className="flex flex-row justify-between w-1/4">
        <AddFriend />
        <AddGroup />
      </div>
    </div>
  );
};
