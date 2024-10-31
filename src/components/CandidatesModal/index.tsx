import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { useFetchPositions } from 'hooks/useFetchPositions';
import { db } from 'helpers/firebaseConfig';
import { mock } from 'helpers';
import { ModalContext } from 'context/ModalTaskContext';

import CustomModal from 'components/CustomModal';
import Label from 'components/Label';
import { useFetchStatuses } from 'hooks/useFetchStatuses';
import { useFetchCandidates } from 'hooks/useFetchCandidates';

type CandidatesModalProps = {
  onClose: () => void;
};

const CandidatesModal = ({ onClose = mock }: CandidatesModalProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [gitHub, setGitHub] = useState<string>('');
  const [linkedIn, setLinkedIn] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [position, setPosition] = useState('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { closeModal, isOpenModal } = useContext(ModalContext);

  const { statuses } = useFetchStatuses();
  const { refetchCandidates } = useFetchCandidates(1, '', '', '');
  const { positions } = useFetchPositions();
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
    }
  ];

  const isButtonDisabled = !name || !email || !status || !position;

  const handleChangePosition = (e: SelectChangeEvent) => {
    setPosition(e.target.value);
  };

  const handleChangeStatus = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
  };

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
      const newId = uuidv4();
      await setDoc(doc(db, 'candidates', newId), {
        id: newId,
        name: name,
        email: email,
        phone: phoneNumber,
        favorite: isFavorite,
        position: position,
        github: gitHub,
        linkedin: linkedIn,
        status: status
      });
      closeModal();
      refetchCandidates();
    } catch (err) {}
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
              <InputLabel id="position-select-label">Position</InputLabel>
              <Select
                labelId="position-select-label"
                id="position-select"
                value={position}
                label="Position"
                onChange={handleChangePosition}
              >
                {positions.map((pos) => (
                  <MenuItem key={pos.id} value={pos.id}>
                    {pos.position}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <InputLabel id="status-select-label">{t('Position')}</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={status}
                label="Position"
                onChange={handleChangeStatus}
              >
                {statuses.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.status}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isButtonDisabled}
                  className="bg-bg-modalButton"
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
