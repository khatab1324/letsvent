import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { addMessageToChat } from "./lib/action/addMessageToChat";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    let ids: string;

    console.log("New client connected");
    socket.emit("welcome", { d: "Welcome to the server!" });

    socket.on("message", (data: { message: string; chat_id: string }) => {
      // Here you can save the message to your database
      console.log("Message Received: ", data);

      // Broadcast the message to all connected clients
      console.log("ids", ids);

      socket.to(ids).emit("message", data);
    });

    socket.on("join-chat", (id: string) => {
      console.log("id:==================", id);
      socket.join(id);
    });

    socket.on("room message", async ({ chat_id, sender_id, message }) => {
      try {
        console.log(chat_id, "user id", sender_id);
        await addMessageToChat(message, sender_id, chat_id);
        io.to(chat_id).emit("room message", { message });
      } catch (error) {
        io.to(chat_id).emit("room message", { error });
        console.error("Error handling room message:", error);
      }
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
