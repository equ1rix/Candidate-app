import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where
} from 'firebase/firestore';

import { ModalContext } from 'context/ModalTaskContext';
import { db } from 'helpers/firebaseConfig';

import Candidates from 'components/Candidates';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import CandidatesModal from 'components/CandidatesModal';
import CandidateDrawer from 'components/CandidateDrawer';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
}

const Homepage = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openDrawer, setOpenDrawer] = useState<Candidate | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const itemPerPage = 12;

  const getCandidateById = async (id: string): Promise<Candidate | null> => {
    try {
      const candidateDoc = await getDoc(doc(db, 'candidates', id));
      if (candidateDoc.exists()) {
        return { id: candidateDoc.id, ...candidateDoc.data() } as Candidate;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const openCandidateInfo = (id: string) => {
    navigate(`/homepage/${id}`);
  };

  const closeCandidateInfo = () => {
    navigate('/homepage');
    setOpenDrawer(null);
  };

  const fetchCandidates = async (page: number, search: string) => {
    try {
      const candidatesRef = collection(db, 'candidates');

      const snapshot = await getCountFromServer(candidatesRef);
      const totalCount = snapshot.data().count;
      setTotalPages(Math.ceil(totalCount / itemPerPage));

      let q = query(candidatesRef, limit(itemPerPage));

      if (search) {
        q = query(
          candidatesRef,
          where('name', '>=', search),
          where('name', '<=', search + '\uf8ff'),
          limit(itemPerPage)
        );
      } else if (page > 1) {
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
    fetchCandidates(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (id) {
      getCandidateById(id).then((candidate) => {
        if (candidate) {
          setOpenDrawer(candidate);
        } else {
          navigate('/homepage');
        }
      });
    } else {
      setOpenDrawer(null);
    }
  }, [id, navigate]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={3} sm={2}>
          <Sidebar
            onClick={openModal}
            value={searchQuery}
            changeValue={setSearchQuery}
          />
        </Grid>
        <Grid item xs={9} sm={10}>
          <Header />
          <Candidates
            candidatesToShow={candidates}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            openDrawer={openCandidateInfo}
          />
          <CandidatesModal onClose={closeModal} />
          {openDrawer && (
            <CandidateDrawer
              candidateInfo={openDrawer}
              onClose={closeCandidateInfo}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
