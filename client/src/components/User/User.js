import React, { useEffect } from 'react'
import { Paper, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../actions/user'
import SingleUser from './SingleUser'

const User = () => {
  const { isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getUser(id))
  }, [id, dispatch])

  if (isLoading) {
    return (
      <Paper elevation={6} style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }
  return(

    <SingleUser />
  )
}

export default User