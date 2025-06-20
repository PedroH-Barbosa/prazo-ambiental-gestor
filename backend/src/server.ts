import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Ambiental Deadline Docs Management",
      version: "1.0.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.get("/", async (request, reply) => {
  return { message: "Hello from Fastify + TypeScript!" };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("HTTP server running");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
