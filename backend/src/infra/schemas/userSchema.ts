import { z } from "zod";

export const userSchema = z.object({
  // id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
