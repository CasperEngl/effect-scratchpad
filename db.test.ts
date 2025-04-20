import { Effect, pipe } from "effect";
import { describe, expect, it } from "vitest";
import { DatabaseTest } from "./db";
import { getUsers } from "./get-users";

describe("Database", () => {
	it("should have 10 users seeded", async () => {
		const users = await pipe(
			getUsers,
			Effect.provide(DatabaseTest),
			Effect.runPromise,
		);
		expect(users[0]?.name).toBe("Melanny");
		expect(users).toHaveLength(10);
	});
});
