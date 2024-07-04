import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("welcome", { message: "Welcome to the server!" });

    socket.on("message", (data) => {
      // Here you can save the message to your database
      console.log("Message received: ", data);

      // Broadcast the message to all connected clients
      io.emit("message", data);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
