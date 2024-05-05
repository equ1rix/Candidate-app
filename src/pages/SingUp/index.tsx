import React, { useContext, useState } from 'react';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';

import { UserAuthContext } from 'context/UserAuthContext';
import { auth } from 'helpers/firebaseConfig';
import { modalBG, title } from 'helpers/styles';

import Header from 'components/Header';
import Label from 'components/Label';

const Authpage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signUp, googleAuth } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      if (auth.currentUser) {
        const { displayName, email: userEmail, uid } = auth.currentUser;
        const nameToSave = displayName ? displayName : userEmail;
        const db = getFirestore();
        const userDocRef = doc(db, 'users', uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          await setDoc(userDocRef, {
            id: uid,
            name: nameToSave,
            email: userEmail
          });
        }
      }
      navigate('/homepage');
    } catch (err) {
      alert(err);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleAuth();
  };

  return (
    <Box height="100vh" overflow="auto" display="flex" flexDirection="column">
      <Header />
      <Grid
        container
        bgcolor={title}
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
      >
        <form onSubmit={handleSubmit}>
          <Box
            width={450}
            borderRadius="20px"
            bgcolor={modalBG}
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
                    navigate('/singin');
                  }}
                  variant="contained"
                  sx={{ backgroundColor: 'green' }}
                >
                  <Label label="SingIn" />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: 'darkgreen', marginLeft: '20px' }}
                >
                  <Label label="Sing-Up" />
                </Button>
                <Button
                  onClick={handleGoogleSignIn}
                  variant="contained"
                  sx={{ backgroundColor: 'green', marginLeft: '40px' }}
                >
                  <Label label="Sing-In google" />
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
