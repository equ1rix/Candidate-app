import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';

import { UserAuthContext } from 'context/UserAuthContext';

import Label from 'components/Label';
import Header from 'components/Header';
import GoogleIcon from 'components/Icons/googleIcon';

const SingIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { logIn, googleAuth } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGoogleSignIn = async () => {
    await googleAuth();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate('/homepage');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box height="100vh" overflow="auto" display="flex" flexDirection="column">
      <Header />
      <Grid container justifyContent="center" alignItems="center" flexGrow={1}>
        <form onSubmit={handleSubmit}>
          <Box
            maxWidth={550}
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
                  className="bg-bg-modalButton"
                >
                  <Label label={t('login')} />
                </Button>
                <Button
                  onClick={() => {
                    navigate('/singup');
                  }}
                  variant="contained"
                  className="bg-bg-modalButton ml-[10px]"
                >
                  <Label label={t('singup')} />
                </Button>
                <Button
                  onClick={handleGoogleSignIn}
                  variant="contained"
                  className="bg-bg-modalButton ml-[20px]"
                >
                  <span className="mr-[10px]">
                    <GoogleIcon />
                  </span>
                  <Label label={`${t('login')} google`} />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Box>
  );
};

export default SingIn;
