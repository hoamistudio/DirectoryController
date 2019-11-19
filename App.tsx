import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  Button,
  StatusBar
} from "react-native";
import SocketIOClient from "socket.io-client";
const {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
  MediaStreamTrack
} = Platform.OS === "web" ? window : require("react-native-webrtc");

const notify = (title: string, message?: string) => {
  if (Platform.OS === "web") {
    alert(title);
  } else {
    Alert.alert(title);
  }
};

export default function App() {
  let pc = useRef<RTCPeerConnection | null>(null);
  let socket = useRef<SocketIOClient.Socket | null>(null);

  const makeOffer = () => {
    if (pc.current) {
      console.log("make offer");
      pc.current.onicecandidate = event => {
        console.log("on iceeeee");
        socket.current.emit("data", event.candidate);
      };
      pc.current.createOffer().then(offer => {
        pc.current.setLocalDescription(offer).then(() => {
          socket.current.emit("MAKE_OFFER", offer);
        });
      });
    } else {
      notify("Can not connect to Directory, please connect to the same wifi");
    }
  };

  useEffect(() => {
    pc.current = new RTCPeerConnection({
      iceServers: [{ url: "stun:stun.l.google.com:19302" }]
    });

    socket.current = SocketIOClient("http://192.168.48.27:3000");

    socket.current.on("PEERS_LIST", peers => {
      console.log("list peers: ", peers);
    });

    socket.current.on("DIRECTORY_BUSY", () => {
      notify("Directory is currently in use");
    });

    socket.current.on("data", message => {
      console.log("message", message);
      if (message.sdp) {
        if (message.type === "answer") {
          const remoteDecription = new RTCSessionDescription(message);
          pc.current
            .setRemoteDescription(remoteDecription)
            .catch(error => console.error(error));
        }
      } else if (message.candidate) {
        const iceCandidate = new RTCIceCandidate(RTCIceCandidate);
        pc.current.addIceCandidate(iceCandidate);
        console.log("browser added ice candidate: ", iceCandidate);
      }
    });

    // if is directory
    if (Platform.OS === "android") {
      socket.current.emit("SET_DIRECTORY", {
        busy: false
      });
      socket.current.on("data", message => {
        // notify(JSON.stringify(message));
        console.log("message", message);
        if (message.sdp) {
          if (message.type === "offer") {
            console.log("answer offer");
            const remoteDecription = new RTCSessionDescription(message);
            pc.current
              .setRemoteDescription(remoteDecription)
              .then(() => {
                pc.current.createAnswer().then(answer => {
                  console.log("answer: ", answer);
                  socket.current.emit("MAKE_ANSWER", answer);
                });
              })
              .catch(error => console.error(error));
          }
        } else if (message.candidate) {
          const iceCandidate = new RTCIceCandidate(RTCIceCandidate);
          pc.current.addIceCandidate(iceCandidate);
          console.log("android added candidate: ", iceCandidate);
        }
      });
    }

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View
        style={{ width: "40%", height: "100%", backgroundColor: "green" }}
      ></View>
      <View
        style={{ width: "60%", height: "100%", backgroundColor: "blue" }}
      ></View>
      <View style={{ position: "absolute", marginTop: 20 }}>
        <Button title="CONTROL DIRECTORY" onPress={makeOffer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  }
});
