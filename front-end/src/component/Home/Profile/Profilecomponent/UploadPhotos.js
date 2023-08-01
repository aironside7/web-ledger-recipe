import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useDecode from '../../../CommanUtils/jwtdecode';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const UploadPhotos =({photos,setdeletePhostStatus})=>{
 const userDetails = useDecode()
 
 const deletePost = (e)=>{
  console.log(e.target.id)
  setdeletePhostStatus(e.target.id)
 }

    return(
        <>
        <div style={{margin:"auto",width:"97%",display:"grid",gridTemplateColumns:"25% 25% 25% 25%",backgroundColor:"white"}}>
         {
          photos ? 
          photos.map((element)=>{
            {console.log(element)}
            return(
               <>
               <div class="col"style={{marginTop:"10px",marginRight:"5px",textAlign:"center"}}>
               <img src={`${element.img}`} style={{width:"100%",height:"100%"}} />
                { (element.users==userDetails._id)?<div className='deleteIcon'>
                 <Popup trigger={<MoreVertIcon style={{color:"white"}}/>} modal nested>
                 <img src={`${element.img}`} style={{width:"100%"}} />
                 <Popup trigger={<MoreHorizIcon fontSize="medium" style={{position:"absolute",right:"10px",color:"white"}}/>}  nested>
                  <div className='actions'>
                  <Popup trigger={<p style={{width:"100px",marginLeft:"70px",color:"red",fontWeight:"600"}}>Delete</p>}><p id={element._id} style={{marginLeft:"50px",fontWeight:"600"}} onClick={deletePost}>Delete Post?</p>
                  <p style={{textAlign:"centre"}}>Are you sure you want to delete this post?</p>
                  <p id={element._id} style={{marginLeft:"70px",color:"red"}} onClick={deletePost}>Delete</p>
                  </Popup>
                  </div>
                 </Popup>
                 </Popup>
                 </div>:""
          }
               </div>
               </>
             
            )
          }) :
          <div></div>
         }
       </div>
        </>
    )
}

export default UploadPhotos;