import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Account from './Account';
import FileList from './Documents/FileList';
import Header from './Documents/Header';
import Sidebar from './Documents/SideBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    console.log(session);
  }, []);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Sidebar />
        <div id="main-content">
          {!session ? (
            <Auth />
          ) : (
            <Routes>
              <Route path="/workspace" element={<FileList key={session.user.id} userID={session.user.id} />} />
              <Route path="/account" element={<Account key={session.user.id} session={session} />} />
            </Routes>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
