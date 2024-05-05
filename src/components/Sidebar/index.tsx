import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { mainBG, title } from 'helpers/styles';

const Sidebar = () => (
  <Box
    sx={{
      bgcolor: mainBG,
      height: '100vh',
      m: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <Typography variant="h4" sx={{ color: title, textAlign: 'center', my: 2 }}>
      Candidates-app
    </Typography>
    <List>
      <ListItem button>
        <ListItemText primary="First" sx={{ color: title }} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Second" sx={{ color: title }} />
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;
