import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ version: "1.0.0" });
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
