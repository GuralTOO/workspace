import { supabase } from "../supabaseClient";
import { TextField, Button, Box } from '@mui/material';
import React, { useState, useEffect } from "react";
import './Chatbox.css'
import useSocket from "../utils/useSocket";


const Chatbox = (param) => {

    const socket = useSocket("https://filestore.visionproje.com");
    const currentPath = param.folderPath;
    const [message, setMessage] = useState("");
    const [outputMessage, setOutputMessage] = useState("");

    // clear the input and output message when the path changes
    useEffect(() => {
        setMessage("");
        setOutputMessage("");
    }, [currentPath]);

    // stream version
    useEffect(() => {
        if (socket) {
            socket.on("searchStream", (msg) => {
                console.log("Received message: ", msg);
                setOutputMessage((prev) => prev + msg);
            });
        }
    }, [socket]);
    
    const handleSendStream = async (event) => {
        event.preventDefault(); // Add this line
        setOutputMessage("");
        console.log("I be streamin")
        if (socket && socket.connected) {
            socket.emit("searchStream", {"path": currentPath, "query": message});
        } else {
            console.error("Socket is not connected");
        }
    };

    // non-stream version
    const handleSend = async (event) => {
        event.preventDefault();
        console.log("send message");
        console.log("curpath:", currentPath);

        await supabase.functions.invoke('openai', {
            body: { 
            'path': currentPath, 
            'query': message,
            },
        }).then((response) => {
            console.log(response);
            setOutputMessage(response.data.message);
        })
        .catch((error) => {
            console.log('Error getting the answer:', error);
        });

        setMessage(""); // clear the message input field
    }

    return (
        <div style={{paddingTop: 50, paddingBottom: 50}}>
            <p>Chatbox</p>
            <form onSubmit={handleSendStream}>
                <Box display="flex" >
                    <TextField 
                        type="text"
                        variant="outlined"
                        placeholder="Type a message..." 
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ marginRight: 8 }}
                        InputProps={{ // Target the input element
                            style: { color: 'white' },
                            className: "outlined-input"
                        }}
                    />
                    <Button variant="contained" color="primary" type="submit">Send</Button>
                </Box>
            </form>
            <p>{outputMessage}</p>
        </div>
    );


}

export default Chatbox