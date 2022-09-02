import amqplib from "amqplib/callback_api";
import { fib } from "../../func/fib";
import { EQueue } from "../../types/queue.type";

export const sendValueInFib2Queue = (num: number) =>
  amqplib.connect({}, (err1, connection) => {
    if (err1) {
      console.error(err1);
      process.exit();
    }

    connection.createChannel((err2, channel) => {
      if (err2) {
        console.error(err2);
      }
      const result = fib(num);
      channel.assertQueue(EQueue.fib2, { durable: false });
      channel.sendToQueue(EQueue.fib2, Buffer.from(result.toString()));
      console.log(`Message "${result}" sent to queue ${EQueue.fib2}`);
    });
  });
