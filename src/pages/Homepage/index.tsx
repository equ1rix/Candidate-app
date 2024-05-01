import { Box, Grid } from '@mui/material';

import Candidates from 'components/Candidates';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';

const Homepage = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={3} sm={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} sm={10}>
          <Header />
          <Candidates />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
