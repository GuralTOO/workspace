// useSocket.js
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = (serverUrl) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(serverUrl);

    socketIo.on("connect", () => {
      console.log("connected to server");
    });

    socketIo.on("connect_error", (error) => {
      console.log("Connect Error:", error);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket;
