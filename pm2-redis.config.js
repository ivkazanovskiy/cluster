// this file helps to start server using pm2 cluster
const { cpus } = require("os");

module.exports = {
  apps: [
    {
      name: "express",
      script: "dist/pm2-redis/index.js",
      watch: true,
      instances: cpus().length,
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
  ],
};
