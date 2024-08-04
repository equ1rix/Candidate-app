import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Drawer,
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

import { useFetchPositions } from 'hooks';
import { mock } from 'helpers';
import { db } from 'helpers/firebaseConfig';
import { Candidate } from 'pages/Homepage';

import CloseIcon from 'components/Icons/closeIcon';
import Label from 'components/Label';

type CandidateDrawerProps = {
  onClose: () => void;
  candidate: Candidate | null;
};

const CandidateDrawer = ({
  onClose = mock,
  candidate
}: CandidateDrawerProps) => {
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
    <Drawer
      anchor="right"
      open={!!candidate}
      onClose={onClose}
      transitionDuration={300}
      sx={{
        '& .MuiDrawer-paper': {
          width: {
            xs: '100%',
            md: '66.67%',
            lg: '66.67%',
            xl: '66.67%'
          }
        }
      }}
    >
      <Box className="p-4">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: '30px' }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
            {t('Candidate info')}
          </Typography>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </Grid>
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
      </Box>
    </Drawer>
  );
};

export default CandidateDrawer;
