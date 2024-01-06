import React from "react";
import logo from '../images/logo.png';
import {Text} from '@radix-ui/themes'

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'black',
      color: 'white',
      padding: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 'auto', // ensures that footer is at the bottom of the page
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <img src={logo} alt="logo" style={{ width: '50px', height: '50px' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        © {new Date().getFullYear()} RapidReview. All rights reserved.
      </div>
      <div>
        <a href="/terms" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Terms of Service
        </a>
        <a href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>
          Privacy Policy
        </a>
      </div>
      <div style={{ marginTop: '1rem' }}>
        With questions or feedback, please contact us at <a href="mailto:gural@rapidreview.io" style={{ color: 'white', textDecoration: 'none' }}>
          <em>gural@rapidreview.io</em>
        </a>
      </div>
    </footer>
  );
};

export default Footer;