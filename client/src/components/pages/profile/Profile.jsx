import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import Topbar from '../../topbar/topbar'
import Sidebar from '../../sidebar/Sidebar'
import { Rightbar } from '../../rightbar/Rightbar'
import { Feed } from '../../feed/Feed'
import axios from 'axios'
import profile from '../../../assets/images/avatar.png'
import {useParams} from 'react-router'
import grey from '../../../assets/images/light-grey-background-with-triangles-qsislz2kwb00nkpz.jpg'
import { Add, Delete, Edit, PhotoCamera, Remove } from '@mui/icons-material'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export const Profile = () => {

  const [user, setUser] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);


  const UserName  = useParams().UserName;

  const {currentUser} = useContext(AuthContext)



  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const res= await axios.get(`http://localhost:7070/users/${UserName}`,{withCredentials:true})
        console.log(res)
        setUser(res.data.results)
        setUpdateSuccess(true);
      } catch (error) {
        console.log(error)
      }
  
    }
    fetchUser()
  },[UserName]);

  useEffect(() => {
    setUpdatedUser({
      First_Name: user.First_Name,
      Surname: user.Surname,
      Country: user.Country,
      Phone_Number: user.Phone_Number,
      Password: user.Password,
      BIO: user.BIO,
      Profile_Image: user.Profile_Image,
      CoverPhoto: user.CoverPhoto,
      RelationShip: user.RelationShip,
      City: user.City,
    });
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedImage) {
        const formData = new FormData();
      
        formData.append('file', selectedImage);
        formData.append('upload_preset', 'ConnectVerse'); 
        const response = await axios.post( "https://api.cloudinary.com/v1_1/dhtp4pqde/image/upload", formData);

        const newImageUrl = response.data.secure_url;

        // Update the Profile_Image property with the new image URL
        setUpdatedUser((prevUser) => ({ ...prevUser, Profile_Image: newImageUrl }));
      }

      await axios.put(`http://localhost:7070/update/${user.User_id}`, updatedUser,{withCredentials:true});
      alert('User details updated successfully');
      setUpdateOpen(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update user details');
    }
  };

