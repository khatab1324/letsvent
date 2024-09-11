"use server";
import { db } from "../db";
import { getVerificationTokenByToken } from "../funcrions/verificationTokenDatabase";
import { signin } from "./signin";
//TODO: use server-only
export async function verificationUserAfterSignin(
  token: string,
  username: string,
  password: string
) {
  console.log("====================================");
  console.log("token", token);
  console.log("====================================");
  let email: string | undefined;
  await getVerificationTokenByToken(token).then((data) => {
    email = data?.email;
  });
  if (!email) return;
  console.log("====================================");
  console.log("emial", email);
  console.log("====================================");

  //   update the email
  await db.user.update({
    where: { email },
    data: {
      emailVerified: new Date(),
      name: username,
    },
  });
  // delete token
  const deleteVerificationToken = await db.verificationToken.delete({
    where: { token },
  });
  let sendingObjectToSignIn = {
    email,
    password,
  };
  return sendingObjectToSignIn;
}
