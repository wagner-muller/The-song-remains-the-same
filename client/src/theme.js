import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
          width: '65%',
          margin: '8px'
        },
      },
    },
  },
})