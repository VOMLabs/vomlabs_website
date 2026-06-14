import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;
let client: postgres.Sql | null = null;

export function getDb() {
  if (db) {
    return db;
  }

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Configure it in your .env file.\n" +
        "Example: DATABASE_URL=postgresql://user:password@host:5432/database"
    );
  }

  client = postgres(connectionString, { prepare: false });
  db = drizzle(client, { schema });
  return db;
}

export function getClient() {
  if (client) {
    return client;
  }
  getDb();
  return client!;
}

export async function closeDb() {
  if (client) {
    await client.end();
    client = null;
    db = null;
  }
}
