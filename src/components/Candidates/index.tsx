import { useState } from 'react';
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

import { useFetchCandidates } from 'hooks/useFetchCandidates';
import { mock } from 'helpers';

import { Candidate } from 'pages/Homepage';

type CandidatesProps = {
  candidatesToShow: Candidate[];
  openDrawer: (id: string) => void;
  searchQuery: string;
  selectedPosition: string;
};

const Candidates = ({
  searchQuery,
  selectedPosition,
  openDrawer = mock
}: CandidatesProps) => {
  const titleTable = ['Name', 'Email', 'Phone'];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { candidates, totalPages } = useFetchCandidates(
    currentPage,
    searchQuery,
    selectedPosition
  );
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

  const handlerOpenDrawer = (id: string) => () => openDrawer(id);
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      sx={{
        p: '10px',
        height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        position: 'relative'
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
              {titleTable.map((el) => (
                <TableCell key={el}>
                  <Typography className="text-bg-highlightButton text-sm">
                    {el}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id} className="bg-bg-main">
                {[candidate.name, candidate.email, candidate.phone].map(
                  (data, index) => (
                    <TableCell
                      onClick={handlerOpenDrawer(candidate.id)}
                      key={index}
                      className="border-black border-opacity-[0.2] border-y-2 p-[12px] "
                    >
                      <Typography>{data}</Typography>
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

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
            className="bg-bg-modalSecondButton"
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
