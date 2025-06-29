import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { userRoutes } from "@/infra/http/UserController";

export function buildApp() {
  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Plugins -----------------------------------
  // Cors configuration
  app.register(fastifyCors, { origin: "*" });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Deadline Docs Management",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
  // -----------------------------------

  // Routes -----------------------------------
  app.register(userRoutes);

  // In your buildApp function, add this before returning the app
  app.setErrorHandler((error, request, reply) => {
    console.error("Error:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  });

  return app;
}
