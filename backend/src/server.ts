import { buildApp } from "./app";

const app = buildApp();

app.listen({ port: 3000 }).then(() => {
  console.log(`🚀 Server ready at http://localhost:3000`);
  console.log(`📚 Swagger docs at http://localhost:3000/docs`);
});
