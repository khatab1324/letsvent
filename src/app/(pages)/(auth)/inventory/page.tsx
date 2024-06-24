import { auth, signOut } from "@/auth";
import { SideBar } from "@/components/sideBar";
import { db } from "@/lib/db";

export default async function SettingPage() {
  const session = await auth();
  // const {user}=session
  console.log("====================================");
  // console.log(user);
  console.log("====================================");
  const category = await db.category.findMany();
  return (
    <main>
      <div><SideBar categorys={{ id: "12" }} /></div>
    </main>
  );
}
