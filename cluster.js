const cluster = require("cluster");
const os = require("os");
const colors = require("colors");

if (cluster.isMaster) {
  // Master process
  console.log(colors.bgBlue(`Master process ${process.pid} is running`));

  // Fork workers for each CPU core
  const numCPUs = os.cpus().length;
  console.log(colors.bgMagenta(`Forking ${numCPUs} workers...`));
  for (let i = 0; i < numCPUs; i++) {
    console.log("cluster forking: "+i)
    cluster.fork();
    console.log("cluster forked: "+i)
  }

  // Listen for worker exit and respawn
  cluster.on("exit", (worker, code, signal) => {
    console.log(colors.bgRed(`Worker ${worker.process.pid} exited`));
    console.log(colors.bgYellow("Spawning a new worker..."));
    cluster.fork();
  });
} else {
  // Worker process
  console.log(colors.bgGreen(`Worker ${process.pid} started`));
  require("./app.js"); // Import your Express app here
}
