import { useState,useContext} from "react";
import axios from 'axios';
import {userData} from "../CommanUtils/Context";
import {useNavigate,Link} from 'react-router-dom'
import './paword.css'


const ForgetPassward = ({auth})=>{ 
    const Navigator = useNavigate();
    const {setUserDetials} = useContext(userData);
    const [toggleInput,setToggleInput] = useState('false')
    const [input,setInput] = useState('');
    const [responce,setresponce] = useState("")
    console.log(responce)
    const [UserData,setUserData]=useState({
        username:"",
        Passward:"",
        ConfirmPassward:"",
        email:""
    })
         
     const Register = (e)=>{ 
      setUserData((previous)=>{
       return{...previous,[e.target.name]:e.target.value}
      })
     }

     const sendRegisterData = async()=>{
           try{
             const Responce = await axios.patch(`${process.env.REACT_APP_BACKENDURL}/forgetPassward`,UserData)
            setToggleInput('false')
            Navigator('/login')
           }
           catch(error){
             alert('Please Check Confrim-Password and Password again')
           }
           
     }
        
     const userfrData = (e)=>{
      console.log(e.target.value)
       setUserData((previous)=>{
       return {...previous,[e.target.name]:e.target.value}
       })
       console.log(UserData)
     }
     
     const sendUserData = async()=>{
       try{
         const Responce = await axios.post(`${process.env.REACT_APP_BACKENDURL}/forgetPassward?username=${UserData.username}&email=${UserData.email}`)
          if(Responce){
            setresponce(Responce.data.Result)
           setToggleInput('true')
         }

       }
       catch(error){
          alert("Invalid Username or Email")
       }
     }


   return(
     <>
     {

toggleInput === 'true' ?
<div className="card">
<div style={{fontSize:"30px",fontStyle:"italic",margin:"auto",fontWeight:"600"}}>Mam's Recipe</div>
       <input type="text" value={UserData.Passward} name="Passward" class="form-control" placeholder="passward" onChange={(e)=>{Register(e)}}/>
       <input type="text" value={UserData.ConfirmPassward} name="ConfirmPassward" class="form-control" placeholder="ConfirmPassward" onChange={(e)=>{Register(e)}}/>
       <button  class="btn btn-primary" onClick={sendRegisterData} style={{width:"80%",height:"20%",margin:"10px 55px 10px 55px",fontWeight:"400",backgroundColor:"#5B51D8"}}>Submit</button>
</div> :
<div className="card" >
<div style={{fontSize:"30px",fontStyle:"italic",margin:"auto",fontWeight:"600"}}>Mam's Recipe</div>
<input type="text" value={UserData.username} name="username" class="form-control" placeholder="username" onChange={(e)=>{userfrData(e)}}/>
<input type="text" value={UserData.email} name="email" class="form-control" placeholder="email" onChange={(e)=>{userfrData(e)}}/>
<button  class="btn btn-primary" style={{width:"80%",height:"20%",margin:"10px 55px 10px 55px",fontWeight:"400",backgroundColor:"#5B51D8" }} onClick={sendUserData}>Submit</button>
</div>
}
</> 
) 
}

export default  ForgetPassward;



