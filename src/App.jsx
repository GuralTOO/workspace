import { HashRouter as Router, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Account from './Account';
import FileList from './Documents/FileList';
import Sidebar from './Documents/SideBar';


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

// check if env variable NODE_ENV is set to development
  const dev = process.env.NODE_ENV === 'development'

  return (
    <ThemeProvider theme={theme}>
      <div>
      {!session && !dev ? <Auth /> :       
        <RouterProvider router={
          createBrowserRouter([
            {element: <Sidebar userID= {dev ? 1: session.user.id}/>, children: [
              {
                path: 'account', element: <Account session={dev ? 1: session} />
              },
              {
                path: "files/*", element: <FileList userID={dev ? 1: session.user.id} /> ,
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
    </ThemeProvider>
  );
}

export default App;


/*
              path: '/', element: session ? <Sidebar /> : <Auth />,
              children: session ? 
              [
                // make the home page the user's files
                { path: '/', element: <Navigate to='/files' /> },
                { path: '/files', element: <FileList userID={session.user.id} />,
                  //create routes for fileId folders
                  children: [{path: ':path', element: <FileList userID={session.user.id} />},]
                },
                { path: '/account', element: <Account session={session}/> },
                // error page
                { path: '*', element: <h1>404: Not Found</h1> }
              ] : [],
*/

/*
             children: [
              <Route path="/" element={<Sidebar />}>
                <Route path='/folder' element={<FileList />} >,
                  <Route path=':path/*'
                    element={<FileList />}
                    loader={getFiles}
                  />,
                </Route>
                <Route path="/account" element={<Account />} />,
              </Route>
 
              */