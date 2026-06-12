// src/App.jsx
import { useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleSubmit(e) {
    e.preventDefault()
    console.log("Submitted details -- ");
    
    const payload = {
      "name": name,
      "email": email,
      "password": password
    }
    
    console.log(payload)

    const response = await fetch(`${import.meta.env.REACT_VITE_BACKEND_URL}/users/register`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (response.status == 201) {
      alert("User created")
    }else{
      alert("Error Occurred: "+response.json().message)
    }
  }
  
  return (
    <section id="center">
      {/* Form to register using name, email, password */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh"
      }}>
        <div className="container">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Join our community today</p>
            </div>
            <form className="registration-form">
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type="submit" className="submit-btn" onClick={handleSubmit}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e){
    e.preventDefault()
    console.log("Submitted details -- ");
    
    const payload = {
      "email": email,
      "password": password
    }
    
    console.log(payload)

    const response = await fetch("http://localhost:5000/users/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (response.status == 200) {
      alert("User Login Successfull!")
      const res_json = response.json()
      console.log(res_json);
      // Save token from res_json to cookies
      res_json.then(data => {
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      });
      
    }else{
      alert("Error Occurred: "+response.json().message)
    }
  }

  return (
    <section id="center">
      {/* Form to register using name, email, password */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh"
      }}>
        <div className="container">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Login</h2>
              <p>Use your email and password to login</p>
            </div>
            <form className="registration-form">
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type="submit" className="submit-btn" onClick={handleLogin} >Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


function Products() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Products Page</h2>
      <p>Browse our products here.</p>
    </div>
  )
}

function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', justifyContent: 'center', background: '#f5f5f5' }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  )
}

export default App

