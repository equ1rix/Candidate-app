import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

import { Candidate } from 'pages/Homepage';

type CandidatesProps = {
  candidatesToShow: Candidate[];
  currentPage: number;
  setCurrentPage: (num: number) => void;
  totalPages: number;
};

const Candidates = ({
  candidatesToShow = [],
  currentPage = 1,
  setCurrentPage,
  totalPages = 1
}: CandidatesProps) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      className="bg-bg-modal"
      sx={{
        p: '10px',
        height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        position: 'relative'
      }}
    >
      {candidatesToShow.map((candidate) => (
        <Grid
          item
          key={candidate.id}
          className="bg-text-title"
          sx={{
            p: '8px',
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
            <Table
              size="small"
              sx={{
                width: '100%',
                tableLayout: 'fixed'
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className="text-bg-highlightButton text-sm">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-bg-highlightButton text-sm">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-bg-highlightButton text-sm">
                      Phone
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography>{candidate.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{candidate.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{candidate.phone}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      ))}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          position: 'absolute',
          bottom: '20px',
          width: '400px',
          left: 'calc(50% - 200px)'
        }}
      >
        <IconButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <ArrowBack />
        </IconButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            color="inherit"
            variant={currentPage === index + 1 ? 'contained' : 'outlined'}
            onClick={() => handlePageChange(index + 1)}
            sx={{ margin: '0px 5px' }}
          >
            {index + 1}
          </Button>
        ))}
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowForward />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Candidates;
