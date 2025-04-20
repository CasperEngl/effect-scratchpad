import { PGlite } from "@electric-sql/pglite";
import "dotenv/config";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { seed } from "drizzle-seed";
import { Layer } from "effect";
import { mkdir } from "node:fs/promises";
import { Database } from "./context";
import { schema } from "./schema";

await mkdir("data", { recursive: true });

const client = new PGlite("data/db.live");

export const db = drizzle({
  client,
  schema,
});

await migrate(db, {
  migrationsFolder: "./drizzle",
});

const existingUsers = await db.query.users.findMany();
if (existingUsers.length === 0) {
  await seed(db, schema);
}

export const DatabaseLive = Layer.succeed(Database, db);
