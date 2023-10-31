import React from 'react'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import { Container, Box, Grid, useMediaQuery } from '@mui/material'

function Main() {
  const isLargeScreen = useMediaQuery('(min-width: 850px)')

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={isLargeScreen ? 4 : 2}>
        <Grid item xs={12} sm={12} md = {8}>
          <Box sx={{ marginBottom: isLargeScreen ? '20px' : '0px' }}>
            <Posts />
          </Box>
        </Grid>
        {isLargeScreen && (
          <Grid item xs={false} md = {4}>
            <Box >
              <Form />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default Main