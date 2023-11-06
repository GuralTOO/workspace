import React from 'react';
import { Popover, Button, Flex, Avatar, Box, TextArea, Checkbox, Text } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { FileTextIcon, CaretSortIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './File.css' 
import './FileDetails.css'
import { getFileDetails } from '../utils/getFileDetails';

const FileDetails = ({fileName, setExpanded, filePath}) => {
    const [open, setOpen] = useState(false);

    const MAX_FILENAME_LENGTH = 14; // Adjust the calculations as needed

    const truncatedFileName = fileName.length > MAX_FILENAME_LENGTH
      ? fileName.substring(0, MAX_FILENAME_LENGTH-2) + ".."
      : fileName;
    
    // array of tuples of the form [name, contents[...]] called fileData
    // with data: [["file1", ["line1", "line2", "line3"]], ["file2", ["line1", "line2", "line3"]]]
    const [fileData, setFileData] = useState([["Authoritities", ["line1", "line2", "line3"]], ["Topics", ["line1", "line2", "line3"]]]);

    
    const getFileData = async (filePath) => {
        const data = await getFileDetails(filePath);
        // convert data from json to array of tuples
        console.log("data: ", data);
        const newData = [];
        for (const [key, value] of Object.entries(data)) {
            newData.push([key, [value]]);
        }
        console.log("newData: ", newData);
        setFileData(newData);
    };

    // id open is true, get the file data
    useEffect(() => {
        if (open) {
            console.log("getting file data")
            getFileData(filePath);
        }
    }, [open]);
    

    return(
        <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
        <div style={{display: 'flex', flexDirection: "column"}}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textOverflow: "clip", flexDirection: "row" }}>
            <Text color="gray" highContrast style={{flexGrow: 1}}>
              {truncatedFileName + "\n"}              
            </Text>
            <Collapsible.Trigger asChild onChange={open ? setExpanded(true) : setExpanded(false)}>
                <Button className="IconButton" variant="soft" >
                    {open ? < Cross2Icon color = "#3e63dd" /> 
                    : <CaretSortIcon color = "#3e63dd" style={{width: '20px', height: '20px'}}/>}
                </Button>
            </Collapsible.Trigger>
            </div>
            {
                open ?
                <ScrollArea.Root className="ScrollAreaRootY">
                    <ScrollArea.Viewport className="ScrollAreaViewportY">
                    {
                        fileData.map((file, index) => (
                            <div key={index} className="TagY">
                                <Text color="gray" highContrast size={"2"} 
                                    style={{flexGrow: 1}}>
                                    {file[0]}
                                </Text>
                                <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
                                    {
                                        file[1].map((line, index) => (
                                            <Text color="gray" highContrast style={{flexGrow: 1}} key={index} size={"1"} mx={"2"}>
                                                {line}
                                            </Text>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="horizontal">
                        <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar orientation="vertical">
                        <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner />
                </ScrollArea.Root>
                : null
            }
          </div>
        </Collapsible.Root>
    )
}

export default FileDetails;

