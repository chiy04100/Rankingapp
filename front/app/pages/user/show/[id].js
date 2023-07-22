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
  const [friendRequestSent, setFriendRequestSent] = useState(null);

  useEffect(() => {
    if (id && userId && id === userId) {
      setShowButtons(true);
    }
  }, [id, userId]);  

  useEffect(() => {
    if (id) {
      fetchUserDetail(id);
      fetchFriendRequestStatus();
    }
  }, [id]);

  const fetchFriendRequestStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/friendships/${id}`);
      setFriendRequestSent(response.data);
    } catch (error) {
      console.error('Error fetching friend request status:', error);
    }
  };

  const fetchUserDetail = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000//users/${userId}`, { method: 'GET' });
      const json = await response.json();
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
    try {
      if (!friendRequestSent) {
        // フレンドリクエストがまだ送信されていない場合、新しいフレンドリクエストを送信する
        const response = await axios.post(`http://localhost:3000/friendships`, {
          sender_id: userId,
          receiver_id: id,
          friend_status_id: 1,
        });
        setFriendRequestSent(response.data);
        console.log(friendRequestSent); // フレンドリクエストが送信された後、フレンドシップレコードのIDを取得してセット
      } else {
        // 既にフレンドリクエストが存在する場合は、キャンセルする
        await axios.put(`http://localhost:3000/friendships/${friendRequestSent.id}`, {
          friend_status_id: 3, // 3はキャンセルを示す
        });
        setFriendRequestSent(null); // フレンドリクエストをキャンセルした後、nullにリセット
      }
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
