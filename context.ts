import { Context } from "effect";
import type { db } from "./db";

export class Database extends Context.Tag("Database")<Database, typeof db>() {}
