import SigninForm from "@/components/auth/signinForm";
import { PrismaClient } from "@prisma/client";

export default async function SignIn() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-400 to-gray-800 h-screen ">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable ">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10 ">
            <SigninForm />
          </div>
        </div>
      </div>
    </div>
  );
}
