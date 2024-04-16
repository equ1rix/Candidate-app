import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const Sidebar = () => (
  <Box
    sx={{
      bgcolor: '#2C3531',
      height: '100vh',
      m: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <Typography
      variant="h4"
      sx={{ color: '#D1E8E2', textAlign: 'center', my: 2 }}
    >
      Candidates-app
    </Typography>
    <List>
      <ListItem button>
        <ListItemText primary="First" sx={{ color: '#D1E8E2' }} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Second" sx={{ color: '#D1E8E2' }} />
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;
