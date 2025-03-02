import { z } from "zod";

const signUpSchema = z.object({
    firstName: z.string().min(1, {message: "First name is required"}),
    lastName: z.string().min(1, {message: "Last name is required"}),
    email: 
            z.string()
            .min(1, {message: "Email address is required"})
            .email(),
    password: 
              z.string()
              .min(8, {message: "Password must be at least 8 chars"})
              .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {message: "Password must have special chars"}),
    confirmPassword: z.string().min(1, {message: "Password must confirmed"})
  }).refine(
      inputs => inputs.confirmPassword === inputs.password,
      {
        message: "Password and Confirm Password didn't match",
        path: ["confirmPassword"]
      },
    );

type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };