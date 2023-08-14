import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Users.m.scss";
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

  const Users: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);  


   const userAllDetail: string | null = localStorage.getItem("loginuser");
  const userSigning = userAllDetail ? JSON.parse(userAllDetail) : null;
const userName = userSigning ? userSigning.name : null;

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

   const navigate = useNavigate();
  const LogOutUser=()=>{
    localStorage.removeItem("loginuser" );    

    console.log("logout");
    alert('You are successfully Logged out!!')
    navigate('/signup')
  }

  return (
    <div className='container'>
        <article className='article-header'>
                <header>
                    <h1>React: CRUD with TypeScript.</h1>
                    <p>Welcome {userName}!</p>
                    <h4>
            <button onClick={LogOutUser}>LogOut </button> 
          </h4>
                </header>
            </article>
            <section className='section-content'>
      <Link to={'/create'} type="button" className='btn m-bt'>Add User</Link>
      <table>
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
                  <td><button className=" btn-primary" type="button" onClick={() => { handleDelete(user.id); }}>Delete</button></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      </section>
    </div>
  );
}

export default Users;
