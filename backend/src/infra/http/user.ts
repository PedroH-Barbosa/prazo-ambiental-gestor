// import { z } from "zod";
// import { FastifyTypedInstance } from "../../../utils/FastifyTypedInstance";
// import { createUserHandler, listUsersHandler } from "./controller";
// import { createUserSchema, userSchema } from "../../schemas/users/schema";

// export async function userRoutes(app: FastifyTypedInstance) {
//   app.get(
//     "/users",
//     {
//       schema: {
//         response: {
//           200: z.array(userSchema),
//         },
//         description: "List users",
//         tags: ["users"],
//       },
//     },
//     listUsersHandler
//   );

//   app.post(
//     "/users",
//     {
//       schema: {
//         body: createUserSchema,
//         response: {
//           201: z.object({
//             message: z.literal("User created"),
//           }),
//         },
//         description: "Create user",
//         tags: ["users"],
//       },
//     },
//     createUserHandler
//   );
// }
