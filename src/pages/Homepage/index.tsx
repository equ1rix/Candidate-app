import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';

import { ModalContext } from 'context/ModalTaskContext';
import { useFetchCandidates } from 'hooks/useFetchCandidates';
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
  github: string;
  linkedin: string;
  status: string;
  favorite: boolean;
  position: string;
}

const Homepage = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [openDrawer, setOpenDrawer] = useState<Candidate | null>(null);

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const currentPage = 1;

  const { candidates } = useFetchCandidates(
    currentPage,
    searchQuery,
    selectedPosition,
    selectedStatus
  );

  const getCandidateById = async (id: string): Promise<Candidate | null> => {
    try {
      const candidateDoc = await getDoc(doc(db, 'candidates', id));
      if (candidateDoc.exists()) {
        return { id: candidateDoc.id, ...candidateDoc.data() } as Candidate;
      } else {
        return null;
      }
    } catch (err) {
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
            onPositionChange={setSelectedPosition}
            onStatusChange={setSelectedStatus}
          />
        </Grid>
        <Grid item xs={9} sm={10}>
          <Header />
          <Candidates
            searchQuery={searchQuery}
            selectedPosition={selectedPosition}
            candidatesToShow={candidates}
            openDrawer={openCandidateInfo}
            selectedStatus={selectedStatus}
          />
          <CandidatesModal onClose={closeModal} />
          {openDrawer && (
            <CandidateDrawer
              candidate={openDrawer}
              onClose={closeCandidateInfo}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
