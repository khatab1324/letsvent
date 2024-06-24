"use client";
import { signup } from "@/lib/action/signup";
import { signupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { FormError } from "./formError";
import { FormSuccess } from "./formSeccess";
import { SocialAuth } from "./social";

export default function SignupForm() {
  const [isPannding, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });
  const handleOnSubmit: SubmitHandler<z.infer<typeof signupSchema>> = async (
    data
  ) => {
    startTransition(() => {
      signup(data).then((data) => {
        if (data.success) {
          setSuccess(data.success);
          setError("");
        }
        if (data.error) {
          setError(data.error);
          setSuccess("");
        }
      });
    });
  };

  return (
    <div className="flex flex-col w-full h-full p-6 text-center  rounded-xl bg-gradient-to-b from-slate-300 to-slate-300  ">
      <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900 ">
        Sign Up
      </h3>
      <p className="mb-4 text-grey-700">wellcom to our application</p>
      <SocialAuth />
      <div className="flex items-center mb-3 mt-4">
        <hr className=" border-grey-900 grow" />
      </div>
      <form
        method="post"
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col w-full h-full  "
      >
        <label
          htmlFor="email"
          className={clsx("mb-2 text-sm text-start text-grey-900", {
            "text-red-500": errors.email,
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
          <p className="text-[0.8rem] font-medium text-destructive mb-3">
            {errors.email.message}
          </p>
        )}
        <label
          htmlFor="password"
          className={clsx("mb-2 text-sm text-start text-grey-900", {
            "text-red-500": errors.password,
          })}
        >
          Password
        </label>
        <input
          disabled={isPannding}
          id="password"
          type="password"
          placeholder="Enter a password"
          className="flex items-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-[0.8rem] font-medium text-destructive mb-5">
            {errors.password.message}
          </p>
        )}
        <label
          htmlFor="password"
          className={clsx("mb-2 text-sm text-start text-grey-900", {
            "text-red-500": errors.confirmPassword,
          })}
        >
          confirm Password
        </label>
        <input
          disabled={isPannding}
          id="password"
          type="password"
          placeholder="rewrite the passwrod"
          className="flex items-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-[0.8rem] font-medium text-destructive mb-2">
            {errors.confirmPassword.message}
          </p>
        )}
        <div>
          <FormError message={error} />
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
          href={"/signin"}
          className="text-sm leading-relaxed text-grey-900"
        >
          Already have account?
        </Link>
      </form>
    </div>
  );
}
