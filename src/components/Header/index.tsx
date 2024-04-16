import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => (
  <AppBar position="static" sx={{ bgcolor: '#2C3531' }}>
    <Toolbar>
      <Typography variant="h6" component="div">
        Header
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
