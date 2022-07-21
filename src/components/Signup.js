import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {


  let navigate= useNavigate()
  const [credentials,setcredentials]= useState({name:"",email: "", password:"", cpassword:""});
   
  const handleOnsubmit= async (e)=>{

           e.preventDefault();
           const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST', 
            
            headers: {
              'Content-Type': 'application/json',
              
              
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password })
  });
  const json= await response.json();
  console.log(json);

  if(json.success){
     localStorage.setItem('token', json.jwtData)
     navigate('/')
  }
  else{
    alert("Invalid Credentials")
  }
}
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div classname="container">
      <form onSubmit={handleOnsubmit}>
  <div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onchange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={onchange} id="password"/>
  </div>
  <div className="mb-3">
    <label for="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" onChange={onchange} id="cpassword"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
