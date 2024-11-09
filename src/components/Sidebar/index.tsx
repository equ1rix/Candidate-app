import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Position } from 'hooks/useFetchPositions';
import { mock } from 'helpers';

import SearchIcon from 'components/Icons/searchIcon';
import { Statuses } from 'hooks/useFetchStatuses';

type SidebarProps = {
  onClick?: () => void;
  changeValue?: (value: string) => void;
  value?: string;
  onPositionChange: (position: string) => void;
  onStatusChange: (position: string) => void;
  positions: Position[];
  statuses: Statuses[];
  onFavoriteChange: (favorite: boolean) => void;
  isFavorite: boolean;
};

const Sidebar = ({
  onClick = mock,
  changeValue = mock,
  value = '',
  onPositionChange,
  onStatusChange,
  positions,
  statuses,
  onFavoriteChange,
  isFavorite
}: SidebarProps) => {
  const [position, setPosition] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const { t } = useTranslation();

  const handleChangePosition = (e: SelectChangeEvent) => {
    setPosition(e.target.value);
    onPositionChange(e.target.value);
  };

  const handleChangeStatus = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    onStatusChange(e.target.value);
  };

  const handleChangeFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFavoriteChange(e.target.checked);
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
      <span className="flex  mb-[30px] items-center">
        <FormControl fullWidth>
          <InputLabel id="position-select-label">Position</InputLabel>
          <Select
            labelId="position-select-label"
            id="position-select"
            value={position}
            label="Position"
            onChange={handleChangePosition}
          >
            {positions.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.position}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </span>
      <FormControl fullWidth>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={status}
          label="Status"
          onChange={handleChangeStatus}
        >
          {statuses.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox checked={isFavorite} onChange={handleChangeFavorite} />
        }
        label="Favorite"
      />
    </Box>
  );
};

export default Sidebar;
