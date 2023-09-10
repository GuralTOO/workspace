import { supabase } from "../supabaseClient";
import { TextField, Button, Box } from '@mui/material';
import React, { useState, useEffect } from "react";
import './Chatbox.css'
import useSocket from "../utils/useSocket";


const Chatbox = ({folderPath, outputMessage, setOutputMessage}) => {

    const serverUrl = "https://filestore.visionproje.com";
    // const serverUrl = "http://127.0.0.1:5001";
    const socket = useSocket({serverUrl: serverUrl, 
        jwt: supabase.auth.getSession() ? supabase.auth.getSession().access_token : null});
    const currentPath = folderPath;
    const [message, setMessage] = useState("");
    // const [outputMessage, setOutputMessage] = useState("");
    const [buffer, setBuffer] = useState("");  // Add this line
    const [shouldStartDraining, setShouldStartDraining] = useState(false); 

    
    // clear the input and output message when the path changes
    useEffect(() => {
        setMessage("");
        setOutputMessage("");
    }, [currentPath]);

    // Update the output message from the buffer at a steady rate
    useEffect(() => {
        if (buffer.length > 10) {  // Wait until there are at least 10 characters in the buffer
            setShouldStartDraining(true);
        }
    
        const intervalId = setInterval(() => {
            if (shouldStartDraining && buffer.length > 0) {
                setOutputMessage((prev) => prev + buffer.charAt(0));
                setBuffer((prev) => prev.slice(1));
            }
        }, 10);  // Adjust this value to control the speed
    
        // Clean up the interval on unmount
        return () => clearInterval(intervalId);
    }, [buffer, shouldStartDraining]);  


    // stream version
    useEffect(() => {
        if (socket) {
            socket.on('message', (msg) => {
                console.log("Received message: ", msg);
                setBuffer((prev) => prev + msg);
            });
        }
    }, [socket]);
    
    const handleSendStream = async (event) => {
        console.log(currentPath)
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
        <div style={{paddingBottom: 20}}>
            <form onSubmit={handleSendStream}>
                <Box display="flex" >
                    <TextField 
                        type="text"
                        variant="outlined"
                        placeholder="Tell me about x..." 
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ marginRight: 8, color: 'beige' }}
                        InputProps={{ // Target the input element
                            style: { color: 'beige' },
                            className: "outlined-input"
                        }}
                    />
                    <Button variant="contained" color="primary" type="submit">Send</Button>
                </Box>
            </form>
            {/* <p>{outputMessage}</p> */}
        </div>
    );


}

export default Chatbox