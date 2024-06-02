import { useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';

import { ModalContext } from 'context/ModalTaskContext';
import { db } from 'helpers/firebaseConfig';

import Candidates from 'components/Candidates';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import CandidatesModal from 'components/CandidatesModal';

export interface Candidate {
  id: string;
  name: string;
  email: string;
}
const Homepage = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const getCandidatesFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'candidates'));
      const candidatesData = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data()
          }) as Candidate
      );
      setCandidates(candidatesData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCandidatesFromFirestore();
  }, []);

  const updateCandidates = () => {
    getCandidatesFromFirestore();
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={3} sm={2}>
          <Sidebar onClick={openModal} />
        </Grid>
        <Grid item xs={9} sm={10}>
          <Header refreshCandidates={updateCandidates} />
          <Candidates candidatesToShow={candidates} />
          <CandidatesModal onClose={closeModal} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
