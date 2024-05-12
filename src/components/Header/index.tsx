import { AppBar, Button, Toolbar, Typography } from '@mui/material';

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
        <Typography variant="h6" component="div">
          Header
        </Typography>
        {user && (
          <Button color="inherit" onClick={handleLogOut}>
            {t('logout')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
