import React from 'react';
import { styled } from '@stitches/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

const steps = [
    {
        title: 'Upload Documents',
        description: 'Use the "New" button on the left to upload your documents or create folders. Average upload time is 10 seconds per document. On the back-end, our software is reading the document and extracting information.',
    },
    {
        title: 'Explore Insights',
        description: 'Look to the right side of the screen. You will see a table filled with Authors, Methods, and Results extracted from each paper in the current folder.',
    },
    {
        title: 'Chat with AI',
        description: 'Switch the Tab on the right side of the screen from "Info" to "Chat". You can ask questions about your research papers and our AI will answer them for you. Please bear in mind that our advanced AI functionality is in development and this chat can answer only basic questions',
    },
    {
        title: 'Give us Feedback',
        description: 'Did things work well? Did you feel like some features were missing or just want to say hi? Please send us your feedback by clicking the "Feedback" button on the sidebar.'
    }
];
const Accordion = styled(AccordionPrimitive.Root, {
    width: '100%',
  });
  const AccordionItem = styled(AccordionPrimitive.Item, {
    borderBottom: '1px solid black',
    '&:last-child': {
      borderBottom: 'none',
    },
  });
  const AccordionHeader = styled(AccordionPrimitive.Header, {
    padding: '15px',
    backgroundColor: 'white',
  });
  const AccordionButton = styled(AccordionPrimitive.Button, {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
    justifyContent: 'space-between',
    color: 'black',
    '&[data-state="closed"]': {
      backgroundColor: 'white',
    },
    '&[data-state="open"]': {
      backgroundColor: 'indigo',
      color: 'white',
    },
  });
  const AccordionPanel = styled(AccordionPrimitive.Panel, {
    padding: '15px',
    backgroundColor: 'white',
  });
  
  const HowItWorksSection = () => {
    return (
      <section style={{
        backgroundColor: 'white',
        padding: '4rem 0',
        color: 'black',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>How It Works</h2>
        <Accordion type="single" collapsible>
          {steps.map((step, index) => (
            <AccordionItem value={step.title} key={index}>
              <AccordionHeader>
                <AccordionButton>
                  {step.title}
                  <span style={{ marginLeft: 'auto' }}>+</span>
                </AccordionButton>
              </AccordionHeader>
              <AccordionPanel>
                <p>{step.description}</p>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    );
  };
  
  export default HowItWorksSection;