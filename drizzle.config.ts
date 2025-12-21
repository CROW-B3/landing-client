/* eslint-disable node/prefer-global/process */
import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

export default defineConfig({
        schema: "./src/db/schema.ts",
        dialect: "sqlite",
        driver: "d1-http",
        dbCredentials: {
                // eslint-disable-next-line dot-notation
                accountId: process.env["CLOUDFLARE_ACCOUNT_ID"]!,
                // eslint-disable-next-line dot-notation
                databaseId: process.env["CLOUDFLARE_DATABASE_ID"]!,
                // eslint-disable-next-line dot-notation
                token: process.env["CLOUDFLARE_D1_TOKEN"]!,
        },
        out: "./drizzle/migrations",
});
