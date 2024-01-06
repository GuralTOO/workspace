import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { indigo } from '@radix-ui/colors';
import { NavLink } from 'react-router-dom';


const Header = () => {
    // Define the brand colors
    const indigoColor = indigo.indigo9; // Replace this with the specific indigo color from Radix if available
    const backgroundColor = 'white';
    const textColor = 'black';

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: backgroundColor,
            color: textColor
        }}>
            <div style={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: textColor
            }}>
                YourLogo
            </div>
            <nav>
                <ul style={{
                    listStyle: 'none',
                    display: 'flex',
                    gap: '1rem',
                    margin: '0',
                    padding: '0'
                }}>
                    <a href="#features" style={{ 
                        color: textColor, 
                        textDecoration: 'none',
                        cursor: 'pointer', // Indicates that it's clickable
                        fontWeight: '500', // Optionally make it slightly bolder
                        ':hover': { textDecoration: 'underline' } // Underline on hover
                    }}>Features</a>
                    <a href="#how-it-works" style={{ 
                        color: textColor, 
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        ':hover': { textDecoration: 'underline' }
                    }}>How It Works</a>
                    <a href="#testimonials" style={{ 
                        color: textColor, 
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        ':hover': { textDecoration: 'underline' }
                    }}>Testimonials</a>
                </ul>
            </nav>
            <div>
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
                    <DropdownMenuItem onSelect={() => alert('Feature 1')} style={{ color: textColor }}>
                        Feature 1
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert('Feature 2')} style={{ color: textColor }}>
                        Feature 2
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert('Feature 3')} style={{ color: textColor }}>
                        Feature 3
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
