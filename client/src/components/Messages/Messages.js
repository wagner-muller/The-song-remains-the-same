import React from 'react'
import ConversationBox from './ConversationBox'
import { Box } from '@mui/material'
import Conversations from './Conversations'

function Messages() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" width="100%" height="91.5vh" padding="10px">
        <Conversations />
        <ConversationBox />
      </Box>
    </div>
  )
}

export default Messages