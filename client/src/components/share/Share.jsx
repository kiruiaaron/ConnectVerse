import React, { useContext, useRef, useState } from 'react';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material';
import './share.css';
import { AuthContext } from '../../context/AuthContext';
import profile from '../../assets/images/avatar.png';
import axios from 'axios';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

const Share = () => {
  const { currentUser } = useContext(AuthContext);

  const [fileInputState, setFileInputState] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [Written_text, setWrittenText] = useState('');
  const [User_id, setUserId] = useState(currentUser.User_Id); // Set User_id initially

  const cloudName = 'dhtp4pqde'; // Replace with your Cloudinary cloud name
  const uploadPreset = 'ConnectVerse';

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', uploadPreset);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      // return response.data.url;
      console.log(response.data.secure_url);
      return response.data.secure_url; // Return the secure_url from Cloudinary response
    } catch (error) {
      console.error('Error uploading image: ', error);
      return null;
    }
  };

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    const Image_url = await uploadImage();

    const newPost = {
      User_id,
      Written_text,
      Image_url: Image_url,
    };

    try {
      await axios.post('http://localhost:8000/posts/insert', newPost, { withCredentials: true });
      window.location.reload();
    } catch (error) {
      console.error('Error posting new post: ', error);
    }
  };

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className='shareProfileImg' src={currentUser?.Profile_Image || profile} alt="" />
          <input
            type="text"
            placeholder={`What's in your mind ${currentUser?.UserName} ?`}
            className='shareInput'
            value={Written_text}
            onChange={(e) => setWrittenText(e.target.value)}
          />
        </div>
        <hr className='shareHr' />
        {previewSource && (
          <div className='previewSource'>
            <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
            <Cancel className='shareCancelling' onClick={() => setPreviewSource(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={handleShareSubmit}>
          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'> Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id='file'
                value={fileInputState}
                accept='.png,.jpeg,.jpg'
                onChange={handleFileInputChange}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'> Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'> Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'> Feelings</span>
            </div>
          </div>
          <button className='shareButton' type='submit'>Share</button>
        </form>
      </div>
    </div>
  );
};

export default Share;
