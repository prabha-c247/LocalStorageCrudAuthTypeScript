import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

interface UsersData {
  name: string;
  email: string;
  pwd: string;
}
// interface Function{
//     login:() => void
// }

const SignUp = () => {
  const paperStyle = {
    padding: 20,    
    width: 280,
    margin: "20px auto",
  };
  
  const [userSigning, setUserSigning] = useState<UsersData>({
    name: "",
    email: "",
    pwd: "",
  });

  console.log(userSigning.name,' name 36')

  const navigate = useNavigate();

  const onInputChanged = (fieldName: string, value: string) => {
    setUserSigning((prev) => ({ ...prev, [fieldName]: value }));
  };


  const handleSignUp = (e:any) => {
    e.preventDefault();
    const value= localStorage.setItem("loginuser", JSON.stringify(userSigning));
    console.log("signup working");
    navigate("/login");
    if(value === null){      
      navigate('/signup')
    }
  };

  return (
    <div>   
      <form onSubmit={handleSignUp}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid alignItems="center">
              <h2>Sign Up</h2>
            </Grid>
            <TextField
              id="standard-basic"
              label="Name"
              type="text"
              variant="standard"
              value={userSigning.name}
              onChange={(e: any) => {
                onInputChanged("name", e.target.value);
              }}
              fullWidth
              required
            />
            <TextField
              // id="standard-basic"
              label="email"
              type="email"
              variant="standard"
              value={userSigning.email}
              onChange={(e: any) => {
                onInputChanged("email", e.target.value);
              }}
              fullWidth
              required
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              variant="standard"
              value={userSigning.pwd}
              onChange={(e: any) => {
                onInputChanged("pwd", e.target.value);
              }}
              fullWidth
              required
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
              />
            </FormGroup>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
              color="primary"
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
            {/* <Button variant="contained" onClick={logout} color='error' type='submit' fullWidth>LogOut</Button> */}
            <p>Already have an account?</p>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default SignUp;
