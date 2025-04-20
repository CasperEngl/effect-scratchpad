import { PGlite } from "@electric-sql/pglite";
import "dotenv/config";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { reset, seed } from "drizzle-seed";
import { Effect, Layer, pipe } from "effect";
import { mkdir } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { Database } from "./context";
import { getUsers } from "./get-users";
import { schema } from "./schema";
import { TracingTest } from "./tracing";

await mkdir("data", { recursive: true });

const client = new PGlite("data/db.test");

export const dbTest = drizzle({
  client,
  schema,
});

await migrate(dbTest, {
  migrationsFolder: "./drizzle",
});

await reset(dbTest, schema);
await seed(dbTest, schema);

export const DatabaseTest = Layer.succeed(Database, dbTest);

describe("Database", () => {
  it("should have 10 users seeded", async () => {
    const users = await pipe(
      getUsers,
      Effect.provide(DatabaseTest),
      Effect.provide(TracingTest),
      Effect.runPromise
    );
    expect(users[0]?.name).toBe("Melanny");
    expect(users).toHaveLength(10);
  });
});
