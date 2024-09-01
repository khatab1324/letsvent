import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { FriendsList } from "./friendsList";
import { NavbarForSideBarSection } from "./navbarForSideBarSection";
import { SearchForFriendForm } from "./searchForFriendForm";
import { Storys } from "./storys";
import { chatInfoContext } from "@/app/(pages)/chats/page";
export default function ChatSideBar() {
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  useEffect(() => {
    // setIsLoading((prevState) => !prevState);
  }, [isLoading]);
  // const GetChats = lazy(() =>
  //   import("./friendsList").then((mod) => ({
  //     default: mod.FriendsList,
  //   }))
  // );

  return (
    <section className="flex flex-col flex-none overflow-auto w-24  group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
      <NavbarForSideBarSection />
      <SearchForFriendForm />
      <Storys />
      <hr />
      {/* {isLoading && <p>loading</p>} */}
      {/* <FriendsList setIsLoading={setIsLoading} /> */}
      {/* <Suspense fallback={<p>loading</p>}>
        <GetChats />
      </Suspense> */}
      <FriendsList />
    </section>
  );
}
