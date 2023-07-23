import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../auth/authcontext';
import Link from 'next/link';

const UserDetail = () => {
  const router = useRouter();
  const { userId, userName, logout } = useContext(AuthContext);
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(
    typeof window !== 'undefined' && id && localStorage.getItem(`friendRequestSent-${id}`)
      ? JSON.parse(localStorage.getItem(`friendRequestSent-${id}`))
      : null
  );
  
  useEffect(() => {
    if (id && userId) {
      fetchUserDetail(id);
    }
  }, [id, userId]);

  useEffect(() => {
    if (id && userId && id === userId) {
      setShowButtons(true);
    }
  }, [id, userId]);

  const fetchUserDetail = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, { method: 'GET' });
      const json = await response.json();
  
      // Check if the user data includes the friendRequestSent property
      // If it does, update the state accordingly
      if (json.friendRequestSent) {
        setFriendRequestSent(json.friendRequestSent);
      } else {
        // If the friendRequestSent property is not available in the user data,
        // retrieve the state from localStorage
        const localStorageData = localStorage.getItem(`friendRequestSent-${id}`);
        if (localStorageData) {
          setFriendRequestSent(JSON.parse(localStorageData));
        } else {
          setFriendRequestSent(null);
        }
      }
  
      setUser(json);
    } catch (error) {
      console.error('Error fetching user detail:', error);
    }
  };
  
  
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('本当にユーザーを削除しますか？');
      if (confirmed) {
        await axios.delete(`http://localhost:3000/users/${id}`);
        logout();
        router.push('/');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };  

  const handleFriendRequest = async () => {
    let response; // Define the variable outside the try-catch block
    try {
      if (!friendRequestSent) {
        // Sending a friend request
        response = await axios.post(`http://localhost:3000/friendships`, {
          sender_id: userId,
          receiver_id: id,
          friend_status_id: 1,
        });
  
        // Store the updated friendRequestSent state in localStorage (Client-side only)
        if (typeof window !== 'undefined') {
          localStorage.setItem(`friendRequestSent-${id}`, JSON.stringify(response.data));
        }
      } else {
        // Canceling a friend request
        response = await axios.put(`http://localhost:3000/friendships/${friendRequestSent.id}`, {
          friend_status_id: 3,
        });
  
        // Remove the stored friendRequestSent state from localStorage (Client-side only)
        if (typeof window !== 'undefined') {
          localStorage.removeItem(`friendRequestSent-${id}`);
        }
      }
  
      // Update the state for the specific user only
      setFriendRequestSent(friendRequestSent ? null : response.data);
    } catch (error) {
      console.error('Error sending/canceling friend request:', error);
    }
  };  

  return (
    <div className="container py-4">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
       <header className="mt-4 d-flex align-items-center justify-content-between">
        <h2>Userの一覧</h2>
        <Link href="/">
          <p>トップへ</p>
        </Link>
      </header>
      {user ? (
        <div className="float-end" style={{ width: "50%"}}>
          <div className="border rounded p-4">
            <table className="table">
              <tbody>
                <tr>
                  <th>プロフィール</th>
                </tr>
                <tr>
                  <th>Username:</th>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <th>Status:</th>
                  <td className={`fw-bold ${user.userstatus_id === 1 ? 'text-success' : user.userstatus_id === 2 ? 'text-danger' : ''}`}>
                    {user.userstatus.statusname}
                  </td>
                </tr>
                {showButtons && (
                  <tr>
                  <th></th>
                  <td className="text-end">
                  <Link href={`/user/edit/${userId}`}>
                    <button className="btn btn-primary float-right" style={{ width: "100px" }}>
                      編集
                    </button>
                  </Link>
                    <button className="btn btn-danger float-right" style={{ width: "100px" }} onClick={handleDelete}>
                      削除
                    </button>
                  </td>
                </tr>
                )}
                  {!showButtons && !friendRequestSent && (
                    <tr>
                      <th></th>
                      <td className="text-end">
                        <button
                          className="btn btn-primary float-right"
                          style={{ width: '120px' }}
                          onClick={handleFriendRequest}
                        >
                          フレンド申請
                        </button>
                      </td>
                    </tr>
                  )}
                  {!showButtons && friendRequestSent && (
                    <tr>
                      <th></th>
                      <td className="text-end">
                        <button
                          className="btn btn-warning float-right"
                          style={{ width: '140px' }}
                          onClick={handleFriendRequest}
                        >
                          申請キャンセル
                        </button>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDetail;
