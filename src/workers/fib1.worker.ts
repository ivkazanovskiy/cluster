import { fib } from "../func/fib";

process.on("message", (num: number) => {
  console.log(`3) Fib-worker 1 ${process.pid} received "${num}" from Primary`);

  const result = fib(num);

  // send result to primary process
  process.send!(result);
});
