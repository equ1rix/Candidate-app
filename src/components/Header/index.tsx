import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { mainBG } from 'helpers/styles';
import { UserAuthContext } from 'context/UserAuthContext';
import { useContext } from 'react';

const Header = () => {
  const { logOut, user } = useContext(UserAuthContext);
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      alert((error as Error).message);
    }
  };
  return (
    <AppBar position="static" sx={{ bgcolor: mainBG }}>
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
