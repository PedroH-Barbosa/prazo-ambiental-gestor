import { randomUUID } from "crypto";
import z from "zod";
import { FastifyTypedInstance } from "../utils/types";

interface User {
  name: string;
  id: string;
  email: string;
}

const users: User[] = [];

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/users",
    {
      schema: {
        response: {
          200: z.array(
            z.object({ id: z.string(), name: z.string(), email: z.string() })
          ),
        },
        description: "List users",
        tags: ["users"],
      },
    },
    () => {
      return users;
    }
  );

  app.post(
    "/users",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.null().describe("User created"),
        },
        description: "Create user",
        tags: ["users"],
      },
    },

    (request, reply) => {
      const { name, email } = request.body as User;

      users.push({ id: randomUUID(), email: email, name });

      reply.status(201).send(null);
    }
  );
}
