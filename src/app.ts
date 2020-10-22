import dotenv from "dotenv";
dotenv.config();
import config from "./config";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

const app: Application = express();
const morganOptions = config.NODE_ENV === "production" ? "tiny" : "common";
const compressionOptions = {
  level: 6,
  threshold: 10 * 1000,
  filter: (req: any, res: any) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
};

app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());
app.use(compression(compressionOptions));
app.get("/", (req: Request, res: Response) => {
  res.send("hello world!");
});

export default app;
