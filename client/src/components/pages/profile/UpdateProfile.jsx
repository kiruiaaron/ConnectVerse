import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    First_Name: '',
    Surname: '',
    country: '',
    Phone_Number: '',
    Password: '',
    Bio: '',
    Profile_Image: '',
    CoverPhoto: '',
    RelationShip: '',
    City: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { User_id } = formData; // Assuming you have the user ID stored somewhere

    try {
      const res = await axios.put(`http://localhost:8000/users/${User_id}`, formData);
      console.log(res.data);
      // Do something with the response, show success message, etc.
    } catch (error) {
      console.error(error);
      // Handle errors, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Update User Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each user information */}
        <input type="text" name="First_Name" placeholder='FirstName' value={formData.First_Name} onChange={handleChange} />
        <input type="text" name="Surname" placeholder='Surname' value={formData.Surname} onChange={handleChange} />
        {/* Add other input fields for the remaining user information */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
