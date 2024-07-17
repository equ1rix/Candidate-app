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

  const arrayDataInput = [
    { label: 'Name', name: 'name', value: name, func: setName },
    { label: 'Email', name: 'email', value: email, func: setEmail },
    { label: 'Phone', name: 'phone', value: phoneNumber, func: setPhoneNumber },
    { label: 'GitHub', name: 'github', value: gitHub, func: setGitHub },
    { label: 'LinkedIn', name: 'linkedin', value: linkedIn, func: setLinkedIn }
  ];

  const arrayDataCheckbox = [
    {
      label: 'Favorite',
      value: isFavorite,
      func: setIsFavorite
    },
    { label: 'Status', value: status, func: setStatus }
  ];

  const isButtonDisabled = !name || !email;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateHandler: React.Dispatch<React.SetStateAction<string>>
  ) => stateHandler(e.target.value);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateHandler: React.Dispatch<React.SetStateAction<boolean>>
  ) => stateHandler(e.target.checked);

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
            {arrayDataInput.map((el, index) => (
              <Grid key={index} item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label={el.label}
                    variant="outlined"
                    name={el.name}
                    value={el.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, el.func)
                    }
                  />
                </FormControl>
              </Grid>
            ))}
            {arrayDataCheckbox.map((el, index) => (
              <Grid key={index} item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={el.value}
                      onChange={(e) => handleChangeCheckbox(e, el.func)}
                    />
                  }
                  label={el.label}
                />
              </Grid>
            ))}
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
