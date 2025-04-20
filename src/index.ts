import { Effect, pipe } from "effect";
import { Database } from "./db/db";
import { getUsers } from "./db/get-users";
import { TracingLive } from "./tracing";

const result = await pipe(
	getUsers,
	Effect.provide(Database.Live),
	Effect.provide(TracingLive),
	Effect.runPromise,
);

console.log(result);
