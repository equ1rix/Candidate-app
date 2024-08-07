import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

import { mock } from 'helpers';
import { Candidate } from 'pages/Homepage';

import CloseIcon from 'components/Icons/closeIcon';
import CandidateInfo from 'components/CandidateInfo';
import CandidateComments from 'components/CandidateComments';

type CandidateDrawerProps = {
  onClose: () => void;
  candidate: Candidate | null;
};

const CandidateDrawer = ({
  onClose = mock,
  candidate
}: CandidateDrawerProps) => {
  const [tab, setTab] = useState<number>(0);
  const { t } = useTranslation();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Drawer
      anchor="right"
      open={!!candidate}
      onClose={onClose}
      transitionDuration={300}
      sx={{
        '& .MuiDrawer-paper': {
          width: {
            xs: '100%',
            md: '66.67%',
            lg: '66.67%',
            xl: '66.67%'
          }
        }
      }}
    >
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        aria-label="basic tabs example"
      >
        <Tab label="Info" value={0} />
        <Tab label="Comments" value={1} />
      </Tabs>

      <Box className="p-4">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: '30px' }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
            {tab == 0 ? t('Candidate Info') : t('Comments')}
          </Typography>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </Grid>
        {tab === 0 && <CandidateInfo candidate={candidate} onClose={onClose} />}
        {tab === 1 && candidate?.id != undefined && (
          <CandidateComments candidateId={candidate?.id} />
        )}
      </Box>
    </Drawer>
  );
};

export default CandidateDrawer;
