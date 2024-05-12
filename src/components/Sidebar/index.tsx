import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const Sidebar = () => (
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
