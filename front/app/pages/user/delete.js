import React from 'react';
import axios from 'axios';

function DeleteUser({ userId }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
}

export default DeleteUser;
