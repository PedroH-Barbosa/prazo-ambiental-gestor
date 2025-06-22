import { FastifyReply, FastifyRequest } from "fastify";
import { getUsers } from "./service/getUsers";
import { createUser } from "./service/createUser";
import { createUserSchema } from "./schema";

export async function listUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const users = getUsers();
  
  reply.send(users);
}

export async function createUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, email } = createUserSchema.parse(request.body);

  createUser(name, email);

  reply.status(201).send(null);
}
