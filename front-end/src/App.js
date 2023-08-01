import Login from "./component/login/loginpage"
import {Routes,BrowserRouter, Route, Outlet, Navigate} from 'react-router-dom'
import Post from './component/Home/Post/Postpage'
import {useState,lazy,Suspense} from 'react';
import Context from './component/CommanUtils/Context'
import RecipeReviewCard from "./component/Home/RecipeReview/RecipeReviewCard";
import Profile from './component/Home/Profile/profile'
// import SetProfile from "./component/Home/Profile/SetProfile/SetProfile";
// import Comment from './component/Home/Post/Comment/Comment'
 import ForgetPassward from './component/ForgetPassword/forgetPassward'
// import ChatPage from  './component/Home/Chat/Chatpage'
// import FollowingsProfilePag from './component/Home/Follow/ProfilePage'
import './App.css';
// import ShowFollowers from "./component/Home/FollowComponent/showFollowers";
// import ShowFollowing from "./component/Home/FollowComponent/ShowFollowing";
import Home from './component/Home/homepageComponent/homepage'
import CreateRecipe from "./component/Home/CreateRecipe/CreateRecipe";
console.log(Home)
function App() {
   
   const PrivateRoute = ({auth, ...props})=>{
    return auth?
    <>
    <Outlet/>
    </> :
    <>
    <Navigate replace to="/login"/>
    </>
    }

const [post,setPost] = useState('')
const [auth,setAuth] = useState('')

  return (
    <>
    <Context>
     <BrowserRouter>
     <Routes>
     <Route path="/login" element={<Login auth={setAuth}/>}/>
     <Route path="/forgetpassward" element={<ForgetPassward auth={setAuth}/>}/>
     <Route path="/" element={<PrivateRoute auth={auth}/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/recipereview" element={<RecipeReviewCard/>}/>
      <Route path="/createrecipe" element={<CreateRecipe/>}/>
      <Route path="/profile" element={<Profile/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
    </Context>
    </>
  );
}


export default App;
