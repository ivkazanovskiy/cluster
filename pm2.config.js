// this file helps to start server using pm2 cluster
module.exports = {
  apps: [
    {
      name: "Cluster express app",
      script: "dist/pm2/index.js",
      watch: true,
      instances: "MAX",
      autorestart: true,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
