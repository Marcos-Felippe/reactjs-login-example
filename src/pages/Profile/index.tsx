import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { getUsers } from '../../services/api';
import './Profile.css';

type User = {
  id: string;
  name: string;
  email: string;
}

function Profile() {

  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getUsers();
      setUsers(response.data);
      setLoading(false);
    })()
  }, []);

  const handleLogout = () => {
    logout();
  }

  if(loading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <div className="Profile">
      <header className="Profile-header">
        <p>
            Profile - {user?.name}
        </p>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id} - {user.name}
            </li>
          ))}
        </ul>
      </header>
      <button onClick={ handleLogout }>Log out</button>
    </div>
  );
}

export default Profile;
