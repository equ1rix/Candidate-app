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
  const titleTable = ['Name', 'Email', 'Position', 'Status'];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { candidates, totalPages } = useFetchCandidates(
    currentPage,
    searchQuery,
    selectedPosition
  );

  const dataChecker = (data: any) => {
    switch (data) {
      case 'ABilLrZKKygm3Sts1I8P':
        return { styles: 'text-statuses-rejected', title: 'Rejected' };
      case '2TN55EViMC2loq3lr2gQ':
        return { styles: 'text-statuses-new', title: 'New' };
      case 'f2mM6DIyC7YMJspJyZHh':
        return { styles: 'text-statuses-inProgress', title: 'In Process' };
      case 'sz10JTSFGflscN1N9GJq':
        return { styles: 'text-statuses-hired', title: 'Hired' };
      case '0':
        return { styles: 'text-gray-400', title: 'Without Status' };
      case '07Z0KhqvPQIHpUvw6Al7':
        return { styles: '', title: 'Java' };
      case 'Uk9ASYyoKnbZKf65jBsV':
        return { styles: '', title: 'Python' };
      case 'NMl0pzb6aKy4oiaRFIrM':
        return { styles: '', title: 'JavaScript' };
      case 'All positions':
        return { styles: '', title: 'Without Position' };
      default:
        return { styles: '', title: data };
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              <TableRow
                key={candidate.id}
                className="bg-bg-main hover:bg-bg-button transition duration-300 ease-in-out"
              >
                {[
                  candidate.name,
                  candidate.email,
                  candidate.position,
                  candidate.status
                ].map((data, index) => {
                  const { styles, title } = dataChecker(data);
                  return (
                    <TableCell
                      onClick={handlerOpenDrawer(candidate.id)}
                      key={index}
                      className="border-black border-opacity-[0.2] border-y-2 p-[12px]"
                    >
                      <Typography
                        className={styles}
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {title}
                      </Typography>
                    </TableCell>
                  );
                })}
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
            variant={currentPage === index + 1 ? 'outlined' : 'contained'}
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
