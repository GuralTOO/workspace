import { supabase } from "../supabaseClient";
import React, { useState, useEffect } from "react";
import { TextArea } from '@radix-ui/themes';
import './Chatbox.css'
import useSocket from "../utils/useSocket";
import { indigo } from "@radix-ui/colors";


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
        setMessage(""); // clear the message input field
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
        <div style={{paddingBottom: 20, marginRight: 20}} className="ChatInputArea">
            <TextArea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask your question ... click 'Enter' to send"
                variant="soft"
                size="3"
                color="indigo"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // Prevent the default behavior
                        handleSendStream(e); // Call the function to handle sending the message
                    }
                }}
                style={{
                    border: "5px",
                    borderColor: indigo.indigo9,
                    borderRadius: '5px', padding: '10px',
                }}
                // Add other Radix UI specific properties if needed
            />
        </div>
    );


}

export default Chatbox