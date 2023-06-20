import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import FileUpload from './Documents/FileUpload'
import FileList from './Documents/FileList'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    console.log(session)
  }, [])

  return (
    <div>
      {!session ? <Auth /> : <FileList key={session.user.id} userID = {session.user.id}/>}
      {/* {!session ? <Auth /> : <FileUpload userID = {session.user.id}/>} */}
      {/* {!session ? <Auth /> : <Account key={session.user.id} session={session} />} */}
    </div>
  )
}

export default App


// import React from 'react';
// import Header from './Documents/Header';
// import Sidebar from './Documents/SideBar';
// import FileManager from './Documents/FileManager';

// const App = () => {
  
//   return (
//     <div>
//       <Header />
//       <div className="main-container">
//         {/* <Sidebar /> */}
//         <FileManager />
//       </div>
//     </div>
//   );
// };

// export default App;
