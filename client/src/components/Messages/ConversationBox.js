import React from 'react'
import { Box } from '@mui/material'
import SingleConversation from './SingleConversation'
import useStyles from './styles'
import { ChatState } from '../../context/ChatProvider'


const ConversationBox = () => {
  const classes = useStyles()
  const { selectedConversation } = ChatState()

  return (
    <Box className={classes.messagebox}  sx={{ display: { sm: selectedConversation ? 'block' : 'none', md: 'block' } }}>
      <SingleConversation />
    </Box>
  )
}

export default ConversationBox