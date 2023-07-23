import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { AuthContext } from '../auth/authcontext';

const FriendshipRequests = () => {
  const { userId } = useContext(AuthContext);
  const [friendshipRequests, setFriendshipRequests] = useState([]);

  useEffect(() => {
    fetchFriendshipRequests();
  }, [userId]); // Add userId to the dependency array to fetch requests when the userId changes

  const fetchFriendshipRequests = async () => {
    try {
      if (userId) {
        const response = await axios.get(`http://localhost:3000/friendships?receiver_id=${userId}&friend_status_id=1`);
        const friendRequests = response.data;

        // Fetch user details for each friend request
        const promises = friendRequests.map(async (request) => {
          const userResponse = await axios.get(`http://localhost:3000/users/${request.sender_id}`);
          return {
            ...request,
            username: userResponse.data.username,
          };
        });

        const requestsWithUsernames = await Promise.all(promises);
        setFriendshipRequests(requestsWithUsernames);
      }
    } catch (error) {
      console.error('Error fetching friendship requests:', error);
    }
  };

  const handleApprove = async (friendshipId) => {
    try {
      await axios.put(`http://localhost:3000/friendships/${friendshipId}`, {
        friend_status_id: 2, // Approve button sets friend_status_id to 2
      });
      fetchFriendshipRequests();
    } catch (error) {
      console.error('Error approving friendship request:', error);
    }
  };

  const handleReject = async (friendshipId) => {
    try {
      await axios.put(`http://localhost:3000/friendships/${friendshipId}`, {
        friend_status_id: 3, // Reject button sets friend_status_id to 3
      });
      fetchFriendshipRequests();
    } catch (error) {
      console.error('Error rejecting friendship request:', error);
    }
  };

  return (
    <div className="container py-4">
      <h3>フレンド申請一覧</h3>
      <Link href="/">Back to Home</Link>

      {Array.isArray(friendshipRequests) && friendshipRequests.length > 0 ? (
        <ul className="list-group mt-3">
          {friendshipRequests.map((request) => (
            <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
              {`From: User ID ${request.sender_id}, Username: ${request.username}`}
              <div>
                <button className="btn btn-success mx-2" onClick={() => handleApprove(request.id)}>
                  承認
                </button>
                <button className="btn btn-danger" onClick={() => handleReject(request.id)}>
                  拒否
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3">No friendship requests found.</p>
      )}
    </div>
  );
};

export default FriendshipRequests;
