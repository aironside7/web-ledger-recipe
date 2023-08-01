import { Button, Card } from "@mui/material";
import { useEffect,useState,useContext} from "react";
import { userData } from "../../../CommanUtils/Context";
import Scrollbars from "react-custom-scrollbars-2";
import ImgMediaCard from "../../Card"
import axios from "axios"
import useDecode from "../../../CommanUtils/jwtdecode";


const HeroPage = ()=>{
    const [showRecipe,setShowRecipe] = useState([])
    const [storeAllRecipeData,setStoreAllRecipeData] = useState([])
    const [like,setLike] = useState("")
    const [bookMark,setBookMark] = useState("")
    const {takeSearchBarInput} = useContext(userData)
    const token = useDecode();
    
     


    useEffect(()=>{ 
        const searchedRecipeData = async()=>{
          if(takeSearchBarInput){
          try{
            const Result  = await axios.post(`${process.env.REACT_APP_BACKENDURL}/getSearchedValue`,{char:takeSearchBarInput})
           
              setShowRecipe(Result.data.Result)
            
          }
          catch(error){
           console.log(error)
          }
      }
      else{
        setShowRecipe(storeAllRecipeData)
      }
    }
       searchedRecipeData()
    },[takeSearchBarInput])

     useEffect(()=>{
        const RecipeData  = async()=>{
              try{
              const Result = await axios.get(`${process.env.REACT_APP_BACKENDURL}/getAllPost`)
              const ReverseResult = Result.data.Result.reverse()
              setShowRecipe(ReverseResult)
              setStoreAllRecipeData(ReverseResult)
              }
              catch(error){
                console.log(error)
              }
        }
       RecipeData()
    },[])

    useEffect(()=>{
      const bookMarks  = async()=>{
            try{
              console.log("hello")
              if(bookMark){
                  const Result = await axios.patch(`${process.env.REACT_APP_BACKENDURL}/updatedata/bookmarkpost/${token._id}`,{
                    users:bookMark
                  })
                  
                  console.log(Result)
                  setBookMark("")
              }
            }
            catch(error){
              console.log(error)
            }
      }
     bookMarks()
  },[bookMark])
 
    
    useEffect(()=>{
        const likes  = async()=>{
              try{
                if(like){
                    const Result = await axios.patch(`${process.env.REACT_APP_BACKENDURL}/updateddata/addlike/${like}`)
                    setShowRecipe(Result.data.Result)
                    console.log(Result)
                    setLike("")
                }
              }
              catch(error){
                console.log(error)
              }
        }
       likes()
    },[like])


    return(
        <>
        <div style={{backgroundColor:"black",width:"100%",height:"100%"}}>
        <Scrollbars>
        <div className="gridcontainer">
         {
            showRecipe.map((ele)=>{
                return(
                    <>
                    <ImgMediaCard recipedata={ele} like={setLike} bookMark={setBookMark}/>
                    </>
                )
                
            })
         }
        </div>
        </Scrollbars>
        </div>
        </>
    )

}

export default HeroPage;