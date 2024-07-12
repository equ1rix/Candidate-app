import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

import { db } from 'helpers/firebaseConfig';
import { mock } from 'helpers';
import { ModalContext } from 'context/ModalTaskContext';

import CustomModal from 'components/CustomModal';
import Label from 'components/Label';

type CandidatesModalProps = {
  onClose: () => void;
};

const CandidatesModal = ({ onClose = mock }: CandidatesModalProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [gitHub, setGitHub] = useState<string>('');
  const [linkedIn, setLinkedIn] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { closeModal, isOpenModal } = useContext(ModalContext);
  const { t } = useTranslation();

  const isButtonDisabled = !name || !email;

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangeGitHub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGitHub(e.target.value);
  };

  const handleChangeLinkedIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedIn(e.target.value);
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.checked);
  };

  const handleChangeFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'candidates'), {
        id: uuidv4(),
        name: name,
        email: email,
        phone: phoneNumber,
        github: gitHub,
        linkedin: linkedIn,
        status: status,
        favorite: isFavorite
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Phone number"
                  variant="outlined"
                  name="Phone number"
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  label="GitHub"
                  variant="outlined"
                  name="GitHub"
                  type="GitHub"
                  value={gitHub}
                  onChange={handleChangeGitHub}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  label="LinkedIn link"
                  variant="outlined"
                  name="LinkedIn"
                  type="LinkedIn"
                  value={linkedIn}
                  onChange={handleChangeLinkedIn}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isFavorite}
                    onChange={handleChangeFavorite}
                  />
                }
                label="Favorite"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={status} onChange={handleChangeStatus} />
                }
                label="Status"
              />
            </Grid>
            <Grid item>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isButtonDisabled}
                >
                  <Label label={t('add')} />
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
