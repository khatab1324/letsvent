import { updateUserInfo } from "@/lib/action/updateUserInfo";
import { changePasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const ChangingPasswordForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPannding, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });
  const onSubmit: SubmitHandler<z.infer<typeof changePasswordSchema>> = (
    data
  ) => {
    startTransition(() => {
      const updateUser = updateUserInfo({
        password: data.password,
        newPassword: data.newPassword,
      });
    });
  };
  return (
    <div className="w-full h-16 mt-9 relative flex flex-shrink-0">
      <button
        className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-600 focus:bg-slate-500 transition-colors duration-200"
        onClick={() => {
          setIsOpen((prevState) => !prevState);
        }}
      >
        change password
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-200"
            onClick={() => {
              setIsOpen((preState) => !preState);
            }}
          ></div>
          <div className="relative bg-zinc-900 p-8 rounded-lg shadow-2xl z-10 text-black w-full max-w-lg mx-4 sm:mx-auto">
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full p-4">
                <div>
                  {" "}
                  <label className="block mb-2 font-medium text-white">
                    current password
                  </label>
                  <input
                    type="password"
                    className="w-full h-10 border-b-4 bg-zinc-900 text-white border-gray-300 focus:outline-none focus:border-blue-500 transition-shadow duration-200"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-[0.8rem] font-medium text-destructive mb-3">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="mt-8">
                  {" "}
                  <label className="block mb-2 font-medium text-white">
                    new password
                  </label>
                  <input
                    type="password"
                    className="w-full h-10 border-b-4 bg-zinc-900 text-white border-gray-300 focus:outline-none focus:border-blue-500 transition-shadow duration-200"
                    {...register("newPassword")}
                  />{" "}
                  {errors.newPassword && (
                    <p className="text-[0.8rem] font-medium text-destructive mb-3">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
              </div>
              <button
                disabled={isPannding}
                type="submit"
                className=" px-4 py-2 mt-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-800 transition-colors duration-200"
              >
                change password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
