import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRouter from "./router/apiRouter";

const app: express.Application = express();

// configurations
app.use(cors()); //CORS
dotenv.config({ path: "./.env" }); // for env variables
app.use(express.json()); // json form data

let hostName: string | undefined = process.env.HOST_NAME;
let port: string | undefined = process.env.PORT;
let mongodbUrl: string | undefined = process.env.MONGODB_URL;

// Mongodb Connection
if (mongodbUrl) {
  mongoose
    .connect(mongodbUrl)
    .then((response) => {
      console.log(`Connected to MongoDB Successful...`);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1); // stop the node js process
    });
}

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ msg: "Welcome to Big_Basket Server..." });
});

// Router Configurations

app.use("/api/v1", apiRouter);

if (port !== undefined) {
  app.listen(port, () => {
    console.log(`Server runing on port ${port}...`);
  });
}
