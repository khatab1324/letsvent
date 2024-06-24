"use client";
import { signIn } from "@/auth";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form"; // Add this line
import ReactDOM from "react-dom";
import { signinSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import clsx from "clsx";
import { signin } from "@/lib/action/signin";
import { useState, useTransition } from "react";
import { FormError } from "./formError";
import { FormSuccess } from "./formSeccess";
import { SocialAuth } from "./social";
import { useSearchParams } from "next/navigation";

export default function SigninForm() {
  const [isPannding, startTransition] = useTransition();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof signinSchema>> = async (
    data
  ) => {
    //i need to use server there for i will use signin.ts
    startTransition(() => {
      signin(data).then((data) => {
        console.log(data);
        data?.error && setError(data.error);
        data?.success && setSuccess(data.success);
      });
    });
  };
  const searchPath = useSearchParams();
  const urlError =
    searchPath.get("error") === "OAuthAccountNotLinked"
      ? "sorry but this email is uesed with other social ^_^"
      : "";
  return (
    <div className="flex flex-col w-full h-full p-6 text-center  rounded-xl bg-gradient-to-b from-slate-300 to-slate-300  ">
      <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900 ">
        Sign In
      </h3>
      <p className="mb-4 text-grey-700">Enter your email and password</p>
      <SocialAuth />
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  h-full  text-center  "
      >
        <div className="flex items-center mb-3 mt-4">
          <hr className=" border-grey-900 grow" />
        </div>
        <label
          htmlFor="email"
          className={clsx("mb-2 text-sm text-start text-grey-900 ", {
            "text-red-600 ": errors.email,
          })}
        >
          Email
        </label>
        <input
          disabled={isPannding}
          id="email"
          placeholder="mail@loopple.com"
          className="flex items-center w-full px-5 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.email.message}
          </p>
        )}
        <label
          htmlFor="password"
          className={clsx("mb-2 text-sm text-start text-grey-900 ", {
            "text-red-600 ": errors.password,
          })}
        >
          Password
        </label>
        <input
          disabled={isPannding}
          id="password"
          type="password"
          placeholder="Enter a password"
          className="flex items-center w-full px-5 py-3 mb-1 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.password.message}
          </p>
        )}
        <div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
        </div>
        <div className="flex flex-row justify-between mb-8"></div>
        <button
          disabled={isPannding}
          className={clsx(
            "bg-black w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white md:w-96 rounded-md transition duration-300 hover:bg-slate-800 focus:ring-4 focus:ring-blue-100",
            { "bg-slate-500 hover:bg-slate-500": isPannding }
          )}
        >
          Sign In
        </button>
        <Link
          href={"/signup"}
          className="text-sm leading-relaxed text-grey-900"
        >
          Not registered yet?
        </Link>
      </form>
    </div>
  );
}
