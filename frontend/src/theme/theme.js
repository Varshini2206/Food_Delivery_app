import { createTheme } from '@mui/material/styles';

// FoodieExpress Color Palette
const colors = {
  primary: {
    50: '#fff3f3',
    100: '#ffe6e6',
    200: '#ffcccc',
    300: '#ffb3b3',
    400: '#ff9999',
    500: '#ff6b6b', // Main brand color
    600: '#ff5252',
    700: '#ff1744',
    800: '#d50000',
    900: '#b71c1c',
  },
  secondary: {
    50: '#f9fbe7',
    100: '#f0f4c3',
    200: '#e6ee9c',
    300: '#dce775',
    400: '#d4e157',
    500: '#cddc39', // Accent color
    600: '#c0ca33',
    700: '#afb42b',
    800: '#9e9d24',
    900: '#827717',
  },
  success: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  warning: {
    500: '#ff9800',
  },
  error: {
    500: '#f44336',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#f8f9fa',
    paper: '#ffffff',
    secondary: '#f5f5f5',
  }
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: '#000000',
    },
    success: {
      main: colors.success[500],
      light: colors.success[300],
      dark: colors.success[700],
    },
    warning: {
      main: colors.warning[500],
    },
    error: {
      main: colors.error[500],
    },
    grey: colors.grey,
    background: colors.background,
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.grey[900],
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: colors.grey[700],
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: colors.grey[600],
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    '0px 20px 40px rgba(0, 0, 0, 0.18)',
    '0px 24px 48px rgba(0, 0, 0, 0.2)',
    '0px 28px 56px rgba(0, 0, 0, 0.22)',
    '0px 32px 64px rgba(0, 0, 0, 0.25)',
    '0px 36px 72px rgba(0, 0, 0, 0.28)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 44px 88px rgba(0, 0, 0, 0.32)',
    '0px 48px 96px rgba(0, 0, 0, 0.35)',
    '0px 52px 104px rgba(0, 0, 0, 0.38)',
    '0px 56px 112px rgba(0, 0, 0, 0.4)',
    '0px 60px 120px rgba(0, 0, 0, 0.42)',
    '0px 64px 128px rgba(0, 0, 0, 0.45)',
    '0px 68px 136px rgba(0, 0, 0, 0.48)',
    '0px 72px 144px rgba(0, 0, 0, 0.5)',
    '0px 76px 152px rgba(0, 0, 0, 0.52)',
    '0px 80px 160px rgba(0, 0, 0, 0.55)',
    '0px 84px 168px rgba(0, 0, 0, 0.58)',
    '0px 88px 176px rgba(0, 0, 0, 0.6)',
    '0px 92px 184px rgba(0, 0, 0, 0.62)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${colors.primary[500]}, ${colors.primary[400]})`,
          '&:hover': {
            background: `linear-gradient(45deg, ${colors.primary[600]}, ${colors.primary[500]})`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(45deg, ${colors.secondary[500]}, ${colors.secondary[400]})`,
          color: colors.grey[900],
          '&:hover': {
            background: `linear-gradient(45deg, ${colors.secondary[600]}, ${colors.secondary[500]})`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${colors.grey[200]}`,
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary[300],
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary[500],
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
        colorPrimary: {
          background: `linear-gradient(45deg, ${colors.primary[500]}, ${colors.primary[400]})`,
          color: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: colors.grey[900],
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 16px 16px 0',
          border: 'none',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${colors.grey[200]}`,
          boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;