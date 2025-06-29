import { CreateUser } from "@/app/use-cases/user/createUser";
import { GetUsers } from "@/app/use-cases/user/getUsers";
import { InMemoryUserRepository } from "@/infra/db/InMemoryUserRepository";
import { userSchema } from "@/infra/schemas/userSchema";
import { FastifyTypedInstance } from "utils/FastifyTypedInstance";
import { z } from "zod";

export async function userRoutes(app: FastifyTypedInstance) {
  const userDB = new InMemoryUserRepository(); // DB setup to be implemented on functions.
  const createUser = new CreateUser(userDB);
  const getUsers = new GetUsers(userDB);

  app.get(
    "/user",
    {
      schema: {
        response: {
          200: z.array(userSchema),
        },
        description: "List Users",
        tags: ["users"],
      },
    },
    async () => {
      return await getUsers.execute();
    }
  );

  app.post(
    "/user",
    {
      schema: {
        body: userSchema,
        response: {
          201: z.object({
            message: z.literal("User created"),
          }),
        },
        description: "Create user",
        tags: ["users"],
      },
    },

    async (request, reply) => {
      const body = userSchema.parse(request.body);
      await createUser.execute(body);
    }
  );
}
