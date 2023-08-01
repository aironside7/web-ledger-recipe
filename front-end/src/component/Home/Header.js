import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Box,Typography} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import WestIcon from '@mui/icons-material/West';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Header() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{background:"#242124"}}>
        <Toolbar>
        <Link to="/" style={{textDecoration:"none",color:"white"}}><IconButton
              size="large"
              aria-label="show more"
              aria-controls={""}
              aria-haspopup="true"
              onClick={""}
              color="inherit"
            >
          < WestIcon/>
             <Typography fontSize={20} fontWeight={600} marginLeft={1}> Direct</Typography>
            </IconButton></Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
            <BookmarkBorderIcon/>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={""}
              aria-haspopup="true"
              onClick={""}
              color="inherit"
            >
              <AddAPhotoIcon/>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
            <MoreVertIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header ;