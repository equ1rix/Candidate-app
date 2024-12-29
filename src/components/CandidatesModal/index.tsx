import { useContext, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { db } from 'helpers/firebaseConfig';
import { mock } from 'helpers';
import { ModalContext } from 'context/ModalTaskContext';

import CustomModal from 'components/CustomModal';
import Label from 'components/Label';
import { Position } from 'hooks/useFetchPositions';
import { Statuses } from 'hooks/useFetchStatuses';
import useUploadCV from 'hooks/useUploadCV';
import { useFetchUsers } from 'hooks/useFetchUsers';
import Selector from 'components/Selector';

type CandidatesModalProps = {
  onClose: () => void;
  positions: Position[];
  statuses: Statuses[];
};

const CandidatesModal = ({
  onClose = mock,
  statuses,
  positions
}: CandidatesModalProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [gitHub, setGitHub] = useState<string>('');
  const [linkedIn, setLinkedIn] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { closeModal, isOpenModal } = useContext(ModalContext);
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [assignedUser, setAssignedUser] = useState<string | undefined>(
    undefined
  );

  const { users } = useFetchUsers();

  const { uploadCV, uploading, error } = useUploadCV({
    onUploadSuccess: (url) => setCvUrl(url)
  });

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

  const isButtonDisabled = !name || !email;
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

  const handleUserChange = (e: SelectChangeEvent) => {
    setAssignedUser(e.target.value);
  };

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
        status: status,
        cvUrl: cvUrl,
        assignedUser: assignedUser
      });
      closeModal();
    } catch (err) {}
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      uploadCV(event.target.files[0]);
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
            <Selector
              title="Position"
              items={positions}
              value={position}
              handleChange={handleChangePosition}
            />
            <Selector
              title="Status"
              items={statuses}
              value={status}
              handleChange={handleChangeStatus}
            />
            <Selector
              title="User"
              items={users}
              value={assignedUser}
              handleChange={handleUserChange}
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
                {cvUrl && (
                  <Typography className="mt-4">
                    <a
                      href={cvUrl}
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
                  type="submit"
                  variant="contained"
                  disabled={isButtonDisabled}
                  className="bg-bg-modalButton"
                >
                  <Label label={t('Save')} />
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
