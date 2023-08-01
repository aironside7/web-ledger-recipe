import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { userData } from "../CommanUtils/Context";
import { useNavigate, Link } from 'react-router-dom';
import { Validation } from "./Validation";
import './login.css'

const Login = ({ auth }) => {
  const Navigator = useNavigate();
  const { setUserDetials, setToken } = useContext(userData);
  const [toggleInput, setToggleInput] = useState('false')
  const [Errorobj, setErrorObj] = useState({
    password: "",
    email: "",
    username: "",
    name: "",
    UsernameExist: "",
    EmailExist: ""
  })
  
  const[loginError,setLoginError] = useState(false)


  const [registrationData, setRegistationData] = useState({
    name: "",
    username: "",
    password: "",
    email: ""
  })

  const [logginData, setLoginData] = useState({
    username: "",
    password: ""
  })


  useEffect(()=>{
   const token = localStorage.getItem('ExperiedToken')
   if(token){
    auth('true')
  Navigator("/")
   }
  },[])


  const toggle = () => {
    if (toggleInput == 'true') {
      setToggleInput('flase')
    }
    else {
      setToggleInput('true')
    }
  }

  const Register = (e) => {
    setRegistationData((previous) => {
      return { ...previous, [e.target.name]: e.target.value }
    })
    setErrorObj({
      password: "",
      email: "",
      username: "",
      name: "",
      UsernameExist: "",
      EmailExist: ""
    })
  }

  const sendRegisterData = async () => {
    try {
      const Result = await axios.post(`${process.env.REACT_APP_BACKENDURL}/Register`, registrationData)
      setToggleInput('false')
    }
    catch (error) {
      let errorValue = (Validation(error))
      setErrorObj((previous) => {
        return { ...previous, [errorValue]: "true" }
      })
    }
  }

  const userLoginData = (e) => {
    setLoginData((previous) => {
      return { ...previous, [e.target.name]: e.target.value }
    })
    setLoginError(false)
  }

  const sendLoginData = async () => {
    try {
      const Responce = await axios.post(`${process.env.REACT_APP_BACKENDURL}/login`, logginData)
      if (Responce.data.token) {
        auth('true')
        localStorage.setItem('ExperiedToken', Responce.data.token);
        setToken(Responce.data.token)
      }
      setUserDetials({ username: Responce.data.userdata[0].username, _id: Responce.data.userdata[0]._id, name: Responce.data.userdata[0].name, img: Responce.data.userdata[0].profileimg })
      Navigator('/');
    }
    catch (error) {
      setLoginError(true)
    }
  }


  return (
    <>

      {
        toggleInput === 'true' ?
          <div className="maincard" >
            <div>Recipe App</div>
            <input type="text" name="name" class="form-control" placeholder="Name" onChange={(e) => { Register(e) }} style={{ borderColor: "rgb(216, 208, 208)" }} />
            {Errorobj.name ? <p style={{ fontSize: "10px", color: "red",float:"left"}}>Name should be alphabets only</p> : ""}
            <input type="text" name="username" class="form-control" placeholder="Username" onChange={(e) => { Register(e) }} style={{ borderColor: "rgb(216, 208, 208)" }} />
            {Errorobj.username ? <p style={{ fontSize: "10px", color: "red",float:"left" }}>Username must be contain at least one numarical value</p> : ""}
            {Errorobj.UsernameExist ? <p style={{ fontSize: "10px", color: "red",float:"left" }}>Username alrady exist</p> : ""}
            <input type="text" name="password" class="form-control" placeholder="Password" onChange={(e) => { Register(e) }} style={{ borderColor: "rgb(216, 208, 208)" }} />
            {Errorobj.password ? <p style={{ fontSize: "10px", color: "red",float:"left" }}>Passward must be 8 charactor long</p> : ""}
            <input type="email" name="email" class="form-control" placeholder="Email" onChange={(e) => { Register(e) }} style={{ borderColor: "rgb(216, 208, 208)" }} />
            {Errorobj.email ? <p style={{ fontSize: "10px", color: "red",float:"left" }}>Invalid EmailID</p> : ""}
            {Errorobj.EmailExist ? <p style={{ fontSize: "10px", color: "red",float:"left" }}>Email ID alrady exist</p> : ""}
            <button class="btn btn-primary" onClick={sendRegisterData}>Register</button>
            <p style={{ margin: "auto", fontSize: "16px" }}>OR</p>
            <button class="btn btn-outline-primary" style={{ width: "80%", height: "15%", margin: "auto", border: "none", textDecoration: "none", fontSize: "18px", color: "#4267B2", background: "none" }} onClick={toggle}>Login</button>
          </div> :
          <div className="maincard" >
            <div>Recipe App</div>
            <input type="text" name="username" class="form-control" placeholder="Username" onChange={(e) => { userLoginData(e) }} style={{ borderColor: "rgb(216, 208, 208)" }} />
            <input type="text" name="password" class="form-control" placeholder="Password" onChange={(e) => { userLoginData(e) }} style={{ borderColor: "rgb(216, 208, 208)" }} />
            {loginError? <p style={{ fontSize: "10px", color: "red",float:"left" }}>Invalid Usernmae or Password</p> : ""}
            <button class="btn btn-primary" style={{ width: "80%", height: "20%", margin: "auto", fontWeight: "400", marginTop: "15px" }} onClick={sendLoginData}>Login</button>
            <p style={{ margin: "auto", fontSize: "16px", marginTop: "5px" }}>OR</p>
            <Link to="/forgetpassward" style={{ textDecoration: "none", margin: "auto", width: "28%" }}><p className="forgetpassowrd" style={{ color: "rgb(100, 94, 94)", fontSize: "16px", fontWeight: "400" }}>Forget Passward?</p></Link>
            <button class="btn btn-outline-primary" style={{ width: "80%", height: "15%", border: "none", textDecoration: "none", fontSize: "18px", color: "#4267B2", background: "none", margin: "auto", fontWeight: "600" }} onClick={toggle}>Sign up</button>
          </div>
      }
    </>

  )
}

export default Login