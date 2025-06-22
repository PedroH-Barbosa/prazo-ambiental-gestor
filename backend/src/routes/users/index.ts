import { FastifyTypedInstance } from "../../../utils/types";
import { z } from "zod";
import { userSchema, createUserSchema } from "./schema";
import { listUsersHandler, createUserHandler } from "./controller";

export async function userRoutes(app: FastifyTypedInstance) {
  app.get(
    "/users",
    {
      schema: {
        response: {
          200: z.array(userSchema),
        },
        description: "List users",
        tags: ["users"],
      },
    },
    listUsersHandler
  );

  app.post(
    "/users",
    {
      schema: {
        body: createUserSchema,
        response: {
          201: z.null().describe("User created"),
        },
        description: "Create user",
        tags: ["users"],
      },
    },
    createUserHandler
  );
}
