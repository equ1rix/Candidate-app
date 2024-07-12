import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';

import { mock } from 'helpers';
import { db } from 'helpers/firebaseConfig';
import { Candidate } from 'pages/Homepage';
import CloseIcon from 'components/Icons/closeIcon';

type CandidateDrawerProps = {
  onClose: () => void;
  candidate: Candidate | null;
};

const CandidateDrawer = ({
  onClose = mock,
  candidate
}: CandidateDrawerProps) => {
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidateEmail, setCandidateEmail] = useState<string>('');
  const [candidatePhone, setCandidatePhone] = useState<string>('');

  useEffect(() => {
    if (candidate) {
      setCandidateName(candidate.name);
      setCandidateEmail(candidate.email);
      setCandidatePhone(candidate.phone);
    }
  }, [candidate]);

  const identityCheck =
    candidateName === candidate?.name &&
    candidateEmail === candidate?.email &&
    candidatePhone === candidate?.phone;

  const updateCandidateInfo = async (updatedInfo: Partial<Candidate>) => {
    if (candidate) {
      const candidateDocRef = doc(db, 'candidates', candidate.id);
      await updateDoc(candidateDocRef, updatedInfo);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidateName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidateEmail(e.target.value);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidatePhone(e.target.value);
  };

  const handlerSave = () => {
    updateCandidateInfo({
      name: candidateName,
      email: candidateEmail,
      phone: candidatePhone
    });
    onClose();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={!!candidate}
        onClose={onClose}
        transitionDuration={300}
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              xs: '100%',
              md: '66.67%',
              lg: '66.67%',
              xl: '66.67%'
            }
          }
        }}
      >
        <Box className="p-4">
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ marginBottom: '30px' }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
              Candidate info
            </Typography>
            <Button onClick={onClose}>
              <CloseIcon />
            </Button>
          </Grid>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={candidateName}
                  onChange={handleChangeName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  value={candidateEmail}
                  onChange={handleChangeEmail}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Phone number"
                  variant="outlined"
                  name="Phone number"
                  value={candidatePhone}
                  onChange={handleChangePhoneNumber}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="inherit"
                className="bg-text-title"
                disabled={identityCheck}
                onClick={handlerSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default CandidateDrawer;
