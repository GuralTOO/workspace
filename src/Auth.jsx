import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  console.log("rendering auth");
  const dev = process.env.NODE_ENV === 'development'
  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email, redirectTo: 
      dev ? 'http://localhost:5173/' : 'https://workspace.gn-works.com' })

    if (error) {
      alert(error.error_description || error.message)
      console.log(error)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  const handleLoginWithGoogle = async (event) => {
    event.preventDefault()
    console.log("logging in with google")

    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })

    if (error) {
      alert(error.error_description || error.message)
      console.log(error)
    } else {
      // alert('Google Did not Sign in...:(')
    }
    setLoading(false)
  }
  

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header" style={{color: "black"}}>Welcome to the Workspace</h1>
        <p className="description" style={{color: "black"}}>Sign in via magic link with your email below</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div style={{width: '80%'}}>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div >
            <button disabled={loading} style={{width: '80%'}}>
              {loading ? <span style={{color: "black"}}>Loading</span> : <span style={{color: "black"}}>Send magic link</span>}
            </button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div >
            <span style={{color: "gray"}}>
              Or continue with
            </span>
          </div>
        </div>
        <div className="links">
          <button color="black" disabled={loading} 
            onClick={handleLoginWithGoogle}>
            <span style={{color: "black"}}>Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}