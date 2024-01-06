import React from 'react';
import {indigo} from '@radix-ui/colors'

const steps = [
  {
    title: 'Sign Up',
    description: 'Click the "Sign In" button on the top right of the screen. You can sign up with your Google account or with your email address.',
  },
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
    description: 'Did things work well? Did you feel like some features were missing or just want to say hi? Please send us your feedback by email - gural@rapidreview.io.'
  }
];
const HowItWorksSection = () => {
  return (
    <section style={{
      backgroundColor: 'white', // Changed from 'blue' to 'white' to match your brand colors
      padding: '4rem 0',
      color: 'black',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'black' }}>How It Works</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        {steps.map((step, index) => (
          <div key={index} style={{
            textAlign: 'left',
            maxWidth: '600px', // This value can be adjusted based on your design needs
            marginBottom: '2rem',
          }}>
            <h3 style={{ color: indigo.indigo10}}>{step.title}</h3>
            <p style={{color: 'black'}}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;