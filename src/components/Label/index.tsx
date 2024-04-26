import React from 'react';

import { Typography } from '@mui/material';

type LabelProps = {
  label: string;
};

const Label = ({ label = '' }: LabelProps) => (
  <Typography sx={{ color: '#D1E8E2' }} variant="body1" component="label">
    {label}
  </Typography>
);

export default Label;
