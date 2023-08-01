import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import {Box} from "@mui/material"
import Card from '@mui/material/Card';
import { useState,useEffect } from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars-2';
import Header from '../Header'

function RecipeReviewCard() {
  const [postData, setPostData] = useState("");
  const [searchparams] = useSearchParams()
  const id = searchparams.get("recipeid")
 
  useEffect(()=>{
    const getRecipe = async ()=>{
      try{
        const Result = await axios.get(`${process.env.REACT_APP_BACKENDURL}/userPost/${id}`)
        setPostData(Result.data.Result[0])
      }
      catch(error){
        console.log(error)
      }
    }
    getRecipe();
  },[])

  return (
     <>
     <Box style={{height:"100vh",display:"grid",gridTemplateRows:"10% 90%"}}>
     <Box>
      <Header/>
     </Box>
     <Scrollbars>
    <Box style={{background:"white",paddingTop:"20px"}}>
    <Card sx={{ maxWidth: 600,margin:"auto",background:"#242124",color:"white",border:"2px solid gray"}}>
      <CardMedia
        component="img"
        height="250"
        image={postData.img}
        alt="Paella dish"
      />
      <CardContent style={{fontFamily:"san",textAlign:"center"}}>
        <Typography variant="body2" color="white" fontSize={24} fontWeight={600} >
          {postData.title}
        </Typography>
      </CardContent>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        title={postData?.users?.username}
      />
      <CardContent style={{borderBottom:"1px solid gray",margin:"10px",fontFamily:"san"}}>
        <Typography variant="body2" color="white" fontSize={14} >
          {postData.aboutRecipe}
        </Typography>
      </CardContent>
      <CardContent style={{borderBottom:"1px solid gray",margin:"10px"}}>
         <Typography>
          Ingredients:
         </Typography>
         <ul>
          {
            postData?.ingridents?.map((ele)=>{
              return(
                <>
                 <li style={{borderBottom:"1px dashed",margin:"5px 0px",fontSize:"14px"}}>{ele}</li>
                </>
              )
            })
          }
         </ul>
      </CardContent>
      <CardContent style={{margin:"10px"}}>
          <Typography paragraph>Method:</Typography>
          <ol>
          {
            postData?.method?.map((ele)=>{
              return(
                <>
                  <li>
            <Typography paragraph style={{fontSize:"14px"}}>
             {ele}
          </Typography>
            </li>
                </>
              )
            })
          }
          </ol>
        </CardContent>
    </Card>
    </Box>
    </Scrollbars>
    </Box>
    </>
  );
}

export default RecipeReviewCard;