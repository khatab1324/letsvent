"use server";
import { auth, signOut } from "@/auth";
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

export async function getUserByName(name: string) {
  try {
    // TODO change in the schema and make the name is uniqe
    return db.user.findFirst({ where: { name } });
  } catch (e) {
    console.log(e);
    return;
  }
}

