import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';

import { UserAuthContext } from 'context/UserAuthContext';

import Label from 'components/Label';
import Header from 'components/Header';

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
      <Grid
        container
        className="bg-text-title"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
      >
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
                  onClick={() => {
                    navigate('/singup');
                  }}
                  variant="contained"
                  sx={{ backgroundColor: 'green' }}
                >
                  <Label label={t('singup')} />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: 'darkgreen', marginLeft: '10px' }}
                >
                  <Label label={t('login')} />
                </Button>
                <Button
                  onClick={handleGoogleSignIn}
                  variant="contained"
                  sx={{ backgroundColor: 'green', marginLeft: '20px' }}
                >
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
