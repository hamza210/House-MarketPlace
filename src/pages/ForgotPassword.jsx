import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email,setEmail] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success('Reset Email Sent')
      
    } catch (error) {
      toast.error('Could Not send Email')
    }
  }

  const onChange = e => setEmail(e.target.value)

  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className='emailInput' onChange={onChange} placeholder='Email' value={email} id="email" />

          <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
              <button className="signInButton">
                <ArrowRightIcon fill='#ffffff' height='34px' width='34px' />
              </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
