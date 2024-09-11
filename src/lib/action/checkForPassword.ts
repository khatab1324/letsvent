import "server-only";

import { changePasswordSchema } from "@/schemas";

import { z } from "zod";
export async function checkForPassword(
  data: z.infer<typeof changePasswordSchema>
) {
  const validatedFields = changePasswordSchema.safeParse(data);
  if (!validatedFields.success)
    return { error: "see we have server validation ^_^" };
  const { password, newPassword } = validatedFields.data;
}
