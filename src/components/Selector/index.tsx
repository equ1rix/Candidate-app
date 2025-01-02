import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';

type SelectorProps = {
  items: any;
  value: string | null;
  handleChange: (e: SelectChangeEvent) => void;
  title?: string;
};

const getItemTitle = (item: any) => item.title || item.name || '';

const Selector = ({
  items = [],
  value,
  handleChange,
  title = ''
}: SelectorProps) => {
  return (
    <Grid item>
      <InputLabel id="status-select-label">{title}</InputLabel>
      <Select
        className="min-w-[130px]"
        labelId="status-select-label"
        id="status-select"
        value={value || ''}
        label="Position"
        onChange={handleChange}
      >
        {items.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {getItemTitle(item)}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export default Selector;
