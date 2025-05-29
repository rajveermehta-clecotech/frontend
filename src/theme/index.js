import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Berry color palette - exact match
const berryPalette = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Main primary
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    A100: '#82b1ff',
    A200: '#448aff',
    A400: '#2979ff',
    A700: '#2962ff',
  },
  secondary: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0', // Main secondary
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
    A100: '#ea80fc',
    A200: '#e040fb',
    A400: '#d500f9',
    A700: '#aa00ff',
  },
  success: {
    50: '#e8f5e8',
    100: '#c8e6c8',
    200: '#a5d6a5',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50', // Main success
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  warning: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800', // Main warning
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
  },
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336', // Main error
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
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
};

// Create Berry theme with light and dark mode support
let theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          light: berryPalette.primary[300],
          main: berryPalette.primary[500],
          dark: berryPalette.primary[700],
          contrastText: '#FFFFFF',
        },
        secondary: {
          light: berryPalette.secondary[300],
          main: berryPalette.secondary[500],
          dark: berryPalette.secondary[700],
          contrastText: '#FFFFFF',
        },
        error: {
          light: berryPalette.error[300],
          main: berryPalette.error[500],
          dark: berryPalette.error[700],
          contrastText: '#FFFFFF',
        },
        warning: {
          light: berryPalette.warning[300],
          main: berryPalette.warning[500],
          dark: berryPalette.warning[700],
          contrastText: '#FFFFFF',
        },
        info: {
          light: berryPalette.primary[300],
          main: berryPalette.primary[500],
          dark: berryPalette.primary[700],
          contrastText: '#FFFFFF',
        },
        success: {
          light: berryPalette.success[300],
          main: berryPalette.success[500],
          dark: berryPalette.success[700],
          contrastText: '#FFFFFF',
        },
        text: {
          primary: berryPalette.grey[900],
          secondary: berryPalette.grey[600],
          disabled: berryPalette.grey[400],
        },
        divider: berryPalette.grey[200],
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
        action: {
          active: berryPalette.grey[600],
          hover: 'rgba(33, 150, 243, 0.04)',
          selected: 'rgba(33, 150, 243, 0.08)',
          disabled: berryPalette.grey[300],
          disabledBackground: berryPalette.grey[100],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          light: berryPalette.primary[300],
          main: berryPalette.primary[400],
          dark: berryPalette.primary[600],
          contrastText: '#FFFFFF',
        },
        secondary: {
          light: berryPalette.secondary[300],
          main: berryPalette.secondary[400],
          dark: berryPalette.secondary[600],
          contrastText: '#FFFFFF',
        },
        error: {
          light: berryPalette.error[300],
          main: berryPalette.error[400],
          dark: berryPalette.error[600],
          contrastText: '#FFFFFF',
        },
        warning: {
          light: berryPalette.warning[300],
          main: berryPalette.warning[400],
          dark: berryPalette.warning[600],
          contrastText: '#000000',
        },
        info: {
          light: berryPalette.primary[300],
          main: berryPalette.primary[400],
          dark: berryPalette.primary[600],
          contrastText: '#FFFFFF',
        },
        success: {
          light: berryPalette.success[300],
          main: berryPalette.success[400],
          dark: berryPalette.success[600],
          contrastText: '#000000',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        action: {
          active: '#ffffff',
          hover: 'rgba(255, 255, 255, 0.04)',
          selected: 'rgba(255, 255, 255, 0.08)',
          disabled: 'rgba(255, 255, 255, 0.26)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21,
      '@media (max-width:600px)': {
        fontSize: '1.875rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
      fontWeight: 400,
    },
    overline: {
      lineHeight: 1.66,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'var(--mui-palette-grey-100)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--mui-palette-grey-400)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'var(--mui-palette-grey-600)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'capitalize',
          fontWeight: 500,
          padding: '8px 22px',
          fontSize: '0.875rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'var(--mui-palette-text-primary)',
          boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
          border: '1px solid var(--mui-palette-divider)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '20px',
          '&:last-child': {
            paddingBottom: '20px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'var(--mui-palette-background-paper)',
            '& fieldset': {
              borderColor: 'var(--mui-palette-divider)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mui-palette-primary-main)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mui-palette-primary-main)',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--mui-palette-text-secondary)',
          },
          '& .MuiInputBase-input': {
            color: 'var(--mui-palette-text-primary)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-background-paper)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: 'var(--mui-palette-grey-50)',
            color: 'var(--mui-palette-text-secondary)',
            '[data-toolpad-color-scheme="dark"] &': {
              backgroundColor: 'var(--mui-palette-grey-900)',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-primary)',
          borderColor: 'var(--mui-palette-divider)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'var(--mui-palette-text-primary)',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'var(--mui-palette-background-paper)',
          borderRight: '1px solid var(--mui-palette-divider)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '0 12px 4px 12px',
          color: 'var(--mui-palette-text-primary)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
          '&.Mui-selected': {
            backgroundColor: 'var(--mui-palette-primary-main)',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'var(--mui-palette-primary-dark)',
            },
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
        colorSuccess: {
          backgroundColor: 'var(--mui-palette-success-light)',
          color: 'var(--mui-palette-success-dark)',
        },
        colorWarning: {
          backgroundColor: 'var(--mui-palette-warning-light)',
          color: 'var(--mui-palette-warning-dark)',
        },
        colorError: {
          backgroundColor: 'var(--mui-palette-error-light)',
          color: 'var(--mui-palette-error-dark)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'var(--mui-palette-grey-200)',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.875rem',
          backgroundColor: 'var(--mui-palette-primary-main)',
          color: '#ffffff',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-primary)',
        },
        h1: {
          color: 'var(--mui-palette-text-primary)',
        },
        h2: {
          color: 'var(--mui-palette-text-primary)',
        },
        h3: {
          color: 'var(--mui-palette-text-primary)',
        },
        h4: {
          color: 'var(--mui-palette-text-primary)',
        },
        h5: {
          color: 'var(--mui-palette-text-primary)',
        },
        h6: {
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-background-paper)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-divider)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-primary-main)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-primary-main)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'var(--mui-palette-text-primary)',
          border: '1px solid var(--mui-palette-divider)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-primary)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
          '&.Mui-selected': {
            backgroundColor: 'var(--mui-palette-action-selected)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          backgroundColor: 'var(--mui-palette-success-light)',
          color: 'var(--mui-palette-success-dark)',
        },
        standardError: {
          backgroundColor: 'var(--mui-palette-error-light)',
          color: 'var(--mui-palette-error-dark)',
        },
        standardWarning: {
          backgroundColor: 'var(--mui-palette-warning-light)',
          color: 'var(--mui-palette-warning-dark)',
        },
        standardInfo: {
          backgroundColor: 'var(--mui-palette-info-light)',
          color: 'var(--mui-palette-info-dark)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-secondary)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: 'var(--mui-palette-text-secondary)',
          },
          '& .MuiFormHelperText-root': {
            color: 'var(--mui-palette-text-secondary)',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-secondary)',
        },
      },
    },
    // MUI Toolpad specific components
    MuiAppProvider: {
      styleOverrides: {
        root: {
          '& .MuiDashboardLayout-root': {
            backgroundColor: 'var(--mui-palette-background-default)',
          },
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;