import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_4bfOdNVJDB2i@ep-still-lake-ae01gps5-pooler.c-2.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require&channel_binding=require',
  },
});
