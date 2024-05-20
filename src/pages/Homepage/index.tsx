import { useContext } from 'react';
import { Box, Grid } from '@mui/material';

import { ModalContext } from 'context/ModalTaskContext';

import Candidates from 'components/Candidates';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import CandidatesModal from 'components/CandidatesModal';

const Homepage = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  return (
    <Box>
      <Grid container>
        <Grid item xs={3} sm={2}>
          <Sidebar onClick={openModal} />
        </Grid>
        <Grid item xs={9} sm={10}>
          <Header />
          <Candidates />
          <CandidatesModal onClose={closeModal} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
