import amqplib from "amqplib/callback_api";
import { EQueue } from "../../types/queue.type";

amqplib.connect({}, (err1, connection) => {
  if (err1) {
    console.error(err1);
    process.exit();
  }

  connection.createChannel((err2, channel) => {
    if (err2) {
      console.error(err2);
    }

    channel.assertQueue(EQueue.fib2, { durable: false });
    channel.consume(
      EQueue.fib2,
      (message) => {
        const result = message?.content.toString();

        console.log(
          `Consumer received result "${result}" from queue "${EQueue.fib2}`
        );
      },
      { noAck: true }
    );
  });
});
