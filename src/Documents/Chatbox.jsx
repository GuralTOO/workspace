import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const Chatbox = (param) => {
    const currentPath = param.folderPath;
    const [message, setMessage] = useState("");
    const [outputMessage, setOutputMessage] = useState("");

    const handleSend = async () => {
        console.log("send message")
        console.log("curpath:", currentPath)
        await supabase.functions.invoke('openai', {
            body: { 
              'path': currentPath, 
              'query': message,
            },
        }).then((response) => {
            console.log(response)
            setOutputMessage(response.data.message);
        })
        .catch((error) => {
            console.log('Error getting the answer:', error);
        });
    }

        

    return (
        <div style={{paddingTop: 50, paddingBottom: 50}}>
            <p>Chatbox</p>
            <input type="text" placeholder="Type a message..." onChange={(e) => setMessage(e.target.value)}/>
            <button title = "Send" onClick={handleSend} style={{backgroundColor: 'white', width: 50, height: 20}}/>
            <p>{outputMessage}</p>
        </div>
    )
}

export default Chatbox