const handleFormdisplay=()=>{
  setUpdateOpen(!updateOpen)
}
  

  useEffect(() => {
    // Check if the current user is following the other user on component mount
    checkIsFollowing();
  }, []);

  const checkIsFollowing = async () => {
    try {
      const response = await axios.post(
        'http://localhost:7070/users/follow',
        {
          Following_id: user.User_id ,
          Followers_id: currentUser.User_id,
        },
        { withCredentials: true }
      );

      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        // Unfollow the user
        await axios.post(
          'http://localhost:7070/users/unfollow',
          {
            Following_id: user.User_id ,
            Followers_id: currentUser.User_id,
          },
          { withCredentials: true }
        );
      } else {
        // Follow the user
        await axios.post(
          'http://localhost:7070/users/follow',
          {
            Following_id: user.User_id ,
            Followers_id: currentUser.User_id,
          },
          { withCredentials: true }
        );
      }

      // Toggle the follow status after following/unfollowing
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate= useNavigate()

  const handleDeleteAccount =async()=>{
      try {
       await  axios.delete(`http://localhost:7070/user/${currentUser.User_id}`,{withCredentials:true})
       navigate('/register')
      } catch (error) {
         console.log(error)
      }
  }


  return (
    <div> 
     <Topbar/>
    <div className="profile">
    <Sidebar/>
    <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img className='ProfileCoverImg' src={user?.CoverPhoto|| grey} alt="" />
          
          {
              user?.UserName !== currentUser.UserName &&(
                <button onClick={handleFollowClick} className='followButtton'>
                {isFollowing ? 'Unfollow' : 'Follow'}
                {isFollowing ? <Remove /> : <Add />}
             </button>
              )
            }
            {
              user?.UserName === currentUser.UserName &&(
                <p className='CoverPhoto'><PhotoCamera className='Photocamera'/>Edit Cover Photo</p>
              )
            }
          
            <img className='profileImg' src={user?.Profile_Image || profile} alt="" />
            {
              user?.UserName === currentUser.UserName &&(
                <p className='ProfilePhotoCamera'><PhotoCamera className='profilePhoto'/>Edit profile photo</p>
              )
            }
             {
              user?.UserName === currentUser.UserName &&(
                <p className='editProfile' onClick={handleFormdisplay}> <Edit className='edit'/>Update Profile</p>
              )
            }
              {
              user?.UserName === currentUser.UserName &&(
                <p className='deleteAccount' onClick={handleDeleteAccount}><Delete className='delete'/>Delete Account</p>
              )
            }
        
            
        </div>
        <div className="profileInfo">
            <h4 className='profileInfoName'>{user?.First_Name} {user?.Surname}</h4>
            <h4 className='profileInfoName'>@{user?.UserName}</h4>
          <span className='profileInfoDesc'>{user?.BIO}</span>
        </div>
        </div> 

        <hr />
        <div className='ProfileUserInformation'>
            <div className='ProfileUserinfoWrapper'>
              <h2>USER INFORMATION</h2>
              <p>First Name: <span className='infoprofile'>{user?.First_Name}</span></p>
              <p>Surname: <span className='infoprofile'>{user?.Surname}</span></p>
              <p>Country:<span className='infoprofile'>{user?.Country}</span>{user?.country}</p>
              <p>Phone Number:<span className='infoprofile'>{user?.Phone_Number}</span></p>
              <p>Bio: <span className='infoprofile'>{user?.BIO}</span></p>
              <p>City:<span className='infoprofile'>{user?.City}</span></p>
            </div>
        </div>
        <div className='userOperation'>
          <div className='useOperationWrapper'>
            <ul>
              <li>Post</li>
              <li>Photos</li>
              <li>Videos</li>
            </ul>
          </div>
        </div>
      {updateOpen &&(
            <div className='ProfileBottomCenter'>
            <div className='ProfileDetails'>
                 <div className='ProfileEditabledetails'>
                 {updateSuccess && <p>User details updated successfully!</p>}
                 <h2>Update User Information</h2>
     <form onSubmit={handleSubmit} className='formUpdateProfileDetails'>
       <input type="text" name="First_Name" placeholder='FirstName' value={updatedUser.First_Name} onChange={handleChange} />
       <input type="text" name="Surname" placeholder='Surname' value={updatedUser.Surname} onChange={handleChange} />
       <input type="text" name="country" placeholder='country' value={updatedUser.Country} onChange={handleChange} />
       <input type="text" name="Phone_Number" placeholder='Phone_Number' value={updatedUser.Phone_Number} onChange={handleChange} />
       <input type="text" name="BIO" placeholder='BIO' value={updatedUser.BIO} onChange={handleChange} />
       <label htmlFor="Profile_Image">Profile Image</label>
       <input type="file" name="Profile_Image" placeholder='Profile_Image' accept=".PNG,.JPG,.JPEG,.png, .jpg, .jpeg" onChange={handleImageChange} />
       <label htmlFor="CoverPhoto">Cover Photo</label>
       <input type="file" name="CoverPhoto" placeholder='CoverPhoto' accept=".PNG,.JPG,.JPEG,.png, .jpg, .jpeg" onChange={handleImageChange} />
       <input type="text" name="RelationShip" placeholder='RelationShip' value={updatedUser.RelationShip} onChange={handleChange} />
       <input type="text" name="City" placeholder='City' value={updatedUser.City} onChange={handleChange} />
       <button type="submit">Update</button>
     </form>
                 </div>
            </div>
       </div>
      )}
    
        <div className="profileRightBottom">
        <Feed UserName={UserName}/>
        < Rightbar user={user}/>
        </div>
    </div>
    </div>
    </div>
  )
}
