import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useTranslation } from 'react-i18next';

import { UserAuthContext } from 'context/UserAuthContext';

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { logOut } = useContext(UserAuthContext);
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
