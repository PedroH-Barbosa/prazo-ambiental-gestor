### Project Architeture (21.6.2025)

fastify-api/
├── src/
│   ├── app.ts                    # Fastify app instance setup
│   ├── server.ts                 # Entry point for starting the server
│   ├── config/                   # Configuration files (e.g., env.ts)
│   ├── plugins/                  # Fastify plugins (e.g., db, cors, etc.)
│   ├── routes/                   # Route definitions
│   │   ├── users/                # Modular route (users)
│   │   │   ├── controller.ts     # Route handlers
│   │   │   ├── schema.ts         # Zod or JSON schemas
│   │   │   ├── service.ts        # Business logic
│   │   │   └── index.ts          # Route registration
│   ├── services/                 # Shared business logic (e.g., auth)
│   ├── models/                   # ORM models or interfaces
│   ├── utils/                    # Helper functions
│   └── types/                    # Global TypeScript types
├── test/                         # Unit and integration tests
├── .env                          # Environment variables
├── tsconfig.json
├── package.json
└── README.md
