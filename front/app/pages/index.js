import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuthContext } from './auth/authcontext';
import LogoutButton from './auth/logout';
import { NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = (props) => {
  const { userId, userName } = useContext(AuthContext);

  return (
    <div className="container">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
          {userId ? (
            <>
              <header className="mt-4 d-flex align-items-center justify-content-between">
                <h2>Userの一覧</h2>
                <Link href="/friend/friendpage">
                  <p className="nav-link me-4">フレンド申請一覧</p>
                </Link>
                <nav className="d-flex">
                  <NavDropdown title={userName} id="basic-nav-dropdown">
                    <NavDropdown.Item href={`/user/show/${userId}`}>mypage</NavDropdown.Item>
                    <NavDropdown.Item href={`/friend/friendlist`}>myfrindlist</NavDropdown.Item>
                    <NavDropdown.Item href={`/friend/friendrequest`}>myfrindrequest</NavDropdown.Item>
                    <NavDropdown.Item>
                      <LogoutButton />
                    </NavDropdown.Item>
                  </NavDropdown>
                </nav>
              </header>
            </>
          ) : (
            <>
            <header className="mt-4 d-flex align-items-center justify-content-between">
                <h2>Userの一覧</h2>
                <nav className="d-flex mt-4">
                  <Link href="/auth/login">
                    <p className="nav-link me-4">ログイン</p>
                  </Link>
                  <Link href="/auth/signin">
                    <p className="nav-link">サインイン</p>
                  </Link>
                </nav>
              </header>
            </>
          )}
        </div>
        <div>
          <table className="table mt-4">
            <tbody>
              {props.posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.username}</td>
                  <td className={post.userstatus_id === 1 ? 'text-success' : post.userstatus_id === 2 ? 'text-danger' : ''}>
                    {post.userstatus.statusname}
                  </td>
                  <td>
                    <Link href={`/user/show/${post.id}`}>
                      <button className="btn btn-primary">UserProfile</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      );
    };

export const getStaticProps = async () => {
  try {
    const response = await fetch('http://api:3000/users', { method: 'GET' });
    const json = await response.json();
    return {
      props: {
        posts: json,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default Home;
