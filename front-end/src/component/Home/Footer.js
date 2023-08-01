import { AppBar,Toolbar,Typography,Card,CardHeader,Avatar,red,IconButton,CardMedia,CardContent,CardAction,} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Link } from 'react-router-dom'


const Footer = ()=>{ 
    return(
     <>
   <footer>
        <AppBar position='static' width={'100%'}>
        <Toolbar  style={{backgroundColor:"black",display:"flex",flexDirection:"row"}}>
        <div style={{color:"black",width:"40%",}}>
       <Link to="/"><HomeIcon style={{color:"white"}}/></Link>
        </div>
        <div style={{width:"40%"}}> 
       <SearchIcon style={{marginLeft:"10%"}}/>
       </div>
       <div class="form-group" style={{width:"40%"}}>
       <Link to="/createrecipe" style={{marginLeft:"40%"}}><AddBoxIcon style={{color:"white"}}/></Link>
        </div>
        <div style={{width:"40%",float:"right",marginLeft:""}}>
        <MovieIcon style={{marginLeft:"70%"}}/>
        </div>
        <div  style={{width:"40%",float:"right"}}>
       <Link to={`/Profile`}><PersonIcon style={{marginLeft:"80%",color:"white"}}/></Link>
        </div>
        </Toolbar>
         </AppBar>
        </footer>
</>
    )
}

export default Footer;