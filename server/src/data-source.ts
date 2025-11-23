import { DataSource } from 'typeorm';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * CLI에서 schema:sync 등을 실행할 때 .env 값을 로드하기 위한 단순 파서
 * (dotenv 패키지를 쓰지 않고 필요한 최소 기능만 구현)
 */
function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) {
      continue;
    }
    const key = trimmed.slice(0, eqIdx).trim();
    const rawValue = trimmed.slice(eqIdx + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

// CLI로 실행될 때 자동으로 .env 값을 적용
loadEnvFile();

const port = Number(process.env.DB_PORT ?? 3306);

/**
 * TypeORM CLI 명령(schema:sync, migration 등)을 위해 export 하는 DataSource 정의
 */
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // CLI에서는 명령으로만 동기화하도록 false 유지
  logging: false,
});
