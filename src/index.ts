import { Effect, pipe } from "effect";
import { Database } from "~/db/context";
import { getUsers } from "~/db/get-users";
import { Tracing } from "~/tracing";

const result = await pipe(
	getUsers,
	Effect.provide(Database.Live),
	Effect.provide(Tracing.Live),
	Effect.runPromise,
);

console.log(result);
