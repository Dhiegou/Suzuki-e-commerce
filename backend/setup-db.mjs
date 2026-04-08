// Database setup script for Oracle Database
// Run with: node setup-db.mjs
import oracledb from 'oracledb';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

oracledb.autoCommit = true;

const DB_SERVICE = process.env.DB_SERVICE || 'ORCL';
const HOST = process.env.DB_HOST || 'oracle.fiap.com.br';
const PORT = process.env.DB_PORT || '1521';

const dbConfig = {
  user: process.env.DB_USER || 'rm560294',
  password: process.env.DB_PASSWORD || '170904',
  connectString: `${HOST}:${PORT}/${DB_SERVICE}`
};

async function main() {
  console.log('');
  console.log('  🏍️  Nova Suzuki — Database Setup');
  console.log('  ================================');
  console.log('');

  let connection;
  try {
    console.log(`  🔗 Connecting to Oracle at ${dbConfig.connectString}...`);
    connection = await oracledb.getConnection(dbConfig);
    console.log(`  ✅ Connected to Oracle Database.`);
    
    // Read and execute migration
    const migrationPath = resolve(__dirname, 'src/database/migrations/001_initial_schema.sql');
    if (!existsSync(migrationPath)) {
       console.error('  ❌ Migration file not found:', migrationPath);
       process.exit(1);
    }
    
    console.log('  📋 Running migration...');
    const migrationSql = readFileSync(migrationPath, 'utf8');
    
    // Execute migration queries separated by '--- STATEMENT ---'
    const statements = migrationSql.split('--- STATEMENT ---');
    for (const stmt of statements) {
       const trimmed = stmt.replace(/^--.*$/gm, '').trim();
       if (trimmed) {
         await connection.execute(trimmed);
       }
    }
    
    console.log('  ✅ Migration applied successfully');
  } catch (err) {
    console.error('  ❌ Database setup failed:', err.message);
    process.exit(1);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }

  console.log('');
  console.log('  🎉 Database setup complete!');
  console.log(`  📊 Service: ${DB_SERVICE}`);
  console.log('');
}

main().catch(console.error);
