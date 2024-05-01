import { useContext, useState } from 'react';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { userAuthContext } from 'context/UserAuthContext';
import { auth } from 'helpers/firebaseConfig';
import Label from 'components/Label';
import Header from 'components/Header';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore';

const SingIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { logIn, googleAuth } = useContext(userAuthContext)!;
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGoogleSignIn = async () => {
    await googleAuth();
    const currentUser = await auth.currentUser;
    if (currentUser) {
      const { displayName, email: userEmail, uid } = currentUser;
      const nameToSave = displayName ? displayName : userEmail;

      const db = getFirestore();
      const usersRef = collection(db, 'users');
      const userSnapshot = await getDocs(
        query(usersRef, where('email', '==', userEmail))
      );
      if (userSnapshot.empty) {
        await addDoc(usersRef, {
          name: nameToSave,
          id: uid,
          email: userEmail
        });
      }
      navigate('/homepage');
    } else {
      console.log('Error');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn!(email, password);
      navigate('/homepage');
    } catch (err) {
      console.log((err as Error).message);
    }
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
                <Button
                  onClick={() => {
                    navigate('/singup');
                  }}
                  variant="contained"
                  sx={{ backgroundColor: 'green' }}
                >
                  <Label label="SingUp" />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: 'darkgreen', marginLeft: '20px' }}
                >
                  <Label label="LogIn" />
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

export default SingIn;
