import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: "database-2.cybpuqyizaxy.eu-west-3.rds.amazonaws.com",
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
