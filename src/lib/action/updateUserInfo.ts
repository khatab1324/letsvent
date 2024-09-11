"use server";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";
import { UserUpdateInfo } from "../types";
import { updateUserInfoFromDatabase } from "./interactWithDatabase/updateUser";

export async function updateUserInfo(dataInfo: UserUpdateInfo) {
  try {
    const updateUser = await updateUserInfoFromDatabase(dataInfo);
    return updateUser;
  } catch (error) {
    console.error(error);
  }
}
