import { fib } from "../func/fib";

process.on("message", (num: number) => {
  console.log(`3) Fib-worker 2 ${process.pid} received "${num}" from Primary`);

  const result = fib(num);

  // send result to primary process
  process.send!(result);
});
