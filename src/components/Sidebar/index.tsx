import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';

import { mock } from 'helpers';

type SidebarProps = {
  onClick?: () => void;
  changeValue?: (value: string) => void;
  value?: string;
};

const Sidebar = ({
  onClick = mock,
  changeValue = mock,
  value = ''
}: SidebarProps) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);
  };

  return (
    <Box
      className="bg-bg-main"
      sx={{
        height: '100vh',
        m: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography
        variant="h4"
        className="text-text-title"
        sx={{ textAlign: 'center', my: 2 }}
      >
        Candidates-app
      </Typography>
      <Button onClick={onClick}>Add new candidate</Button>
      <Input
        className="text-text-title mx-[30px]"
        value={value}
        onChange={handleChangeValue}
      ></Input>
      <List>
        <ListItem button>
          <ListItemText primary="First" className="text-text-title" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Second" className="text-text-title" />
        </ListItem>
      </List>
    </Box>
  );
};
export default Sidebar;
