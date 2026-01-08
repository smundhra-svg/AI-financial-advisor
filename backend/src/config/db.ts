import 'dotenv/config';
import { Pool } from 'pg';
import type { QueryResult, QueryResultRow } from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool: Pool = new Pool({
  connectionString: databaseUrl,
});

export const query = async <T extends QueryResultRow = QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};

export default pool;