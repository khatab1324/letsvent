import { defaultSigninRedirect } from "@/lib/routes";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const SocialAuth: React.FC = () => {
  const handleAuthClick = async (providerName: "google" | "github") => {
    await signIn(providerName, { callbackUrl: defaultSigninRedirect });
    //callbackUrl is when the login happen successfuly it will redirect the user where we want
  };
  return (
    <div className=" flex justify-between">
      <button
        className=" flex justify-center w-44 h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow md:w-44  "
        onClick={() => handleAuthClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </button>
      <button
        className=" flex justify-center w-44 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow lg:w-44 md:w-44"
        onClick={() => handleAuthClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </button>
    </div>
  );
};
