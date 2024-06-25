import { AppBar, Button, Input, Toolbar, Typography } from '@mui/material';

import { UserAuthContext } from 'context/UserAuthContext';
import { mock } from 'helpers';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

type HeaderProps = {
  changeValue?: (value: string) => void;
  value?: string;
};

const Header = ({ changeValue = mock, value = '' }: HeaderProps) => {
  const { logOut, user } = useContext(UserAuthContext);
  const { t } = useTranslation();

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);
  };

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
        <Input
          className="text-text-title mx-[30px]"
          value={value}
          onChange={handleChangeValue}
        ></Input>
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
