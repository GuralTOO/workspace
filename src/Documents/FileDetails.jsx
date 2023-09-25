import React from 'react';
import { Popover, Button, Flex, Avatar, Box, TextArea, Checkbox, Text } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { FileTextIcon, CaretSortIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './File.css' 
import './FileDetails.css'

const FileDetails = ({fileName, setExpanded}) => {
    const [open, setOpen] = useState(false);

    const MAX_FILENAME_LENGTH = 14; // Adjust the calculations as needed

    const truncatedFileName = fileName.length > MAX_FILENAME_LENGTH
      ? fileName.substring(0, MAX_FILENAME_LENGTH-2) + ".."
      : fileName;
    
    // array of tuples of the form [name, contents[...]] called fileData
    // with data: [["file1", ["line1", "line2", "line3"]], ["file2", ["line1", "line2", "line3"]]]
    const fileData = [["Authors", ["line1", "line2", "line3"]], ["Topics", ["line1", "line2", "line3"]]];
    


    return(
        <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
        <div style={{display: 'flex', flexDirection: "column"}}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textOverflow: "clip", flexDirection: "row" }}>
            <Text color="gray" highContrast style={{flexGrow: 1}}>
              {truncatedFileName + "\n"}              
            </Text>
            <Collapsible.Trigger asChild onChange={
                open ? setExpanded(true) : setExpanded(false)
            }>
                <button className="IconButton" >
                    {open ? < Cross2Icon color='black'/> 
                    : <CaretSortIcon color='black'/>}
                </button>
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


          {/* <Collapsible.Content className="CollapsibleContent">
          <div style={{
            display: "flex",
            justifyContent: "center",
            height: "100px",
            backgroundColor: 'transparent'
          }}>
            <Text color="gray" highContrast style={{flexGrow: 1}}>
              {truncatedFileName}
            </Text>
          </div>
          </Collapsible.Content>         */}
          </div>
        </Collapsible.Root>
    )
}

export default FileDetails;

