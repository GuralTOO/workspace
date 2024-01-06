import React from 'react';
import { Card, Text, Em} from '@radix-ui/themes';
import { indigo, slate } from '@radix-ui/colors';
import { FileTextIcon, ChatBubbleIcon, ImageIcon, CrumpledPaperIcon } from '@radix-ui/react-icons'

const features = [
  {
    title: 'Automated Extraction',
    description: 'Upload your research papers and our software will extract key information such as authors, methods, and results.',
    icon: <FileTextIcon style={{ width: '50px', height: '50px', marginBottom: '.8rem' }} color={slate.slate12} />, // Replace with your icon path
  },
  {
    title: 'Chat with AI',
    description: 'Ask questions about your research papers and our AI will answer them for you.',
    icon: <ChatBubbleIcon style={{ width: '50px', height: '50px', marginBottom: '.8rem' }} color={slate.slate12} />, // Replace with your icon path
  },
  {
    title: 'Data Visualization',
    description: 'Visualize connections and trends in your literature review with interactive mind maps and graphs.',
    icon: <ImageIcon style={{ width: '50px', height: '50px', marginBottom: '.8rem' }} color={slate.slate10} />, // Replace with your icon path
  },
  {
    title: 'Collaborative Tools',
    description: 'Work together with your team in real-time, share insights, and build on each other’s work.',
    icon: <CrumpledPaperIcon style={{ width: '50px', height: '50px', marginBottom: '.8rem' }} color={slate.slate10} />, // Replace with your icon path
  },
  // Add more features as needed
];

const indigoColor = indigo.indigo9; // Replace this with the specific indigo color from Radix if available
const FeatureSection = () => {
    return (
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        padding: '4rem 0',
        backgroundColor: 'white', // White background for section
      }}>
        {features.map((feature, index
        ) => (
          <Card asChild key={feature.title} style={{
            maxWidth: '350px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '1rem',
            // backgroundColor: '#f8f9fa', // Light grey background for cards
            backgroundColor: slate.slate3, // Light grey background for cards
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            margin: 'auto',
            minHeight: '220px',
          }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                {/* add a green line of text saying "Coming Soon" if the index is 2 or higher*/}
                {index >= 2 && 
                <Text as="div" size="2" weight="bold" color='grass' style={{marginBottom: '.2rem'}}> {/* Ensuring text color is green for contrast */}
                    <Em >Coming Soon</Em>
                </Text>
                }
                {feature.icon}
              {/* <img src={feature.icon} alt={`${feature.title} icon`} style={{ width: '50px', height: '50px', marginBottom: '1rem' }} /> */}
              <Text as="div" size="2" weight="bold" style={{ marginBottom: '0.5rem', color: indigoColor }}>
                {feature.title}
              </Text>
              <Text as="div" size="2" style={{ color: 'black' }}> {/* Ensuring text color is black for contrast */}
                {feature.description}
              </Text>
            </a>
          </Card>
        ))}
      </section>
    );
  };
  
  export default FeatureSection;