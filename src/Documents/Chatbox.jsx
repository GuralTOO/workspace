import { supabase } from "../supabaseClient";
import { TextField, Button, Box } from '@mui/material';
import React, { useState, useEffect } from "react";
import './Chatbox.css'
import useSocket from "../utils/useSocket";


const Chatbox = (param) => {

    const socket = useSocket("http://127.0.0.1:5001");
    const currentPath = param.folderPath;
    const [message, setMessage] = useState("");
    const [outputMessage, setOutputMessage] = useState("");

    // stream version
    useEffect(() => {
        if (socket) {
            socket.on("searchStream", (msg) => {
                console.log("Received message: ", msg);
                setOutputMessage((prev) => prev + msg);
            });
        }
    }, [socket]);
    
    const handleSendStream = () => {
        setOutputMessage("");
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
            <form onSubmit={handleSend}>
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
                    <Button variant="contained" color="primary" type="submit" onSubmit={handleSend}>Send</Button>
                </Box>
            </form>
            <p>{outputMessage}</p>
        </div>
    );




    // const currentPath = param.folderPath;
    // const [message, setMessage] = useState("");
    // const [outputMessage, setOutputMessage] = useState("");

    // const handleSend = async () => {
    //     console.log("send message")
    //     console.log("curpath:", currentPath)
    //     await supabase.functions.invoke('openai', {
    //         body: { 
    //           'path': currentPath, 
    //           'query': message,
    //         },
    //     }).then((response) => {
    //         console.log(response)
    //         setOutputMessage(response.data.message);
    //     })
    //     .catch((error) => {
    //         console.log('Error getting the answer:', error);
    //     });
    // }

        

    // return (
    //     <div style={{paddingTop: 50, paddingBottom: 50}}>
    //         <p>Chatbox</p>
    //         {/* put the send button at the right end of the input bar */}
    //         <input type="text" placeholder="Type a message..." onChange={(e) => setMessage(e.target.value)} />


    //         <p>{outputMessage}</p>
    //     </div>
    // )
}

export default Chatbox