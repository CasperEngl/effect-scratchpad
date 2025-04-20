import { Effect, pipe } from "effect";
import { DatabaseLive } from "./db";
import { getUsers } from "./get-users";

const result = await pipe(
  getUsers,
  Effect.provide(DatabaseLive),
  Effect.runPromise
);

console.log(result);
