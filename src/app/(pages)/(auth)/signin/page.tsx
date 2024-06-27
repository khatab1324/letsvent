import SigninForm from "@/components/auth/signinForm";
import { Suspense } from "react";

const SignIn = () => {
  return (
    <Suspense>
      <SigninForm />
    </Suspense>
  );
};

export default SignIn;
