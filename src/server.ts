import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import candidateRoutes from "./routes/candidate.routes";

const app = express();

app.use(bodyParser.json());
app.use("/api/candidates", candidateRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});