import { AppBar, Box, Button, Toolbar } from '@mui/material';

import { UserAuthContext } from 'context/UserAuthContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { logOut, user } = useContext(UserAuthContext);
  const { t } = useTranslation();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <AppBar position="static" className="bg-bg-main">
      <Toolbar>
        {user && (
          <Box
            sx={{
              position: 'absolute',
              right: 16,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Button
              className="bg-bg-button text-text-title"
              color="inherit"
              onClick={handleLogOut}
            >
              {t('logout')}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
