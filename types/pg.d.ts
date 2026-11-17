declare module "pg" {
  export interface QueryResult<T> {
    rows: T[];
    rowCount: number | null;
  }

  export class Pool {
    constructor(config?: {
      connectionString?: string;
      ssl?: boolean | { rejectUnauthorized?: boolean };
    });

    query<T = Record<string, unknown>>(
      text: string,
      values?: unknown[]
    ): Promise<QueryResult<T>>;
  }
}
