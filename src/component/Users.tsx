import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Users.style.scss";
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Read: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedData: string | null = localStorage.getItem("alluser");

    if (storedData !== null) {
      const parsedData: User[] = JSON.parse(storedData);
      setAllUsers(parsedData);
    } else {
      axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
          setAllUsers(res.data);
          localStorage.setItem('alluser', JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleDelete = (uId: number) => {
    const updatedUser = allUsers.filter((user) => user.id !== uId);
    setAllUsers(updatedUser);
    localStorage.setItem('alluser', JSON.stringify(updatedUser));
  };

  return (
    <div>
      <Link to={'/create'} type="button" className='btn btn-success'>Add New User</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((user, index) => {
              return (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td><Link className="btn btn-primary" to={`/update/${user.id}`}>Edit</Link></td>
                  <td><button className="btn btn-primary" type="button" onClick={() => { handleDelete(user.id); }}>Delete</button></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Read;
