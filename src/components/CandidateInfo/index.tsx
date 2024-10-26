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
  TextField,
  Typography
} from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchPositions } from 'hooks';
import { mock } from 'helpers';
import { db } from 'helpers/firebaseConfig';

import { Candidate } from 'pages/Homepage';
import Label from 'components/Label';

type CandidateInfoProps = {
  onClose: () => void;
  candidate: Candidate | null;
};

const CandidateInfo = ({ onClose = mock, candidate }: CandidateInfoProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [gitHub, setGitHub] = useState<string>('');
  const [linkedIn, setLinkedIn] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [position, setPosition] = useState('');

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
    },
    { label: 'Status', value: status, func: setStatus }
  ];

  const isButtonDisabled =
    name === candidate?.name &&
    email === candidate?.email &&
    phoneNumber === candidate?.phone &&
    gitHub === candidate?.github &&
    linkedIn === candidate?.linkedin &&
    status === candidate?.status &&
    position === candidate?.position &&
    isFavorite === candidate?.favorite;

  useEffect(() => {
    if (candidate) {
      setName(candidate.name || '');
      setEmail(candidate.email || '');
      setPhoneNumber(candidate.phone || '');
      setGitHub(candidate.github || '');
      setLinkedIn(candidate.linkedin || '');
      setStatus(candidate.status ?? true);
      setIsFavorite(candidate.favorite ?? false);
      setPosition(candidate.position || '');
    }
  }, [candidate]);

  const updateCandidateInfo = async (updatedInfo: Partial<Candidate>) => {
    if (candidate) {
      const candidateDocRef = doc(db, 'candidates', candidate.id);
      await updateDoc(candidateDocRef, updatedInfo);
    }
  };

  const handleChangePosition = (e: SelectChangeEvent) => {
    setPosition(e.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateHandler: React.Dispatch<React.SetStateAction<string>>
  ) => stateHandler(e.target.value);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateHandler: React.Dispatch<React.SetStateAction<boolean>>
  ) => stateHandler(e.target.checked);

  const handlerSave = () => {
    updateCandidateInfo({
      name: name,
      email: email,
      phone: phoneNumber,
      github: gitHub,
      linkedin: linkedIn,
      status: status,
      favorite: isFavorite,
      position: position
    });
    onClose();
  };
  return (
    <Box>
      <Grid container direction="column" spacing={2}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ flexGrow: 1, padding: 3 }}
        >
          {t('Candidate Info')}
        </Typography>
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
          <InputLabel id="position-select-label">{t('Position')}</InputLabel>
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
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={handlerSave}
              disabled={isButtonDisabled}
              variant="contained"
              className="bg-bg-modalButton"
            >
              <Label label={t('add')} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateInfo;
