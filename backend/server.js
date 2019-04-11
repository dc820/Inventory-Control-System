const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
// Port Checks
const normalizePort = val => {
  var port = parseInt(val, 10);
  // Make Sure Port Is A Number
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  // Make Sure Port Is Not A Negetive Number
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};
// Error Handling
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// Set Up Listening
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};
// Set Port
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
// Created Server & Pass In App
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
// Listen On Port
server.listen(port);
