import { PGlite } from "@electric-sql/pglite";
import "dotenv/config";
import { mkdir } from "node:fs/promises";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { reset, seed } from "drizzle-seed";
import { Context, Layer } from "effect";
import { schema } from "./schema";

await mkdir("data", { recursive: true });

const testClient = new PGlite("data/db.test");

export const testDb = drizzle({
	client: testClient,
	schema,
});

await migrate(testDb, {
	migrationsFolder: "./drizzle",
});

await reset(testDb, schema);
await seed(testDb, schema);

const liveClient = new PGlite("data/db.live");

export const db = drizzle({
	client: liveClient,
	schema,
});

await migrate(db, {
	migrationsFolder: "./drizzle",
});

const existingUsers = await db.query.users.findMany();
if (existingUsers.length === 0) {
	await seed(db, schema);
}

export class Database extends Context.Tag("Database")<Database, typeof db>() {
	static readonly Live = Layer.succeed(Database, db);
	static readonly Test = Layer.succeed(Database, testDb);
}
