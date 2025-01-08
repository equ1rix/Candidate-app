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

import { mock } from 'helpers';
import { Position } from 'hooks/useFetchPositions';
import { Statuses } from 'hooks/useFetchStatuses';

import SearchIcon from 'components/Icons/searchIcon';

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
  permissions: { [key: string]: boolean };
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
  isFavorite,
  permissions
}: SidebarProps) => {
  const [position, setPosition] = useState<string>('all_positions');
  const [status, setStatus] = useState<string>('all_statuses');

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

  const handleClear = () => {
    onPositionChange('all_positions');
    onStatusChange('all_statuses');
    onFavoriteChange(false);
    setPosition('all_positions');
    setStatus('all_statuses');
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
        Candidates app
      </Typography>
      <Button
        className="bg-bg-button text-white mt-[20px] mb-[35px]"
        onClick={onClick}
        disabled={!permissions.create}
      >
        {t('Add new cadidates')}
      </Button>
      <span className="flex  mb-[30px] items-center">
        <SearchIcon />
        <Input
          className="text-text-title ml-[5px] flex-grow"
          value={value}
          onChange={handleChangeValue}
          disabled={!permissions.search}
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
            disabled={!permissions.search}
          >
            {positions.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.title}
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
          disabled={!permissions.search}
        >
          {statuses.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={isFavorite}
            onChange={handleChangeFavorite}
            disabled={!permissions.search}
          />
        }
        label="Favorite"
      />
      <FormControl fullWidth>
        <Button
          className="bg-bg-button text-white mt-[20px] w-[100px]"
          onClick={handleClear}
          disabled={!permissions.search}
        >
          {t('Clear')}
        </Button>
      </FormControl>
    </Box>
  );
};

export default Sidebar;
