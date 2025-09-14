
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("🔗 Ek user connect hua...");

  socket.on("join group", ({ username, groupname }) => {
    socket.username = username;
    socket.groupname = groupname;
    socket.join(groupname);

    socket.emit("chat message", {
      user: "System",
      text: `Welcome to the "${groupname}" group, ${username}!`,
    });

    socket.to(groupname).emit("chat message", {
      user: "System",
      text: `${username} has joined the group.`,
    });
  });

  socket.on("chat message", (msg) => {
    if (socket.groupname) {
      io.to(socket.groupname).emit("chat message", {
        user: socket.username,
        text: msg,
      });
    }
  });

  socket.on("leave group", () => {
    if (socket.groupname && socket.username) {
      socket.leave(socket.groupname);
      io.to(socket.groupname).emit("chat message", {
        user: "System",
        text: `${socket.username} has left the group.`,
      });
      socket.groupname = null;
    }
  });

  socket.on("disconnect", () => {
    if (socket.username && socket.groupname) {
      io.to(socket.groupname).emit("chat message", {
        user: "System",
        text: `${socket.username} has left the group.`,
      });
    }
    console.log("❌ User disconnect ho gaya");
  });
});

server.listen(8000, () => {
  console.log("🚀 Server http://localhost:8000 par chal raha hai");
});