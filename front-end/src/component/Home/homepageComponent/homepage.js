import React from "react";
import {useState,useEffect,useContext} from 'react'
import {Outlet, useNavigate}  from 'react-router-dom'
import PrimarySearchAppBar from "./Homecomponent/header"
import useDecode from '../../CommanUtils/jwtdecode';
import axios from 'axios'
//import './home.css'
import HeroPage from "./Homecomponent/HeroPage";
import Footer from "../Footer"

 

const Home = ()=>{ 
 return(
      <>
      <div class="container-xxl" style={{width:"100%"}}>
        <div>
       <PrimarySearchAppBar/>
       </div>
       <div>
        <HeroPage/>
       </div>
       <div>
        <Footer/>
       </div>
       </div>
        </>
    )
}

export default Home;