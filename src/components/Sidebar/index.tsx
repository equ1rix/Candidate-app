import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useFetchPositions } from 'hooks/useFetchPositions';
import { mock } from 'helpers';

import SearchIcon from 'components/Icons/searchIcon';

type SidebarProps = {
  onClick?: () => void;
  changeValue?: (value: string) => void;
  value?: string;
  onPositionChange: (position: string) => void;
};

const Sidebar = ({
  onClick = mock,
  changeValue = mock,
  value = '',
  onPositionChange
}: SidebarProps) => {
  const [position, setPosition] = useState('');
  const { positions } = useFetchPositions();
  const { t } = useTranslation();

  const handleChangePosition = (e: SelectChangeEvent) => {
    setPosition(e.target.value);
    onPositionChange(e.target.value);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);
  };

  return (
    <Box
      className="bg-bg-main p-[15px]"
      sx={{
        height: '100vh',
        m: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography
        variant="h4"
        className="text-text-title"
        sx={{ textAlign: 'center', my: 2 }}
      >
        Candidates-app
      </Typography>
      <Button
        className="bg-bg-button mt-[20px] mb-[35px]"
        color="inherit"
        onClick={onClick}
      >
        {t('add new cadidates')}
      </Button>
      <span className="flex  mb-[30px] items-center">
        <SearchIcon />
        <Input
          className="text-text-title ml-[5px] flex-grow"
          value={value}
          onChange={handleChangeValue}
        ></Input>
      </span>
      <FormControl fullWidth>
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
      </FormControl>
    </Box>
  );
};

export default Sidebar;
