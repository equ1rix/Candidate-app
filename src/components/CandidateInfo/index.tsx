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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchPositions } from 'hooks/useFetchPositions';
import { mock } from 'helpers';
import { db } from 'helpers/firebaseConfig';
import { Candidate } from 'pages/Homepage';
import Label from 'components/Label';

type CandidateInfoProps = {
  onClose: () => void;
  candidate: Candidate | null;
};

const CandidateInfo = ({ onClose = mock, candidate }: CandidateInfoProps) => {
  const [candidates, setCandidates] = useState<Candidate | null>(candidate);

  const handleFieldChange = (
    field: keyof Candidate,
    value: string | boolean
  ) => {
    setCandidates((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const { positions } = useFetchPositions();
  const { t } = useTranslation();

  const arrayDataInput = [
    {
      label: 'Name',
      name: 'name',
      value: candidates?.name,
      func: (value: string) => handleFieldChange('name', value)
    },
    {
      label: 'Email',
      name: 'email',
      value: candidates?.email,
      func: (value: string) => handleFieldChange('email', value)
    },
    {
      label: 'Phone',
      name: 'phone',
      value: candidates?.phone,
      func: (value: string) => handleFieldChange('phone', value)
    },
    {
      label: 'GitHub',
      name: 'github',
      value: candidates?.github,
      func: (value: string) => handleFieldChange('github', value)
    },
    {
      label: 'LinkedIn',
      name: 'linkedin',
      value: candidates?.linkedin,
      func: (value: string) => handleFieldChange('linkedin', value)
    }
  ];

  const arrayDataCheckbox = [
    {
      label: 'Favorite',
      value: candidates?.favorite,
      func: (value: boolean) => handleFieldChange('favorite', value)
    },
    {
      label: 'Status',
      value: candidates?.status,
      func: (value: boolean) => handleFieldChange('status', value)
    }
  ];

  const isButtonDisabled =
    JSON.stringify(candidate) === JSON.stringify(candidates);

  const updateCandidateInfo = async (updatedInfo: Partial<Candidate>) => {
    if (candidate) {
      const candidateDocRef = doc(db, 'candidates', candidate.id);
      await updateDoc(candidateDocRef, updatedInfo);
    }
  };

  const handleChangePosition = (e: SelectChangeEvent) => {
    handleFieldChange('position', e.target.value);
  };

  const handleSave = () => {
    if (candidates) {
      updateCandidateInfo(candidates);
      onClose();
    }
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
                onChange={(e) => el.func(e.target.value)}
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
                  onChange={(e) => el.func(e.target.checked)}
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
            value={candidates?.position}
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
              onClick={handleSave}
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
