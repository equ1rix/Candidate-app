import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Rubik", sans-serif'
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Rubik", sans-serif'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Rubik", sans-serif'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: '"Rubik", sans-serif'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Rubik", sans-serif'
        }
      }
    }
  }
});

export default theme;
