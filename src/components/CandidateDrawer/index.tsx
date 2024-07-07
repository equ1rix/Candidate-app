import { useState } from 'react';
import { Box, Drawer, FormControl, Grid, TextField } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';

import { mock } from 'helpers';
import { db } from 'helpers/firebaseConfig';
import { Candidate } from 'pages/Homepage';

type CandidateDrawerProps = {
  onClose: () => void;
  candidateInfo: Candidate | null;
};

const CandidateDrawer = ({
  onClose = mock,
  candidateInfo
}: CandidateDrawerProps) => {
  if (!candidateInfo) {
    return null;
  }

  const { id, name, email, phone } = candidateInfo;

  const [candidateName, setCandidateName] = useState<string>(name);
  const [candidateEmail, setCandidateEmail] = useState<string>(email);
  const [candidatePhone, setCandidatePhone] = useState<string>(phone);

  const updateCandidateInfo = async (updatedInfo: Partial<Candidate>) => {
    const candidateDocRef = doc(db, 'candidates', id);
    await updateDoc(candidateDocRef, updatedInfo);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidateName(e.target.value);
    updateCandidateInfo({ name: e.target.value });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidateEmail(e.target.value);
    updateCandidateInfo({ email: e.target.value });
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidatePhone(e.target.value);
    updateCandidateInfo({ phone: e.target.value });
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={candidateInfo ? true : false}
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
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default CandidateDrawer;
