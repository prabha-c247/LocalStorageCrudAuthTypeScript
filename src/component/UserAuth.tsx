import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";

interface ChildComponent {
  children:any
}
 const UserAuth = ({ children }:ChildComponent) => {
    const navigate = useNavigate ();
    useEffect(()=>{
      const userAuth = localStorage.getItem('loginuser')
    if(!userAuth){
        navigate('/login')
    }
    })
  return  children;
}

export default UserAuth;


