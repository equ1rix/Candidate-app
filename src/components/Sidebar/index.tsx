import { Box, Button, Input, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { mock } from 'helpers';

type SidebarProps = {
  onClick?: () => void;
  changeValue?: (value: string) => void;
  value?: string;
};

const Sidebar = ({
  onClick = mock,
  changeValue = mock,
  value = ''
}: SidebarProps) => {
  const { t } = useTranslation();

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);
  };
  return (
    <Box
      className="bg-bg-main"
      sx={{
        height: '100vh',
        m: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography
        variant="h4"
        className="text-text-title"
        sx={{ textAlign: 'center', my: 2 }}
      >
        Candidates-app
      </Typography>
      <Button
        className="bg-bg-button text-text-title mx-[10px]"
        color="inherit"
        onClick={onClick}
      >
        {t('add new cadidates')}
      </Button>
      <Input
        className="text-text-title mx-[30px]"
        value={value}
        onChange={handleChangeValue}
      ></Input>
    </Box>
  );
};

export default Sidebar;
