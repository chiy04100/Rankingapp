import { useContext } from 'react';
import { AuthContext } from './authcontext';
import Router from 'next/router';

function LogoutButton() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    Router.push('/');
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
