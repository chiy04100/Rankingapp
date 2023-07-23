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
        const response = await axios.get(`http://localhost:3000/friend_requests?sender_id=${userId}&friend_status_id=1`);
        const friendList = response.data;
      
        // Fetch user details for each friend
        const promises = friendList.map(async (friend) => {
          const userResponse = await axios.get(`http://localhost:3000/users/${friend.receiver_id}`);
          return userResponse.data;
        });

        const friendUsers = await Promise.all(promises);
        setFriendList(friendUsers);
      }
    } catch (error) {
      console.error('Error fetching friend list:', error);
    }
  };  

  return (
    <div className="container py-4">
      <h2>フレンド申請</h2>
      <Link href="/">Back to Home</Link>

      {Array.isArray(friendList) && friendList.length > 0 ? (
        <ul className="list-group mt-3">
          {friendList.map((friend) => (
            <li key={friend.id} className="list-group-item d-flex justify-content-between align-items-center">
              {`Friend Name: ${friend.username}`}
              <div>
                <Link href={`/user/show/${friend.id}`}>
                  <button className="btn btn-primary">UserProfile</button>
                </Link>
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
