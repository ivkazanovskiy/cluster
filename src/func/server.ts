import express from "express";
import { fib } from "./fib";

export const server = (port: number) => {
  const app = express();

  app.get("/:number", (req, res) => {
    console.log(`Worker ${process.pid} got request`);

    const num = Number(req.params.number);
    const startTime = new Date().getTime();
    const fibResult = fib(num);
    const finishTime = new Date().getTime();
    const text = `
      <h1>Result: ${fibResult}</h1>
      <h2>Start time: ${new Date(startTime)}</h2>
      <h2>Execution time: ${finishTime - startTime} ms`;
    res.status(200).send(text);
  });

  app.listen(port, () =>
    console.log(`Worker ${process.pid} started on port ${port}`)
  );
};
