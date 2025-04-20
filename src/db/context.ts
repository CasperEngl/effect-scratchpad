import { Context, Data, Layer } from "effect";
import { db, testDb } from "~/db/client";

export class Database extends Context.Tag("Database")<
	Database,
	typeof db | typeof testDb
>() {
	static readonly Live = Layer.succeed(Database, db);
	static readonly Test = Layer.succeed(Database, testDb);
}

export class DatabaseError extends Data.TaggedError("DatabaseError")<{
	message: string;
}> {}
