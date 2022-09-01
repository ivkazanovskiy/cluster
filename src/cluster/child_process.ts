import cluster from "cluster";
import { cpus } from "os";
import { fork } from "child_process";
import express from "express";
import path from "path";

const numCPUs = cpus().length;
const PORT = 3000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // create 2 workers
  const worker1 = fork(path.join(__dirname, "../workers/fib1.worker"));
  const worker2 = fork(path.join(__dirname, "../workers/fib2.worker"));

  console.log(`Child process 1 has PID: ${worker1.pid}`);
  console.log(`Child process 2 has PID: ${worker2.pid}`);

  worker1.on("message", (result: number) => {
    // receive result from child process (fib-worker)
    console.log(
      `4) Primary process ${process.pid} received result "${result}" from Fib-worker 1`
    );
  });

  worker2.on("message", (result: number) => {
    // receive result from child process (fib-worker)
    console.log(
      `4) Primary process ${process.pid} received result "${result}" from Fib-worker 1`
    );
  });

  cluster.on("online", (worker) => {
    // receive message from express-worker
    console.log(
      `Connection between Primary process ${process.pid} and Express-worker ${worker.process.pid} has been established`
    );

    worker.on("message", (num: number) => {
      console.log(
        `2) Primary process ${process.pid} received "${num}"  from Express-worker ${worker.process.pid}`
      );

      if (num % 2 === 0) {
        worker1.send(num);
      } else {
        worker2.send(num);
      }
    });
  });

  // Fork workers. (Save 2 CPUs for workers)
  for (let i = 0; i < numCPUs - 2; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Express-worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.get("/:number", (req, res) => {
    const num = Number(req.params.number);
    process.send!(num); // send message cluster 'online' function
    console.log(`1) Express-worker ${process.pid} received the http request`);

    return res.status(200).send("Request has been received successfully.");
  });

  app.listen(PORT, () =>
    console.log(`Express-worker ${process.pid} started server on port ${PORT}`)
  );
}
