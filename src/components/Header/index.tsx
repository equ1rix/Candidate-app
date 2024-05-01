import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { useUserAuth } from 'context/UserAuthContext';

const Header = () => {
  const { logOut, user } = useUserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  return (
    <AppBar position="static" sx={{ bgcolor: '#2C3531' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Header
        </Typography>
        {user && (
          <Button color="inherit" onClick={handleLogOut}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
