const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: any, code: any, signal: any) => {
    console.log(`worker ${worker.process.pid} died ....forking new cluster`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

  console.log(`Worker ${process.pid} started`);
  require("./server");
}
