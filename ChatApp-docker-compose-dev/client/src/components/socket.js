import io from "socket.io-client"
console.log("My Server URL :"+window.location.href)
const socket = io.connect(window.location.href);
console.log('NEW SOCKET CREATED ::::::::::::::::::::::::::::::::');

export default socket
