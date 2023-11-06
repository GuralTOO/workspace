import { HashRouter as Router, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Account from './Account';
import FileList from './Documents/FileList';
import Sidebar from './Documents/Sidebar/SideBar';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


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
      <Theme
        id="theme"
        appearance='light'
        accentColor='indigo'
        grayColor="slate"
        panelBackground="translucent"
        scaling="100%"
        radius="small"
        scheme="light"
        tone = ""
        weight="normal"
      >
      <div>
      {!session ? <Auth /> :       
        <RouterProvider router={
          createBrowserRouter([
            {element: <Sidebar userID={session.user.id}/>, children: [
              {
                path: 'account', element: <Account session={session} />
              },
              {
                path: "files/*", element: <FileList userID={session.user.id} /> ,
              },
              {
                path: '/', element: <Navigate to = {'files'}/>
              },
              {
                path: '*', element: <h1>404: Whoopsie daisy, Page not Found</h1>
              }
            ]}
          ])  
        } />
      } 
      </div>
      </Theme>
    </ThemeProvider>
  );
}

export default App;
