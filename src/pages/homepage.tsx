import { Box, Grid } from '@mui/material';

import Candidates from '../components/candidates';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

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
