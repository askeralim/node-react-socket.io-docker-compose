import io from "socket.io-client"
const socket = io.connect("http://localhost:3001");
console.log('NEW SOCKET CREATED ::::::::::::::::::::::::::::::::');

export default socket
