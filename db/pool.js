import {Pool} from "pg"
import dotenv from "dotenv"
dotenv.config()
export const pool = new Pool({
  host: process.env.DB_HOST, // or wherever the db is hosted
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT, // The default port
});