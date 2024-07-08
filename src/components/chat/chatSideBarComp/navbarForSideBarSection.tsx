import React from "react";
import { RiUserAddFill } from "react-icons/ri";
import { AddFriend } from "./addFriend";
export const NavbarForSideBarSection = () => {
  return (
    <div className="header p-4 flex flex-row justify-between items-center flex-none">
      <div
        className="w-16 h-16 relative flex flex-shrink-0"
        // style={"filter: invert(100%)"}
      >
        <img
          className="rounded-full w-full h-full object-cover"
          alt="ravisankarchinnam"
          src="https://avatars3.githubusercontent.com/u/22351907?s=60"
        />
      </div>
      <p className="text-md font-bold hidden md:block group-hover:block">
        Messenger
      </p>
      <AddFriend />
    </div>
  );
};
