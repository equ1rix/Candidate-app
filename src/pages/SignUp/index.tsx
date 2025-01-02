import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';

import { Link } from 'react-router-dom';
import { UserAuthContext } from 'context/UserAuthContext';

import Header from 'components/Header';
import Label from 'components/Label';
import GoogleIcon from 'components/Icons/googleIcon';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signUp, googleAuth } = useContext(UserAuthContext);
  const { t } = useTranslation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(email, password);
  };

  const handleGoogleSignIn = async () => {
    await googleAuth();
  };

  return (
    <Box height="100vh" overflow="auto" display="flex" flexDirection="column">
      <Header />
      <Grid container justifyContent="center" alignItems="center" flexGrow={1}>
        <form onSubmit={handleSubmit}>
          <Box
            maxWidth={550}
            minWidth={450}
            borderRadius="20px"
            className="bg-bg-modal"
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
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-bg-modalButton w-[90px]"
                  sx={{ textTransform: 'none' }}
                >
                  <Label label={t('Sign Up')} />
                </Button>
                <span className="ml-[20px]">
                  {`${t('Go to')} `}
                  <Link
                    to="/signin"
                    style={{ textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    {t('Sign In')}
                  </Link>
                </span>
              </Grid>
              <Grid item className="w-full">
                <Button
                  onClick={handleGoogleSignIn}
                  variant="contained"
                  className="bg-bg-modalButton "
                  fullWidth
                  sx={{
                    display: 'flex',
                    padding: '4px 8px',
                    alignItems: 'left',
                    justifyContent: 'flex-start',
                    textTransform: 'none'
                  }}
                >
                  <span className="flex mr-[10px] w-[40px] h-[40px] bg-white items-center justify-center border rounded-lg">
                    <GoogleIcon />
                  </span>
                  <Label label={t('Login with Google')} />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Box>
  );
};

export default SignUp;
