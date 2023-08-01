import { useContext, useEffect,useState } from "react"
import jwtDecoder from 'jwt-decode'

const useDecode  = ()=>{
 const token = localStorage.getItem("ExperiedToken")
 const decodeData = jwtDecoder(token)
 //console.log(decodeData.userdata[0])
 if(decodeData) return decodeData.userdata[0];
}


export default useDecode;