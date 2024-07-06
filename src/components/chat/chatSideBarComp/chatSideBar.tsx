import { FriendsList } from "./friendsList";
import { NavbarForSideBarSection } from "./navbarForSideBarSection";
import { SearchForFriendForm } from "./searchForFriendForm";
import { Storys } from "./storys";

export default function ChatSideBar() {
  return (
    <section className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
      <NavbarForSideBarSection />
      <SearchForFriendForm />
      <Storys />
      <FriendsList />
    </section>
  );
}
