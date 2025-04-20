import { Data, Effect } from "effect";
import { Database } from "./context";

class DatabaseError extends Data.TaggedError("DatabaseError")<{
  message: string;
}> {}

export const getUsers = Effect.gen(function* () {
  const db = yield* Database;

  const users = yield* Effect.tryPromise({
    try: () => db.query.users.findMany(),
    catch: () => new DatabaseError({ message: "Failed to get users" }),
  });

  return users;
});
