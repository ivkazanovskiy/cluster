import cluster from "cluster";
import { cpus } from "os";
import { server } from "../func/server";

const numCPUs = cpus().length;
const PORT = 3000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}

if (cluster.isWorker) {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  server(PORT);
}
