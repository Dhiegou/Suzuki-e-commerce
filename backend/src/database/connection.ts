import oracledb from 'oracledb';

// Oracle requires returning data as objects rather than array of arrays
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;
oracledb.fetchAsString = [oracledb.DB_TYPE_CLOB];

const DB_USER = process.env.DB_USER || 'rm560294';
const DB_PASSWORD = process.env.DB_PASSWORD || '170904';
const DB_HOST = process.env.DB_HOST || 'oracle.fiap.com.br';
const DB_PORT = process.env.DB_PORT || '1521';
const DB_SERVICE = process.env.DB_SERVICE || 'ORCL';

const connectString = `${DB_HOST}:${DB_PORT}/${DB_SERVICE}`;

const dbConfig: oracledb.PoolAttributes = {
  user: DB_USER,
  password: DB_PASSWORD,
  connectString: connectString,
  poolMin: 1,
  poolMax: 10,
  poolIncrement: 1,
  poolTimeout: 60,
};

const poolPromise: Promise<oracledb.Pool> = oracledb.createPool(dbConfig)
  .then(pool => {
    console.log('[DB] ✅ Oracle Database connection ready');
    return pool;
  })
  .catch(err => {
    console.error('[DB] ❌ Oracle Database connection failed:', err.message);
    throw err;
  });

export async function getConnection(): Promise<oracledb.Connection> {
  const pool = await poolPromise;
  return await pool.getConnection();
}

/**
 * Execute a query using the pool.
 */
export async function query<T = unknown>(
  sqlString: string,
  params?: Record<string, any>
): Promise<T[]> {
  const connection = await getConnection();
  try {
    const result = await connection.execute(sqlString, (params || {}) as oracledb.BindParameters, {
      fetchInfo: {
        "IMAGE_URL": { type: oracledb.STRING },
        "DESCRIPTION": { type: oracledb.STRING },
        "FEATURES": { type: oracledb.STRING }
      }
    }) as oracledb.Result<Record<string, any>>;
    
    // Oracle returns uppercase column names by default. Let's lowercase them for compatibility.
    const rows = (result.rows || []).map((row) => {
      const lowerRow: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(row)) {
        lowerRow[key.toLowerCase()] = value;
      }
      return lowerRow as T;
    });

    return rows;
  } finally {
    await connection.close(); // Release connection back to pool
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    await connection.ping();
    await connection.close();
    return true;
  } catch (error) {
    return false;
  }
}

export async function closePool(): Promise<void> {
  try {
    const pool = await poolPromise;
    if (pool) {
      await pool.close(0);
    }
    console.log('[DB] Connection pool closed');
  } catch (error) {
    console.error('[DB] Error closing pool:', error);
  }
}

export default poolPromise;
