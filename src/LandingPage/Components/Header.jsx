import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { indigo } from '@radix-ui/colors';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';

const Header = () => {
    // Define the brand colors
    const indigoColor = indigo.indigo9; // Replace this with the specific indigo color from Radix if available
    const backgroundColor = 'white';
    const textColor = 'black';

    const menuItemStyle = {
        padding: '0.6rem 1rem',
        cursor: 'pointer',
        color: textColor,
        backgroundColor: indigo.indigo3,
        ':hover': {
            backgroundColor: indigo.indigo3, // Lighter indigo color for hover
            color: 'white'
        },
        ':focus': {
            backgroundColor: indigo.indigo4, // Slightly darker indigo color for focus
            color: 'white'
        }
    };
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'white',
            color: textColor
        }}>
            {/* Logo on the left */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                <img src={logo} alt="logo" style={{ marginLeft: '10px', width: '50px', height: '50px' }} />
            </div>
             {/* Title centered */}
             <div style={{ 
                flex: 0, 
                textAlign: 'center', 
                color: 'black', 
                fontSize: '1.6rem', // Larger font size
                fontWeight: 'bold', // Bold font weight
                fontFamily: 'Arial, sans-serif', // A standard, professional font family
                letterSpacing: '1px' // Slight letter spacing for better readability
            }}>
                RapidReview
            </div>
            
            {/* Buttons on the right */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button style={{
                        padding: '0.4rem 0.8rem',
                        backgroundColor: indigoColor,
                        color: backgroundColor,
                        border: 'none',
                        fontSize: '0.8rem',
                        borderRadius: '4px'
                    }}>
                        Menu
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent style={{
                    backgroundColor: backgroundColor,
                    borderRadius: '6px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <DropdownMenuItem onSelect={() => alert('Upload your research papers and our software will extract key information such as authors, methods, and results.')}                                 
                        style={menuItemStyle}>
                        Extract Information
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert('Ask questions about your research papers and our AI will answer them for you.')} style={menuItemStyle}>
                        Chat with Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert('Visualize connections and trends in your literature review with interactive mind maps and graphs.')}  style={menuItemStyle}>
                        Data Visualization
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert('Work together with your team in real-time, share insights, and build on each other’s work.')}  style={menuItemStyle}>
                        Collaborate
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <NavLink to="/login">
                <button style={{
                    padding: '0.4rem 0.8rem',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    fontSize: '0.8rem',
                    borderRadius: '4px',
                    marginLeft: '1rem',
                }} >
                    Sign In
                </button>
            </NavLink>
        </div>
        </header>
    );
};

export default Header;
