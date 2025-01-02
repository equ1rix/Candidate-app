import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

import { mock } from 'helpers';
import { db } from 'helpers/firebaseConfig';
import { useFetchUsers } from 'hooks/useFetchUsers';
import { Position } from 'hooks/useFetchPositions';
import useUploadCV from 'hooks/useUploadCV';
import { Statuses } from 'hooks/useFetchStatuses';

import Label from 'components/Label';
import Selector from 'components/Selector';
import { Candidate } from 'pages/Homepage';

type CandidateInfoProps = {
  onClose: () => void;
  candidate: Candidate | null;
  statuses: Statuses[];
  positions: Position[];
  ableToEdit: boolean;
};

const CandidateInfo = ({
  onClose = mock,
  candidate,
  positions,
  statuses,
  ableToEdit
}: CandidateInfoProps) => {
  const [candidates, setCandidates] = useState<Candidate | null>(candidate);

  const { users } = useFetchUsers();

  const { uploadCV, uploading, error } = useUploadCV({
    onUploadSuccess: async (url) => {
      setCandidates((prev) => (prev ? { ...prev, cvUrl: url } : null));
      if (candidate) {
        const candidateDocRef = doc(db, 'candidates', candidate.id);
        await updateDoc(candidateDocRef, { cvUrl: url });
      }
    }
  });

  const handleFieldChange = (
    field: keyof Candidate,
    value: string | boolean
  ) => {
    setCandidates((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleAssignedUserChange = (e: SelectChangeEvent) => {
    const userId = e.target.value;
    handleFieldChange('assignedUser', userId);
  };

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
    }
  ];

  const isDisabled =
    JSON.stringify(candidate) === JSON.stringify(candidates) && !uploading;

  const updateCandidateInfo = async (updatedInfo: Partial<Candidate>) => {
    if (candidate) {
      const candidateDocRef = doc(db, 'candidates', candidate.id);
      await updateDoc(candidateDocRef, updatedInfo);
    }
  };

  const handleChangePosition = (e: SelectChangeEvent) => {
    handleFieldChange('position', e.target.value);
  };

  const handleChangeStatus = (e: SelectChangeEvent) => {
    handleFieldChange('status', e.target.value);
  };

  const handleSave = () => {
    if (candidates) {
      updateCandidateInfo(candidates);
      onClose();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      uploadCV(event.target.files[0]);
    }
  };

  return (
    <Box>
      <Grid container direction="column" spacing={2}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" fontWeight="bold" sx={{ padding: 3 }}>
              {t('Candidate Info')}
            </Typography>
          </Grid>

          <Selector
            title="Assigned User"
            items={users}
            value={candidates?.assignedUser || null}
            getItemTitle={(user: any) => user.name}
            handleChange={handleAssignedUserChange}
          />
        </Grid>
        {arrayDataInput.map((el, index) => (
          <Grid key={index} item xs={12}>
            <FormControl fullWidth>
              <TextField
                label={el.label}
                variant="outlined"
                name={el.name}
                value={el.value}
                onChange={(e) => el.func(e.target.value)}
                disabled={!ableToEdit}
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
                  disabled={!ableToEdit}
                />
              }
              label={el.label}
            />
          </Grid>
        ))}
        <Selector
          title="Position"
          items={positions}
          value={candidates?.position || null}
          handleChange={handleChangePosition}
        />
        <Selector
          title="Status"
          items={statuses}
          value={candidates?.status || null}
          handleChange={handleChangeStatus}
        />
        <Grid item className="mt-4">
          <Box className="border border-gray-300 p-4 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-semibold mb-2">
              Upload CV
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-100 file:text-indigo-700
                  hover:file:bg-indigo-200"
              disabled={!ableToEdit}
            />
            {uploading && (
              <Typography variant="body2" className="text-blue-500 mt-2">
                Uploading...
              </Typography>
            )}
            {error && (
              <Typography color="error" className="text-red-500 mt-2">
                Error uploading file
              </Typography>
            )}
            {candidates?.cvUrl && (
              <Typography className="mt-4">
                <a
                  href={candidates?.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold underline hover:text-indigo-800"
                >
                  Download CV
                </a>
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={handleSave}
              disabled={isDisabled || !ableToEdit}
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
