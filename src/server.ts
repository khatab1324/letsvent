import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { addMessageToChat, addMessageToGroup } from "./lib/action/addMessage";
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

    socket.on("join-chat", (id: string) => {
      console.log("id:==================", id);
      socket.join(id);
    });

    socket.on(
      "room message",
      async ({ chat_id, sender_id, message, media_link }) => {
        try {
          console.log(chat_id, "user id", sender_id);
          const addmessaeg = await addMessageToChat(
            message,
            sender_id,
            chat_id,
            media_link
          );
          console.log("addmessaeg", addmessaeg);

          io.to(chat_id).emit("room message", addmessaeg);
        } catch (error) {
          io.to(chat_id).emit("room message", { error });
          console.error("Error handling room message:", error);
        }
      }
    );
    socket.on(
      "group message",
      async ({ group_chat_id, sender_id, message, media_link }) => {
        try {
          console.log(group_chat_id, "user id", sender_id);
          console.log("helooooooooooooo in groupppppppp");
          const addmessage = await addMessageToGroup(
            message,
            sender_id,
            group_chat_id
          );
          console.log("====================================");
          console.log("addmessage", addmessage);
          console.log("====================================");
          io.to(group_chat_id).emit("room message", addmessage);
        } catch (error) {
          io.to(group_chat_id).emit("room message", { error });
          console.error("Error handling room message:", error);
        }
      }
    );
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
