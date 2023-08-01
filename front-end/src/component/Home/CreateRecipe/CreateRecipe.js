import * as React from 'react';
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {Box,TextField,Button} from "@mui/material"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Scrollbars from 'react-custom-scrollbars-2';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useDecode from '../../CommanUtils/jwtdecode';
import axios from 'axios';
import {storage} from "../../../firebase/index"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import Header from '../Header';

function CreateRecipe() {
  const [ingridents, setingridents] = useState([""])
  const [method, setMethod] = useState([""]);
  const [aboutRecipe,setAboutRecipe] = useState("")
  const [recipeName,setRecipeName] = useState("")
  const [image,setImage] = useState("")
  const [uploadedImage,setUploadedImage] = useState("")
  const tokendata = useDecode();
  const Navigator = useNavigate();
   
  
  useEffect(()=>{
      if(image){
      const imageRef = ref(storage,`image/${image.name}`);
      uploadBytes(imageRef,image).then(()=>{
        getDownloadURL(imageRef).then((url)=>{
             setUploadedImage(url)
        })
      })
      }
  },[image])


  const increaseIngridents = ()=>{
       setingridents([...ingridents,""])
  }

  const  takeIngrident = (e)=>{
       const Result = [...ingridents]
       Result[e.target.id] = e.target.value
       setingridents(Result)
  }


 const deleteIngredent = (e)=>{
      const Result = [...ingridents] 
      Result.splice(e.target.id,1)
      console.log(Result)
      setingridents(Result)
 }

 const increaseMethod = ()=>{
  setMethod([...method,""])
}

const  takeMethod = (e)=>{
  const Result = [...method]
  Result[e.target.id] = e.target.value
  setMethod(Result)
}


const deleteMethod = (e)=>{
 const Result = [...method] 
 Result.splice(e.target.id,1)
 console.log(Result)
 setMethod(Result)
}

const takeAboutRecipe = (e)=>{
 // console.log(e)
  setAboutRecipe(e.target.value)
}

const uploadRecipe = async()=>{
        try{
          const Responce = await axios.post(`${process.env.REACT_APP_BACKENDURL}/userData`,{
            recipeName,
            aboutRecipe,
            ingridents,
            method,
            image:uploadedImage,
            users:tokendata._id
          })
          Navigator("/")
        }
        catch(error){

        }
 }



  return (
     <>
     <Header/>
     <Box style={{height:"100vh",display:"grid",gridTemplateRows:"100%"}}>
     <Scrollbars>
    <Box style={{background:"white",paddingTop:"20px"}}>
    <Card sx={{ maxWidth: 600,margin:"auto",background:"#242124",color:"white",border:"2px solid gray"}}>
      <CardMedia
        component="img"
        height="250"
        image={uploadedImage}
        alt="Upload image......."
      />
       <CardContent style={{float:"right"}}>
       <label htmlFor="upload-photo">
  <input
    style={{ display: 'none' }}
    id="upload-photo"
    name="upload-photo"
    type="file"
    onChange={(e)=>{setImage(e.target.files[0])}}
  />
   <AddPhotoAlternateIcon/>
</label>
       </CardContent>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
          </Avatar>
        }
        title="Upload Pictures of your Dish"
      />
      <CardContent style={{borderBottom:"1px solid gray",margin:"10px",fontFamily:"san"}}>
      <Typography>
        Recipe Name:
         </Typography>
        <TextareaAutosize style={{width:"95%",outline:"none",background:"#242124",color:"white",border:"none",marginTop:"2px",marginLeft:"20px",borderBottom:"1px solid gray",paddingLeft:"10px"}} onChange={(e)=>{setRecipeName(e.target.value)}}/>
      </CardContent>
      <CardContent style={{borderBottom:"1px solid gray",margin:"10px",fontFamily:"san"}}>
      <Typography>
          About Recipe:
         </Typography>
        <TextareaAutosize style={{width:"95%",outline:"none",background:"#242124",color:"white",border:"none",marginTop:"2px",marginLeft:"20px",borderBottom:"1px solid gray"}} onChange={(e)=>{takeAboutRecipe(e)}}/>
      </CardContent>
      <CardContent style={{borderBottom:"1px solid gray",margin:"10px"}}>
         <Typography>
          Ingredients:
         </Typography>
         <ul>
         {
            ingridents.map((ele,index)=>{
                return(
                 <>
                <li style={{borderBottom:"1px solid gray",margin:"5px 0px",fontSize:"14px",listStyle:"none",margin:"5px"}}>
                <input type="text" id={index} value={ele} style={{width:"95%",maxLength:"65",outline:"none",background:"#242124",color:"white",border:"none",fontSize:"14px"}}  onChange={(e)=>{takeIngrident(e)}}/>
                  <MoreHorizIcon id={index} onClick={deleteIngredent}/>
                 </li>
                 </>)
            })
         }
         </ul>
         <Button onClick={increaseIngridents} style={{color:"white",margin:"0% 40%",fontSize:"12px"}}>+Ingrident</Button>
      </CardContent>
      <CardContent style={{margin:"10px",borderBottom:"1px solid gray"}}>
          <Typography paragraph>Method:</Typography>
          <ol>
         {
            method.map((ele,index)=>{
                return(
                 <>
                <li style={{borderBottom:"1px solid gray",margin:"5px 0px",fontSize:"14px",listStyle:"none",margin:"5px"}}>
                <TextareaAutosize id={index} value={ele} style={{width:"95%",outline:"none",background:"#242124",color:"white",marginTop:"2px",border:"none",fontSize:"14px"}} onChange={(e)=>{takeMethod(e)}}/>
                <MoreHorizIcon id={index} onClick={deleteMethod}/>
                 </li>
                 </>)
            })
         }
          </ol>
          <Button variant="text" onClick={increaseMethod} style={{color:"white",margin:"0% 43%",fontSize:"12px"}}>+Method</Button>
        </CardContent>
        <CardContent>
        <Button variant="outlined" style={{margin:"0% 45%",borderColor:"orange",color:"orange",border:"2px solid"}} onClick={uploadRecipe}><b>Save</b></Button>
        </CardContent>
    </Card>
    </Box>
    </Scrollbars>
    </Box>
    </>
  );
}

export default CreateRecipe;