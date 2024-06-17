import { Grid, Typography } from '@mui/material';

import { Candidate } from 'pages/Homepage';

type CandidatesProps = {
  candidatesToShow: Candidate[];
};

const Candidates = ({ candidatesToShow = [] }: CandidatesProps) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      className="bg-bg-modal"
      sx={{
        p: '10px',
        height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
      }}
    >
      {candidatesToShow.map((candidate) => (
        <Grid
          item
          key={candidate.id}
          className="bg-text-title"
          sx={{
            p: '15px',
            marginBottom: '10px',
            width: '100%',
            minHeight: '40px',
            fontSize: '20px',
            fontWeight: 'bold',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Grid container alignItems="center">
            <Typography sx={{ width: '150px', marginRight: '10px' }}>
              {candidate.name}
            </Typography>
            <Typography sx={{ width: '270px', marginRight: '50px' }}>{candidate.email}</Typography>
            <Typography sx={{ width: '250px' }}>{candidate.phone}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Candidates;
