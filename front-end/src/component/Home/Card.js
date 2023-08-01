import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Avatar,Box} from '@mui/material';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {Link} from "react-router-dom"

 function ImgMediaCard({recipedata,like,bookMark}) {
 
  const likesPost = (e)=>{
     e.target.style.color ="red" 
     like(e.target.id)
  }
  
  const bookMarkPost = (e)=>{
    e.target.style.color = "green"
    bookMark(e.target.id)
  }

  return (
    <Card className="cardContainer" sx={{ width:"95%",background:"#242124",color:"white",border:"1px solid",borderColor:"gray",margin:"auto"}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={recipedata?.img}
      />
      <CardContent style={{paddingBottom:"0px"}}>
        <Box style={{display:"flex",flexDirection:"row",}}>
         <Box style={{display:"flex",flexDirection:"row",marginBottom:"5px",width:"50%"}}>
       <Avatar style={{width:"20px",height:"20px"}}></Avatar>
       <Typography variant="body2" style={{margin:"3px 0px 0px 10px",fontSize:"12px",}}>
       {recipedata?.users?.username}
        </Typography>
        </Box>
        <Box sx={{width:"50%",}}>
        <Typography variant="body2" sx={{float:"right",fontSize:"12px"}}>
            31-07-2023
        </Typography>
        </Box>
        </Box>
        <Typography variant="h5" component="div" sx={{textAlign:"centre",margin:"5px 0px"}}>
          <Link to={`/recipereview/?recipeid=${recipedata?._id}`} style={{textDecoration:"none",color:"white"}}>{recipedata?.title}</Link>
        </Typography>
      </CardContent>
      <CardActions sx={{float:"left",paddingLeft:"15px"}}>
        <Typography tyle={{display:"gird",gridTemplateRows:"auto auto"}}>
        <FavoriteBorderOutlinedIcon id={recipedata?._id} sx={{width:"15px"}} onClick={likesPost}/>
         <Typography>{recipedata?.likes?.length}</Typography>
        </Typography>
        <Typography tyle={{display:"gird",gridTemplateRows:"auto auto"}}>
        <BookmarksOutlinedIcon id={recipedata?._id} sx={{width:"15px"}} onClick={bookMarkPost}/>
        <Typography>{"save"}</Typography>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default ImgMediaCard;