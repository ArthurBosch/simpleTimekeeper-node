import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import workplaceRouter from "./routes/workplaces.routes.js";
import shiftRouter from "./routes/shifts.routes.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "https://simple-timekeeper-react.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", workplaceRouter);
app.use("/api", shiftRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log("i work");
});
