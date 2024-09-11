import "server-only";

import { db } from "@/lib/db";
import { getUserFromSession } from "@/lib/funcrions/getUserFromSession";
import { UserUpdateInfo } from "@/lib/types";

export async function updateUserInfoFromDatabase(dataInfo: UserUpdateInfo) {
  //here the logic
  //the dev pass the dataInfo like name or email like this
  //now i make objec of these things that pass like if the dataInfo have name i make object have {name:value}
  //after that i pass the updateField object that have the value to the query in data
  //and it will be update the user

  const updateField: UserUpdateInfo = {};
  for (const [key, value] of Object.entries(dataInfo)) {
    if (value) {
      //if the password don't add dircet to the updateField direct no we should check if its correct
      if (key === "password") {
       
        return;
      }
      updateField[key as keyof UserUpdateInfo] = value;
    }
  }

  const currentUser = await getUserFromSession();
  if (currentUser)
    if (currentUser.name) {
      const update = await db.user.update({
        where: { id: currentUser.id },
        data: updateField,
      });
      return update;
    }
}
