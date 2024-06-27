"use client";
import { useForm, SubmitHandler } from "react-hook-form"; // Add this line
import { verificationSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { signin } from "@/lib/action/signin";
import { useState, useTransition } from "react";
import { FormError } from "./formError";
import { FormSuccess } from "./formSeccess";
import { useSearchParams } from "next/navigation";
import { verificationUserAfterSignin } from "@/lib/action/verificationUserAfterSignin";
// TODO : the email should come from session change this
export default function VerificationForm({ token }: { token: string }) {
  const [isPannding, startTransition] = useTransition();
  const [email, setTemp] = useState("");
  const [password, setTemp1] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof verificationSchema>> = async (
    data
  ) => {
    startTransition(() => {
      //oooooh my shit code
      verificationUserAfterSignin(
        token,
        data.username,
        data.confirmPassword
      ).then((data) => {
        if (data?.email) setTemp(data.email);
        if (data?.password) setTemp1(data.password);
      });
      const sendingObjectToSignIn = { email, password };
      signin(sendingObjectToSignIn).then((data) => {
        if (data.error) return data.error;
        if (data.success) return data.success;
      });
    });
  };
  const searchPath = useSearchParams();
  const urlError =
    searchPath.get("error") === "OAuthAccountNotLinked"
      ? "sorry but this email is uesed with other social ^_^"
      : "";
  return (
    // TODO: refact this by using spreted file
    <div className="flex flex-col w-full h-full p-6 text-center  rounded-xl bg-gradient-to-b from-slate-300 to-slate-300  ">
      <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900 ">
        continue sign in
      </h3>
      <p className="mb-4 text-grey-700"></p>

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  h-full  text-center  "
      >
        <div className="flex items-center mb-3 mt-4">
          <hr className=" border-grey-900 grow" />
        </div>
        <label
          htmlFor="username"
          className={clsx("mb-2 text-sm text-start text-grey-900 ", {
            "text-red-600 ": errors.username,
          })}
        >
          username
        </label>
        <input
          disabled={isPannding}
          id="username"
          placeholder="username"
          className="flex items-center w-full px-5 py-3 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-2 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.username.message}
          </p>
        )}
        <label
          htmlFor="confirmPassword"
          className={clsx("mb-2 text-sm text-start text-grey-900 ", {
            // "text-red-600 ": errors.confirmPassword,
          })}
        >
          confirm Password
        </label>
        <input
          disabled={isPannding}
          id="confirmPassword"
          type="confirmPassword"
          placeholder="Enter a password"
          className="flex items-center w-full px-5 py-3 mb-1 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.confirmPassword.message}
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
          verifies your email
        </button>
      </form>
    </div>
  );
}
