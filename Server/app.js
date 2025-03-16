import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";

import DBConnection from "./Database/database.js";
import Router from "./Routes/Router.js";
import ConsultRouter from "./Routes/ConsultRoutes.js";
import StudentRouter from "./Routes/StudentRouter.js";

dotenv.config();

const numCPUs = os.cpus().length; // Get the number of CPU cores

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  // Fork workers for each core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart a worker if it crashes
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // Worker processes run the server
  const app = express();

  const StartServer = () => {
    app.use(cors());

    app.use("/", Router);
    app.use("/Consult", ConsultRouter);
    app.use("/Student", StudentRouter);

    const PORT = process.env.PORT_NUMBER || 3000;
    app.listen(PORT, () => {
      console.log(`Worker ${process.pid} running at http://localhost:${PORT}`);
    });

    DBConnection();
  };

  StartServer();
}
