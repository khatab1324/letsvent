import * as z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*\d)(?=.*[a-zA-Z])([^'"\s_< >\?!&^|:;{}\[\]])+$/
);

export const signinSchema = z.object({
  email: z
    .string({ invalid_type_error: "it should be strings" })
    .min(1, { message: "email is requierd" })
    .email({ message: "invalide email" }),
  password: z.string().min(1, { message: "password is requierd" }),
});

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).regex(passwordValidation, {
      message: "you should have 1 char or 1 number and without special char",
    }),
    confirmPassword: z.string(),
    //TODO add schema that check if the confirmPasswor = password
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password does't match",
    path: ["confirmPassword"],
  });

export const verificationSchema = z.object({
  username: z
    .string()
    .min(4)
    .regex(/^(?!.*\s)(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z]).*$/, {
      message: "should have at least 3 char and not space",
    }),
  confirmPassword: z.string(),
});
