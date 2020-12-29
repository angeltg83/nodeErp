// const bodyParser = require("body-parser");
const app = require("express")();
const routes = require("./routes");

const { port, NEW_CHAT_MESSAGE_EVENT } = require("./config/config");

app.use("/", routes);
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected!!");
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
  
});

http.listen(port, () => {
  console.info("starting server in port : ", port);
});

// const port = 7000;

// Para ejecutar, en la raiz del proyecto
// node index.js

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const UsuarioController = require('./Controllers/UsuarioController');
