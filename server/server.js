const io = require("socket.io")(3000);
const _ = require("lodash");

let directory;

let peers = [];

io.on("connection", socket => {
  console.log("new socket client: ", socket.id);
  socket.on("MAKE_OFFER", offer => {
    if (peers.length < 2 && directory && !directory.busy) {
      peers.push({
        socketId: socket.id,
        description: offer
      });
      io.sockets.emit("PEERS_LIST", peers);
      io.to(directory.socketId).emit("data", offer);
    } else {
      socket.emit("DIRECTORY_BUSY");
    }
  });

  socket.on("MAKE_ANSWER", message => {
    if (
      socket.id === directory.socketId &&
      message.sdp &&
      message.type === "answer"
    ) {
      const controller = _.find(
        peers,
        peer => peer.socketId !== directory.socketId
      );
      if (controller) {
        console.log("emit anser");
        io.to(controller.socketId).emit("data", message);
      }
      return;
    }
  });

  socket.on("data", message => {
    console.log("socket on ldata");
    const otherPeer = _.find(peers, peer => peer.socketId !== socketId);
    if (otherPeer) {
      io.to(otherPeer.socketId).emit("data", message);
    }
  });

  socket.on("SET_DIRECTORY", directoryData => {
    directory = {
      socketId: socket.id,
      busy: directoryData.busy
    };
    peers[0] = directory;
    console.log("set directory device: ", directory);
  });
});
