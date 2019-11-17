const io = require("socket.io")(3000);

let clients = [];

io.on("connection", socket => {
  console.log("new socket client: ", socket.id);
  socket.on("MAKE_OFFER", offer => {
    clients.push({
      socketId: socket.id,
      description: offer
    });
    console.log("clients: ", clients);
    io.sockets.emit("CLIENTS_LIST", clients);
  });
});
