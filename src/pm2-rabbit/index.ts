import express from "express";
import { sendValueInFib1Queue } from "./queues/fib1.queue";
import { sendValueInFib2Queue } from "./queues/fib2.queue";

const app = express();
const PORT = 3000;
app.get("/:number", (req, res) => {
  const num = Number(req.params.number);

  if (num % 2 === 0) {
    sendValueInFib1Queue(num);
  } else {
    sendValueInFib2Queue(num);
  }

  console.log(`Express-worker ${process.pid} sent message to RabbitMQ`);

  return res.status(200).send("Request has been received successfully.");
});
app.listen(PORT, () =>
  console.log(`Express-worker ${process.pid} started server on port ${PORT}`)
);
