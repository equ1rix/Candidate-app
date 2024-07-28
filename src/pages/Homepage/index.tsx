import { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';

import { ModalContext } from 'context/ModalTaskContext';

import Candidates from 'components/Candidates';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import CandidatesModal from 'components/CandidatesModal';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
}

const Homepage = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  return (
    <Box>
      <Grid container>
        <Grid item xs={3} sm={2}>
          <Sidebar
            onClick={openModal}
            value={searchQuery}
            changeValue={setSearchQuery}
            onPositionChange={setSelectedPosition}
          />
        </Grid>
        <Grid item xs={9} sm={10}>
          <Header />
          <Candidates
            searchQuery={searchQuery}
            selectedPosition={selectedPosition}
          />
          <CandidatesModal onClose={closeModal} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
