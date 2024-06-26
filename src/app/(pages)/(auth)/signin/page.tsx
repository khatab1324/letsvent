import SigninForm from "@/components/auth/signinForm";
import { PrismaClient } from "@prisma/client";

export default async function SignIn() {
  return <SigninForm />;
}
