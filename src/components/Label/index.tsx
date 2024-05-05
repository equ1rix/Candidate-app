import React from 'react';

import { Typography } from '@mui/material';
import { title } from 'helpers/styles';

type LabelProps = {
  label: string;
};

const Label = ({ label = '' }: LabelProps) => (
  <Typography sx={{ color: title }} variant="body1" component="label">
    {label}
  </Typography>
);

export default Label;
