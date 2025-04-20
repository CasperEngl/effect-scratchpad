import { Effect, pipe } from "effect";
import { describe, expect, it } from "vitest";
import { Database } from "../src/db/db";
import { getUsers } from "../src/db/get-users";

describe("Database", () => {
	describe("getUsers", () => {
		it("should have the correct number of seeded users", async () => {
			const users = await pipe(
				getUsers,
				Effect.provide(Database.Test),
				Effect.runPromise,
			);
			expect(users).toHaveLength(10);
		});

		it("should have correct data for the first user", async () => {
			const users = await pipe(
				getUsers,
				Effect.provide(Database.Test),
				Effect.runPromise,
			);
			const [melanny] = users;
			expect(melanny?.name).toBe("Melanny");
			expect(melanny?.email).toBe("humble_charmain@web.de");
		});
	});
});
