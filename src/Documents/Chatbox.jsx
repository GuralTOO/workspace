import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { TextField, Button, Box } from '@mui/material';
import './Chatbox.css'


const Chatbox = (param) => {


    const currentPath = param.folderPath;
    const [message, setMessage] = useState("");
    const [outputMessage, setOutputMessage] = useState("");

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
                    <Button variant="contained" color="primary" type="submit">Send</Button>
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