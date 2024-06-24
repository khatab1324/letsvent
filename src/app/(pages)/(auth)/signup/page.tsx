import SignupForm from "@/components/auth/signupFrom";

export default function Signup() {
  return (
    <div className="flex flex-col bg-slate-800 h-screen ">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable ">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
