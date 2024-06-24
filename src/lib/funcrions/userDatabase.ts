import { db } from "../db";

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (e) {
    console.log(e);
    return;
  }
}

export async function getUserById(id: string) {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch (e) {
    console.log(e);
    return;
  }
}
