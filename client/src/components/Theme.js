// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Primary color
        },
        secondary: {
            main: '#dc004e', // Secondary color
        },
        error: {
            main: '#f44336', // Error color
        },
        warning: {
            main: '#ff9800', // Warning color
        },
        info: {
            main: '#2196f3', // Info color
        },
        success: {
            main: '#4caf50', // Success color
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
    },
    spacing: 4, // Custom spacing
});

export default theme;