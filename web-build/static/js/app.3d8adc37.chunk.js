(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,n,t){"use strict";t.d(n,"a",(function(){return E}));var r=t(1),o=t.n(r),c=t(3),a=t(16),i=t(18),s=t(56),u=t(60),l=t(59),d=t(101),f=t.n(d),w="web"===i.a.OS?window:t(222),g=w.RTCPeerConnection,p=w.RTCIceCandidate,m=w.RTCSessionDescription,h=(w.MediaStream,w.MediaStreamTrack,function(e,n){"web"===i.a.OS?alert(e):s.a.alert(e)});function E(){var e=Object(r.useRef)(null),n=Object(r.useRef)(null);return Object(r.useEffect)((function(){return e.current=new g({iceServers:[{url:"stun:stun.l.google.com:19302"}]}),n.current=f()("http://192.168.48.27:3000"),n.current.on("PEERS_LIST",(function(e){console.log("list peers: ",e)})),n.current.on("DIRECTORY_BUSY",(function(){h("Directory is currently in use")})),n.current.on("data",(function(n){if(console.log("message",n),n.sdp){if("answer"===n.type){var t=new m(n);e.current.setRemoteDescription(t).catch((function(e){return console.error(e)}))}}else if(n.candidate){var r=new p(p);e.current.addIceCandidate(r),console.log("browser added ice candidate: ",r)}})),"android"===i.a.OS&&(n.current.emit("SET_DIRECTORY",{busy:!1}),n.current.on("data",(function(t){if(console.log("message",t),t.sdp){if("offer"===t.type){console.log("answer offer");var r=new m(t);e.current.setRemoteDescription(r).then((function(){e.current.createAnswer().then((function(e){console.log("answer: ",e),n.current.emit("MAKE_ANSWER",e)}))})).catch((function(e){return console.error(e)}))}}else if(t.candidate){var o=new p(p);e.current.addIceCandidate(o),console.log("android added candidate: ",o)}}))),function(){}}),[]),o.a.createElement(a.a,{style:R.container},o.a.createElement(l.a,{hidden:!0}),o.a.createElement(a.a,{style:{width:"40%",height:"100%",backgroundColor:"green"}}),o.a.createElement(a.a,{style:{width:"60%",height:"100%",backgroundColor:"blue"}}),o.a.createElement(a.a,{style:{position:"absolute",marginTop:20}},o.a.createElement(u.a,{title:"CONTROL DIRECTORY",onPress:function(){e.current?(console.log("make offer"),e.current.onicecandidate=function(e){console.log("on iceeeee"),n.current.emit("data",e.candidate)},e.current.createOffer().then((function(t){e.current.setLocalDescription(t).then((function(){n.current.emit("MAKE_OFFER",t)}))}))):h("Can not connect to Directory, please connect to the same wifi")}})))}var R=c.a.create({container:{flex:1,backgroundColor:"#fff",justifyContent:"center",flexDirection:"row"}})},192:function(e,n,t){t(193),e.exports=t(248)},193:function(e,n){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/expo-service-worker.js",{scope:"/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))},219:function(e,n){}},[[192,1,2]]]);
//# sourceMappingURL=../../b2895ba5bed7dc0328b9.map