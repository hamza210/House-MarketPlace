import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

function SignUp() {
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name , email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState)=> ({
      ...prevState,
       [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth,email,password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      }) 

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users',user.uid), formDataCopy)
      toast.success('Sign Up Successfull')
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong With Registration')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome</p>
        </header>
        <form onSubmit={onSubmit}>
          <input type="text" id='name' value={name} onChange={onChange} placeholder='Name' className='nameInput' />

          <input type="email" id='email' value={email} onChange={onChange} placeholder='Email' className="emailInput" />

          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={onChange} placeholder='Password' className='passwordInput' id='password' />

            <img src={visibilityIcon} alt="show password" className='showPassword' onClick={() => setShowPassword((prevState) => !prevState )}/>
          </div>

          <Link to='/sign-in' style={{marginTop: 20}} className='forgotPasswordLink' >
            Sign In Instead
          </Link>

          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth  */}
        <OAuth />

      </div>
    </>
  )
}

export default SignUp

