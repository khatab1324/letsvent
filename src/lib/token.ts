import { v4 as uuid4 } from "uuid";
import { getVerificationTokenByEmail } from "./funcrions/verificationTokenDatabase";
import { db } from "./db";
export async function createVerificationToken(email: string) {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //new Date(1719254413974) this will give us   Mon Jun 24 2024 21:40:13 GMT+0300 (GMT+03:00) {}
  const verificationToken = db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
}
