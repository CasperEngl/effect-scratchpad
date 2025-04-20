import { mkdir } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { migrate as migratePostgres } from "drizzle-orm/postgres-js/migrator";
import { reset, seed } from "drizzle-seed";
import postgres from "postgres";
import { schema } from "~/db/schema";
import { config } from "dotenv";

config({ path: ".env.local" });

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

// biome-ignore lint/style/noNonNullAssertion: Whatever
const liveClient = postgres(process.env.DATABASE_URL!);

export const db = drizzlePostgres({
	client: liveClient,
	schema,
});

const existingUsers = await db.query.users.findMany();
if (existingUsers.length === 0) {
	await migratePostgres(db, {
		migrationsFolder: "./drizzle",
	});
	await seed(db, schema);
}
