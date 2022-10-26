import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

pool.connect(function (err) {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected!");
});

export default pool;
