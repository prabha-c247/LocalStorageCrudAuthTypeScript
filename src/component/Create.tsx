import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Create.style.scss";
import {Link} from 'react-router-dom'

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Create: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: '',
    username: '',
    email: '',
  });
  
  const localStorageData = localStorage.getItem('alluser');
  const data: User[] = localStorageData ? JSON.parse(localStorageData) : [];

  const [users, setUsers] = useState<User[]>(data);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const newAllUsers = [...users, formData];
    localStorage.setItem('alluser', JSON.stringify(newAllUsers));
    setUsers(newAllUsers);
    setFormData({
      id: 0,
      name: '',
      username: '',
      email: '',
    });
    console.log(newAllUsers, 'new user has been added');
    navigate('/');
  };

  const FormDataField = (fieldName: keyof User, value: string | number) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className='form-container'>
      <form className=' '>
        <div className='col'>
          <input
           className='input-field'
            type='number'
            placeholder='id'
            aria-label='Id'
            value={formData.id}
            onChange={(e) => {
              FormDataField('id', e.target.value);
            }}
          />
        </div>
        <div className='col'>
          <input
           className='input-field'
            type='text'            
            placeholder='name'
            aria-label='Name'
            value={formData.name}
            onChange={(e) => {
              FormDataField('name', e.target.value);
            }}
          />
        </div>
        <div className='col'>
          <input
           className='input-field'
            type='text'            
            placeholder='username'
            aria-label='User name'
            value={formData.username}
            onChange={(e) => {
              FormDataField('username', e.target.value);
            }}
          />
        </div>
        <div className='col'>
          <input
          className='input-field'
            type='email'            
            placeholder='email'
            aria-label='Email'
            value={formData.email}
            onChange={(e) => {
              FormDataField('email', e.target.value);
            }}
          />
        </div>
      </form>
      <button  onClick={handleSubmit} className='btn'>
        Submit
      </button>
      <Link to="/" className='btn'><input type="button" value="Back" /></Link>
    </div>
  );
};

export default Create;
