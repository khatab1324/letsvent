import { useContext } from "react";
import { FriendsList } from "./friendsList";
import { NavbarForSideBarSection } from "./navbarForSideBarSection";
import { SearchForFriendForm } from "./searchForFriendForm";
import { Storys } from "./storys";
import { chatInfoContext } from "@/app/(pages)/chats/page";
export default function ChatSideBar() {
  return (
    <section className="flex flex-col flex-none overflow-auto w-24  group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
      <NavbarForSideBarSection />
      <SearchForFriendForm />
      <Storys />
      <hr />
      <FriendsList />
    </section>
  );
}
