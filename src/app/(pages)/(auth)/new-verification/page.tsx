"use client";
import { FormError } from "@/components/auth/formError";
import { FormSuccess } from "@/components/auth/formSeccess";
import VerificationLoading from "@/components/auth/verificationLoading";
import { checkAndverifiedToken } from "@/lib/token";
import { redirect, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [error, setError] = useState<string | undefined>("");
  const params = useSearchParams();
  const token = params.get("token") as string;

  const verificationToken = checkAndverifiedToken(token);
  verificationToken.then((data) => {
    setError(data.error);
  });

  if (!error) {
  }
  return (
    <div>
      <VerificationLoading />
      {error && <FormError message={error} />}
      {!error && <FormSuccess message="it work" />}
    </div>
  );
};

export default Page;
