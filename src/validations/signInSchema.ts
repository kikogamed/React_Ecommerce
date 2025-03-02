import { z } from "zod";

const signInSchema = z.object({
    email: z.string().min(1, {message: "Email Required"}).email(),
    password: z.string().min(1, {message: "Password Required"})
});

type signInType = z.infer<typeof signInSchema>

export { signInSchema, type signInType };