import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./Create.style.scss";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Update: React.FC = () => {
  const navigate = useNavigate();
  const { id =''} = useParams<{ id: string }>(); // Explicitly define the type of `id`
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    const storedData: string | null = localStorage.getItem('alluser');
    if (storedData !== null) {
      const allUsers: User[] = JSON.parse(storedData);
      const userEdit = allUsers.find((user) => user.id === parseInt(id));
      if (userEdit) {
        setFormData(userEdit);
      }
    }
  }, [id]);

  const handleEdit = () => {
    const storedData: string | null = localStorage.getItem('alluser');
    if (storedData !== null) {
      const allUsers: User[] = JSON.parse(storedData);
      const updatedUsers: User[] = allUsers.map((user) =>
        user.id === parseInt(id) ? formData : user
      );
      localStorage.setItem('alluser', JSON.stringify(updatedUsers));
      navigate('/');
    }
  };

  return (
    <div className='container mx-auto'>
      <form>
        <div className='col'>
          <input
            type='number'
            className='form-control'
            placeholder='id'
            aria-label='Id'
            value={formData.id}
            onChange={(e) => {
              setFormData({ ...formData, id: parseInt(e.target.value) });
            }}
          />
        </div>
        <div className='col'>
          <input
            type='text'
            className='form-control'
            placeholder='name'
            aria-label='name'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>
        <div className='col'>
          <input
            type='text'
            className='form-control'
            placeholder='username'
            aria-label='name'
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />
        </div>
        <div className='col'>
          <input
            type='email'
            className='form-control'
            placeholder='email'
            aria-label='Email'
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>
      </form>
      <button className='btn btn-primary' onClick={handleEdit}>
        Save Changes
      </button>
      <Link to='/'>Back</Link>
    </div>
  );
};

export default Update;
