// this file helps to start server using pm2 cluster
const { cpus } = require("os");

module.exports = {
  apps: [
    {
      name: "express",
      script: "dist/pm2-rabbit/index.js",
      watch: true,
      instances: cpus().length - 2,
      autorestart: true,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      // env: {
      //   NODE_ENV: "development",
      // },
      // env_production: {
      //   NODE_ENV: "production",
      // },
    },
    {
      name: "worker1",
      script: "dist/pm2-rabbit/workers/fib1.worker.js",
      instances: 1,
    },
    {
      name: "worker2",
      script: "dist/pm2-rabbit/workers/fib2.worker.js",
      instances: 1,
    },
  ],
};
