import { FastifyTypedInstance } from "./types";
import z from "zod";

export async function routes(app: FastifyTypedInstance) {
  app.get("/users", () => {
    return [];
  });

  app.post("users", () => {
    schema: {
      tags: ["users"];
      desciption: "create a new user";
      body: z.object({
        name: z.string(),
      });
    }
  });

  return {};
}
