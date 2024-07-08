"use client";
import { FormError } from "@/components/auth/formError";
import { FormSuccess } from "@/components/auth/formSeccess";
import VerificationForm from "@/components/auth/verificationForm";
import VerificationLoading from "@/components/auth/verificationLoading";
import { checkAndverifiedToken } from "@/lib/action/token";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
// TODO: what you need to refact it
// 1- sending email to the form find another way like session

// how possible you get hacked if you use session
//1- sign in with vaild account
//2- verifies it
//3- enter new email
//4- change session
//5- he vaild this fake account
//solution
//1- Encrypt the email session and check if is you have this email
const Page = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useSearchParams();
  const token = params.get("token") as string;

  useEffect(() => {
    if (!token) {
      setError("Missing token!");
      setLoading(false);
      return;
    }
    if (success || error) return;

    checkAndverifiedToken(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(undefined);
        } else {
          setSuccess(data.success);
          setError(undefined);
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, success, error]);

  if (loading) {
    return (
      <Suspense>
        <VerificationLoading />
      </Suspense>
    );
  }

  return (
    <div>
      {error && <FormError message={error} />}
      {success && <VerificationForm token={token} />}
    </div>
  );
};

export default Page;
