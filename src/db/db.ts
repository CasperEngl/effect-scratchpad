import { PGlite } from "@electric-sql/pglite";
import "dotenv/config";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { migrate as migratePostgres } from "drizzle-orm/postgres-js/migrator";
import { reset, seed } from "drizzle-seed";
import { Context, Layer } from "effect";
import { mkdir } from "node:fs/promises";
import postgres from "postgres";
import { schema } from "./schema";

await mkdir("data", { recursive: true });

const testClient = new PGlite("data/db.test");

export const testDb = drizzlePglite({
	client: testClient,
	schema,
});

await migratePglite(testDb, {
	migrationsFolder: "./drizzle",
});

await reset(testDb, schema);
await seed(testDb, schema);

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

const liveClient = postgres(process.env.DATABASE_URL);

export const db = drizzlePostgres({
	client: liveClient,
	schema,
});

await migratePostgres(db, {
	migrationsFolder: "./drizzle",
});

const existingUsers = await db.query.users.findMany();
if (existingUsers.length === 0) {
	await seed(db, schema);
}

export class Database extends Context.Tag("Database")<
	Database,
	typeof db | typeof testDb
>() {
	static readonly Live = Layer.succeed(Database, db);
	static readonly Test = Layer.succeed(Database, testDb);
}
