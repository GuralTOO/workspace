// Desc: Login page for the app
import { useState } from 'react';
import { supabase } from './supabaseClient';
import styles from './Auth.module.css'; // Assuming you're using CSS modules

// New component for the email input
function EmailInput({ value, onChange }) {
  return (
    <input
      className={styles.inputField}
      type="email"
      placeholder="Your email"
      value={value}
      required
      onChange={onChange}
    />
  );
}

// New component for buttons
function AuthButton({ loading, children, ...props }) {
  return (
    <button className={styles.button} disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  );
}

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

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
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to the Workspace</h1>
      <div className={styles.formWidget}>
        <p className={styles.instructions}>Sign in with your email</p>
        <form onSubmit={handleLogin}>
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className={styles.links}>
            <AuthButton loading={loading}>Email Sign In</AuthButton>
          </div>
        </form>
        <div className={styles.separator}>
          <span>Or continue with</span>
        </div>
        <div className={styles.links}>
          <AuthButton loading={loading} onClick={handleLoginWithGoogle}>
            Google
          </AuthButton>
        </div>
      </div>
    </div>
  );
}
