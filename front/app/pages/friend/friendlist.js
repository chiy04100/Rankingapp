import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/authcontext';
import Link from 'next/link';


const FriendListPage = () => {
  const { userId } = useContext(AuthContext);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    fetchFriendList();
  }, [userId]);

  const fetchFriendList = async () => {
    try {
      if (userId) {
        const sentRequests = await fetchSentFriendRequests(userId);
        const receivedRequests = await fetchReceivedFriendRequests(userId);

        console.log('Received sentRequests:', sentRequests);
        console.log('Received receivedRequests:', receivedRequests);
  
        if (!Array.isArray(sentRequests) || !Array.isArray(receivedRequests)) {
          console.error('Received non-array data for friend requests.');
          return;
        }
  
        const allPromises = [
          ...sentRequests.map(async (request) => {
            const userResponse = await axios.get(`http://localhost:3000/users/${request.receiver_id}`);
            return userResponse.data;
          }),
          ...receivedRequests.map(async (request) => {
            const userResponse = await axios.get(`http://localhost:3000/users/${request.sender_id}`);
            return userResponse.data;
          }),
        ];
  
        const friendUsers = await Promise.all(allPromises);
  
        const uniqueFriendUsers = friendUsers.reduce((acc, user) => {
          if (!acc.some((existingUser) => existingUser.id === user.id)) {
            acc.push(user);
          }
          return acc;
        }, []);
  
        setFriendList(uniqueFriendUsers);
      }
    } catch (error) {
      console.error('Error fetching friend list:', error);
    }
  };

  const fetchSentFriendRequests = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/friend_requests?sender_id=${userId}&friend_status_id=2`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching sent friend requests:', error);
      return [];
    }
  };

  const fetchReceivedFriendRequests = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/friendships`, {
      params: {
        receiver_id: userId,
        friend_status_id: 2,
      },
    });
    console.log('Received receivedRequests:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching received friend requests:', error);
    return [];
  }
};

  return (
    <div className="container py-4">
      <h2>Friend List</h2>
      <Link href="/">Back to Home</Link>

      {Array.isArray(friendList) && friendList.length > 0 ? (
        <ul className="list-group mt-3">
          {friendList.map((friend) => (
            <li key={friend.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>{`Friend Name: ${friend.username}`}</div>
                <div>
                  <Link href={`/user/show/${friend.id}`}>
                    <button className="btn btn-primary">UserProfile</button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3">No friends found.</p>
      )}
    </div>
  );
};

export default FriendListPage;
