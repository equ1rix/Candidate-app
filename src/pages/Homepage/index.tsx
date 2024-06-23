import { useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter
} from 'firebase/firestore';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const itemPerPage = 12;

  const fetchTotalPages = async () => {
    try {
      const candidatesRef = collection(db, 'candidates');
      const snapshot = await getCountFromServer(candidatesRef);
      const totalCount = snapshot.data().count;
      setTotalPages(Math.ceil(totalCount / itemPerPage));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCandidates = async (page: number) => {
    try {
      const candidatesRef = collection(db, 'candidates');
      let q = query(candidatesRef, limit(itemPerPage));
      if (page > 1) {
        const startAtIndex = (page - 1) * itemPerPage;
        const prevCandidatesQuery = query(candidatesRef, limit(startAtIndex));
        const prevCandidatesSnapshot = await getDocs(prevCandidatesQuery);
        const lastVisible =
          prevCandidatesSnapshot.docs[prevCandidatesSnapshot.docs.length - 1];
        q = query(candidatesRef, startAfter(lastVisible), limit(itemPerPage));
      }
      const querySnapshot = await getDocs(q);
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
    fetchCandidates(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid item xs={3} sm={2}>
          <Sidebar onClick={openModal} />
        </Grid>
        <Grid item xs={9} sm={10}>
          <Header />
          <Candidates
            candidatesToShow={candidates}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
          <CandidatesModal onClose={closeModal} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
