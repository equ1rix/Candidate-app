import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { mock } from 'helpers';

type SidebarProps = {
  onClick?: () => void;
};

const Sidebar = ({ onClick = mock }: SidebarProps) => {
  const { t } = useTranslation();

  return(
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
      {t("add new cadidates")}
    </Button>
    <List>
      <ListItem button>
        <ListItemText primary="First" className="text-text-title" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Second" className="text-text-title" />
      </ListItem>
    </List>
  </Box>
);
}
export default Sidebar;
