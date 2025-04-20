import { Effect } from "effect";
import { Database, DatabaseError } from "~/db/context";

export const getUsers = Effect.gen(function* (_) {
	const db = yield* _(Database);

	const users = yield* _(
		Effect.tryPromise({
			try: () => db.query.users.findMany(),
			catch: () => new DatabaseError({ message: "Failed to get users" }),
		}).pipe(Effect.withSpan("getUsers")),
	);

	return users;
});
