import { useContext, useState } from 'react';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

import { mock } from 'helpers';
import { ModalContext } from 'context/ModalTaskContext';
import { app } from 'helpers/firebaseConfig';

import CustomModal from 'components/CustomModal';
import Label from 'components/Label';

type CandidatesModalProps = {
  onClose: () => void;
};

const CandidatesModal = ({ onClose = mock }: CandidatesModalProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { closeModal, isOpenModal } = useContext(ModalContext);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const db = getFirestore(app);
    try {
      await addDoc(collection(db, 'candidates'), {
        id: uuidv4(),
        name: name,
        email: email
      });
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CustomModal title="Candidates" onClose={onClose} open={isOpenModal}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={name}
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
                  value={email}
                  onChange={handleChangeEmail}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained">
                  <Label label="Add" />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </CustomModal>
  );
};

export default CandidatesModal;
