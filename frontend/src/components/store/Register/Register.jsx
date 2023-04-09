import React from 'react'

const Register = () => {
    
  return (
   <>
   <div className='registerPage'>
    <form className='registerForm'>
      <div className='formContainer'>
        <h1>Sign Up </h1>
        <p>Please fill in this form to create an account</p>
        <hr></hr>
        
        <label ><b>First Name</b></label>
        <input type='text' placeholder='Enter First Name'></input>
        <label ><b>Last Name</b></label>

        <input type='text' placeholder='Enter Last Name'></input>

        <label ><b>Date of Birth</b></label>
        <input type='date' ></input>
        <label><b>Your Image</b></label>
        <input type="file"></input>
        <label ><b>Email</b></label>
        <input type='email' placeholder='Enter Email'></input>

        <label ><b>Password</b></label>
        <input type='password' placeholder='Enter Password'></input>
      </div>
    </form>

   </div>
   
   </>
  )
}

export default Register