import pg from "pg";
import dotenv from "dotenv";

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});

pool.connect(function (err) {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected!");
});

export default pool;