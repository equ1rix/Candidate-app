import { Typography } from '@mui/material';

type LabelProps = {
  label: string;
};

const Label = ({ label = '' }: LabelProps) => (
  <Typography className="text-text-title" variant="body1" component="label">
    {label}
  </Typography>
);

export default Label;
