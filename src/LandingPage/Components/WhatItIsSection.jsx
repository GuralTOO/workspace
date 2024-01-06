import React from 'react';
import { indigo } from '@radix-ui/colors';
import { NavLink } from 'react-router-dom';

const WhatItIsSection = () => {
    return (
        <section style={{
            // backgroundColor: '#f8f9fa', // Light grey background for contrast
            color: 'black', // Text color
            padding: '2rem 2rem', // Ample padding for spacious layout
            textAlign: 'center', // Center-align the text
        }}>
            <h2 style={{
                fontSize: '2rem', // Large font size for the heading
                marginBottom: '1rem', // Margin bottom for spacing
                color: indigo.indigo11, // Using brand indigo color for heading
            }}>
                Accelerate Your Research 
                {/* endline */} <br />
                Productivity Today
            </h2>
            <p style={{
                fontSize: '1rem', // Comfortable reading size for the paragraph
                maxWidth: '600px', // Max width for optimal reading experience
                lineHeight: '1.6', // Line height for readability
                margin: 'auto', // Automatically aligns text block to center
                color: 'black', // Text color
            }}>
                Novel way to manage your research papers. 
                Automated extraction tools, upcoming collaborative environment, and 
                advanced data visualization techniques, make it easier and 
                faster for you to find and organize the information you need. 
            </p>
            <NavLink to = '/login'>
            <button style={{
                marginTop: '1rem',
                padding: '0.6rem 1.2rem', // Slightly smaller padding for a smaller button
                fontSize: '0.8rem', // Smaller font size
                backgroundColor: 'black', // Button background color
                color: 'white', // Text color
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.2s ease-in-out',
                textTransform: 'initial'
            }}>
                <strong>Join</strong> - we're in beta
            </button>
            </NavLink>
        </section>
    );
}

export default WhatItIsSection;