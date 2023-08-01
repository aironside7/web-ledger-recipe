// import Footer from ''
 import { useState, useEffect, useContext } from 'react'
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// import Profileheader from './Profilecomponent/header';
 import UserProfileDetails from './Profilecomponent/UserProfileDetails';
// import useDecode from '../../CommanUtils/jwtdecode';



const Profile = () => {
  return (
    <>
      <div className="profileContainer">
        {/* <Profileheader /> */}
        <UserProfileDetails />
        {/* <Footer  /> */}
      </div>
    </>
  )
}

export default Profile;