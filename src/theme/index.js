import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Define base theme with blue color scheme matching the reference image
let theme = createTheme({
  palette: {
    primary: {
      main: "#4285F4", // Google Blue to match the image
      light: "#70A7FF",
      dark: "#1976D2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1E88E5", // Complementary blue
      light: "#6AB7FF",
      dark: "#0277BD",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    warning: {
      main: "#FF9800",
      light: "#FFB74D",
      dark: "#F57C00",
    },
    info: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
    },
    success: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#666666",
      disabled: "#9CA3AF",
    },
    divider: "#E0E0E0",
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(66, 133, 244, 0.04)",
      selected: "rgba(66, 133, 244, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      color: "#1A1A1A",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
      color: "#1A1A1A",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.3,
      color: "#1A1A1A",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.3,
      color: "#1A1A1A",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      color: "#1A1A1A",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.4,
      color: "#1A1A1A",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      color: "#1A1A1A",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      color: "#666666",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
      color: "#666666",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.1)",
    "0px 1px 5px rgba(0, 0, 0, 0.1)",
    "0px 2px 8px rgba(0, 0, 0, 0.1)",
    "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "0px 8px 20px rgba(0, 0, 0, 0.1)",
    // Additional shadows...
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#bbb",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#999",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 22px",
          boxShadow: "none",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            boxShadow: "0px 2px 8px rgba(66, 133, 244, 0.2)",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(66, 133, 244, 0.3)",
          },
        },
        outlined: {
          borderWidth: "1px",
          "&:hover": {
            borderWidth: "1px",
            backgroundColor: "rgba(66, 133, 244, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #E0E0E0",
          overflow: "visible",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4285F4",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4285F4",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 600,
          fontSize: "0.75rem",
          height: 24,
        },
        colorSuccess: {
          backgroundColor: "#D4F5D4",
          color: "#2E7D2E",
        },
        colorWarning: {
          backgroundColor: "#FFF3CD",
          color: "#856404",
        },
        colorError: {
          backgroundColor: "#F8D7DA",
          color: "#721C24",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1A1A1A",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E0E0E0",
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;