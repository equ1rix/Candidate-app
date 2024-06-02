import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';

import { mock } from 'helpers';

type SidebarProps = {
  onClick?: () => void;
};

const Sidebar = ({ onClick = mock }: SidebarProps) => (
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
      Add new candidate
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

export default Sidebar;
