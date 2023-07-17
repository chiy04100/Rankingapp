import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from '@/pages/auth/authcontext';
import Router from 'next/router';

function EditUser() {
  const router = useRouter();
  
  const { userName } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const { id } = router.query;
  const [username, setUsername] = useState(userName);

  useEffect(() => {
    if (id) {
      fetchUserDetail(id);
    }
  }, [id]);

  const fetchUserDetail = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUser(response.data);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/users/${id}`, {
        username,
      });
      setUser(response.data);
      router.back();
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
