import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import SocketIOClient from "socket.io-client";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from "react-native-webrtc";

export default function App() {
  let pc = useRef<RTCPeerConnection | null>(null);
  let socket = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    pc.current = new RTCPeerConnection({
      iceServers: [{ url: "stun:stun.services.mozilla.com" }]
    });

    socket.current = SocketIOClient("http://192.168.1.6:3000");

    socket.current.on("CLIENTS_LIST", clients => {
      console.log("list clients: ", clients);
    });

    pc.current.createOffer().then(offer => {
      pc.current.setLocalDescription(offer).then(() => {
        socket.current.emit("MAKE_OFFER", offer);
      });
    });

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{ width: "40%", height: "100%", backgroundColor: "green" }}
      ></View>
      <View
        style={{ width: "60%", height: "100%", backgroundColor: "blue" }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  }
});
