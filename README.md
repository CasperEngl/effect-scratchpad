# effect-scratchpad

A TypeScript project using Effect, Drizzle, and PostgreSQL.

## Project Structure

```
├── src/           # Source code
│   ├── db/        # Database related code
│   └── tracing.ts # Tracing configuration
├── tests/         # Test files
├── config/        # Configuration files
├── drizzle/       # Drizzle migrations
└── data/          # Data files
```

## Getting Started

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```

To run tests:

```bash
bun run test
```

To format code:

```bash
bun run format
```

To lint code:

```bash
bun run lint
```

This project uses:
- [Bun](https://bun.sh) as the JavaScript runtime
- [Effect](https://effect.website) for functional programming
- [Drizzle](https://orm.drizzle.team) as the ORM
- [Biome](https://biomejs.dev) for linting and formatting
- [Vitest](https://vitest.dev) for testing
