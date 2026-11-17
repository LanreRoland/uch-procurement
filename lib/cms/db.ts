import { Pool } from "pg";

let pool: Pool | null = null;

export function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export function getPool() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error("PostgreSQL is not configured. Set DATABASE_URL in the environment.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
    });
  }

  return pool;
}

export async function query<T>(text: string, values: unknown[] = []) {
  const result = await getPool().query<T>(text, values);
  return result;
}
