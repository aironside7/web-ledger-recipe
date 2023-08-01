import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import {Box, touchRippleClasses} from "@mui/material"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Scrollbars from 'react-custom-scrollbars-2';
 import Header from '../../Header'
 import ImgMediaCard from "../../Card"
 import useDecode from '../../../CommanUtils/jwtdecode';
import axios from 'axios';

function UserProfileDetails() {
const [userPost,setUserPost] = useState([])
const [userData,setUserData] = useState([])
const [toggle,setToggle] = useState(false)
const token = useDecode()
console.log(token)

 useEffect(()=>{
     const getUsetData = async()=>{
        try{
       const Result  = await axios.get(`${process.env.REACT_APP_BACKENDURL}/getPost/${token._id}`)
       setUserPost(Result.data.Result)
       const userData  = await axios.get(`${process.env.REACT_APP_BACKENDURL}/updateddata/${token._id}`)
        setUserData(userData.data.Result)
        console.log(userData.data.Result)
        }
        catch(error){
          console.log(error)
        }
     }
     getUsetData()
 },[])

  const setTogglingDataTrue = (e)=>{
    document.getElementById("myrecipe").style.borderBottom  = "none"
      e.target.style.borderBottom  = "1px solid gray"
      setToggle(true)
  }

  const setTogglingDataFalse = (e)=>{
    document.getElementById("bookmark").style.borderBottom  = "none"
    e.target.style.borderBottom  = "1px solid gray"
    setToggle(false)
    console.log(toggle)
}



  return (
     <>
     <Box style={{height:"100vh",display:"grid",gridTemplateRows:"10% 90%"}}>
     <Box>
      <Header/>
     </Box>
     <Scrollbars>
    <Box style={{background:"black",paddingTop:"20px"}}>
    <Card className="profileCardConainer">
      <CardMedia
        component="img"
        height="350"
        image="istockphoto.jpg"
        alt="Paella dish"
      />
     <CardContent sx={{display:"grid",gridTemplateRows:"50% 50%"}}>
          <Box className="profimage">
          <Avatar src="OIP.jpg" sx={{ bgcolor: red[500],width:180,height:180,margin:"auto",marginTop:"-10%"}} aria-label="recipe"/>
          </Box>
          <Box sx={{display:"grid",gridTemplateRows:"auto auto",marginLeft:"25px"}}>
          <Box sx={{margin:"auto auto"}}>
          <Typography sx={{fontSize:"24px",fontWeight:"400"}}>
             {token.username}
          </Typography>
        </Box>
        <Box sx={{display:"grid",gridTemplateColumns:"33.33% 33.33% 33.33%",borderBottom:"1px solid gray"}}>
        <Box sx={{margin:"auto",marginTop:"20px",marginBottom:"20px"}}>
        <Typography sx={{marginLeft:"5px",fontSize:"18px",fontWeight:"400"}}>
           {userPost.length}
          </Typography>
        <Typography sx={{fontSize:"20px",fontWeight:"400"}}>
          post
          </Typography>
          </Box>
          <Box  sx={{margin:"auto",marginTop:"20px",marginBottom:"20px"}}>
          <Typography sx={{marginLeft:"22px",fontSize:"18px",fontWeight:"400"}} >
          {token?.followers?.length}
          </Typography>
          <Typography sx={{fontSize:"20px",fontWeight:"400"}}>
            Followers
          </Typography>
          </Box>
          <Box  sx={{margin:"auto",marginTop:"20px",marginBottom:"20px"}}>
          <Typography sx={{marginLeft:"18px",fontSize:"18px",fontWeight:"400"}} >
          {token?.followers?.length}
          </Typography>
          <Typography sx={{fontSize:"20px",fontWeight:"400"}}>
            Following
          </Typography>
          </Box>
        </Box>
        </Box>
     </CardContent>
     <br/>
     <br/>
     <br/>
     <CardContent sx={{display:"grid",gridTemplateColumns:"auto auto"}}>
      <Box>
      <Typography id="bookmark" sx={{textAlign:"center",fontSize:"18px"}} onClick={setTogglingDataFalse}>
        BookMarked
      </Typography>
      </Box>
      <Box>
      <Typography id="myrecipe" sx={{textAlign:"center",fontSize:"18px"}} onClick={setTogglingDataTrue}>
         MyRecipee
      </Typography>
      </Box>
     </CardContent> 
     <CardContent className="gridcontainer">
        {
          toggle? userPost?.map((ele)=>{
            console.log(ele)
                  return(
                      <>
                      <ImgMediaCard recipedata={ele}/>
                      </>
                  )
                  
              }):
              userData?.BookMark?.map((ele)=>{
                console.log(ele)
                      return(
                          <>
                          <ImgMediaCard recipedata={ele.users}/>
                          </>
                      )
                      
                  })
             
        }
      </CardContent>
    </Card>
    </Box>
    </Scrollbars>
    </Box>
    </>
  );
}

export default UserProfileDetails;