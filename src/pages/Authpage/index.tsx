import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { userAuthContext } from 'context/UserAuthContext';
import Header from 'components/Header';
import Label from 'components/Label';

const Authpage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const navigate = useNavigate();
  const { signUp, logIn } = useContext(userAuthContext)!;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp) {
      try {
        await signUp!(email, password);
        navigate('/homepage');
      } catch (err) {
        console.log((err as Error).message);
      }
    } else {
      try {
        await logIn!(email, password);
        navigate('/homepage');
      } catch (err) {
        console.log((err as Error).message);
      }
    }
  };

  const toggleAuthenticationMode = () => {
    setIsSignUp((prevMode) => !prevMode);
  };

  return (
    <Box height="100vh" overflow="auto" display="flex" flexDirection="column">
      <Header />
      <Grid
        container
        bgcolor="#d1e8e3"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
      >
        <form onSubmit={handleSubmit}>
          <Box
            width={450}
            borderRadius="20px"
            bgcolor="#116466"
            p={4}
            boxShadow={3}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <Button onClick={toggleAuthenticationMode} sx={{ mt: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: 'underline' }}
                  >
                    {isSignUp ? 'LogIn' : 'Sing-Up'}
                  </Typography>
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: 'darkgreen' }}
                >
                  <Label label={isSignUp ? 'Sing-Up' : 'LogIn'} />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Box>
  );
};

export default Authpage;
