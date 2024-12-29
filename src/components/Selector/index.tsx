import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type SelectorProps = {
  items: { id: string | number; title?: string; name?: string }[];
  value: string | undefined;
  handleChange: (e: SelectChangeEvent) => void;
  title?: string;
  getItemTitle?: (item: {
    id: string | number;
    title?: string;
    name?: string;
  }) => string;
};

const Selector = ({
  items = [],
  value,
  handleChange,
  title = '',
  getItemTitle = (item) => item.title || item.name || ''
}: SelectorProps) => {
  const { t } = useTranslation();

  return (
    <Grid item>
      <InputLabel id="status-select-label">{t(title)}</InputLabel>
      <Select
        className="min-w-[130px]"
        labelId="status-select-label"
        id="status-select"
        value={value}
        label="Position"
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {getItemTitle(item)}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export default Selector;
