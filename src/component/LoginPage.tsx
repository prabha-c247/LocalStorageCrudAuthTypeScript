import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Users {
  email: string;
  pwd: string;
}

const LoginPage: React.FC = () => {
  const paperStyle = {
    padding: 20,
    // height: "75vh",
    width: 280,
    margin: "20px auto",
  };

  const [userLogin, setUserLogin] = useState<Users>({
    email: "",
    pwd: "",
  });

  const navigate = useNavigate();

  const onInputChanged = (fieldName: string, value: string) => {
    setUserLogin((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem("loginuser") || "");

    if (loggedUser) {
      if (userLogin.email === loggedUser.email && userLogin.pwd === loggedUser.pwd) {
        navigate("/");
        console.log("successful");
      } else {
        alert("Wrong Email or Password");
      }
    }
  };

  const resetForm = () => {
    setUserLogin({ email: "", pwd: "" });
  };

  return (
    <form>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid alignItems="center">
            <h2>Log in</h2>
          </Grid>

          <TextField
            id="standard-basic"
            label="email"
            variant="standard"
            style={{marginTop:"5px"}}
            type="text"
            value={userLogin.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputChanged("email", e.target.value);
            }}
            fullWidth
            required
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            style={{marginTop:"5px"}}
            variant="standard"
            value={userLogin.pwd}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputChanged("pwd", e.target.value);
            }}
            fullWidth
            required
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={false} color="primary" />}
              label="Remember me"
            />
          </FormGroup>

          <Button
            variant="outlined"
            color="primary"
            type="button"
            style={{marginTop:"5px"}}
            onClick={handleLogin}
            fullWidth
          >
            SignIn
          </Button>

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <Button onClick={() => navigate("/signup")}>SignUp</Button>
            <Button onClick={resetForm}>Reset</Button>
          </Box>
        </Paper>
      </Grid>
    </form>
  );
};

export default LoginPage;
