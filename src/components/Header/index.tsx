import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { useUserAuth } from 'context/UserAuthContext';

type HeaderProps = {
  isAuthenticated?: boolean;
};

const Header = ({ isAuthenticated = false }: HeaderProps) => {
  const { logOut } = useUserAuth();
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
        {isAuthenticated && (
          <Button color="inherit" onClick={handleLogOut}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
