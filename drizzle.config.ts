 
import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load from .env.local for local development
dotenv.config({ path: ".env.local" });

// Helper to get env vars with clear error messages
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    // This error will show during build if vars are missing
    throw new Error(
      `❌ Missing required environment variable: ${key}\n` +
      `   Please add ${key} to your build environment variables.\n` +
      `   Current NODE_ENV: ${process.env.NODE_ENV || 'not set'}`
    );
  }
  return value;
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: getEnvVar("CLOUDFLARE_ACCOUNT_ID"),
    databaseId: getEnvVar("CLOUDFLARE_DATABASE_ID"),
    token: getEnvVar("CLOUDFLARE_D1_TOKEN"),
  },
  out: "./drizzle/migrations",
});