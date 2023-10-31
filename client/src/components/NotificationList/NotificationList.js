import createTheme from './styles'
import { Grid } from '@mui/material'
import React from 'react'

export const NotificationList = () => {
  const classes = createTheme()

  return (
    <Grid container className={classes.listContainer} style={{ zIndex: 9999, position: 'absolute' }}>

    </Grid>
  )
}
