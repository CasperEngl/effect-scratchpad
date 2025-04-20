import { Effect, pipe } from "effect";
import { DatabaseLive } from "./db";
import { getUsers } from "./get-users";
import { TracingLive } from "./tracing";

const result = await pipe(
  getUsers,
  Effect.provide(DatabaseLive),
  Effect.provide(TracingLive),
  Effect.runPromise
);

console.log(result);
