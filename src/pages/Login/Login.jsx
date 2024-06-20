import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { signin, signup, logout } from '../../firebase.js'
import netfliex_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In")
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const submitHandler = async (e) => {

    e.preventDefault()
    setLoading(true)
    if (signState == 'Sign In') {
      await signin(email, password)
    }

    else {
      await signup(name, email, password)
    }
    setLoading(false)

  }
  console.log(signState)
  return (
    loading?<div className='login-spinner'><img src={netfliex_spinner} alt="" /></div>:
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="" onSubmit={submitHandler}>
          {
            signState === "Sign Up" ? <input type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} /> : <></>
          }

          <input type="email" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {
            signState === "Sign In" ? <p>New to Netflix? <span onClick={() => { setSignState("Sign Up") }}>Sign Up Now</span></p> : <p>Already have an account ? <span onClick={() => { setSignState("Sign In") }}>Sing In Now</span></p>
          }

<p style={{textAlign:'center',marginTop:"30px"}}>Build By Swarnendu Ghosh</p>
        </div>
      </div>

      
    </div>
  )
}

export default Login