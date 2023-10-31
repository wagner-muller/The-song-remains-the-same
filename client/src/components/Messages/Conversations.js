import React, { useState, useEffect } from 'react'
import { GroupModal } from './GroupModal'
import { Box, Button, Typography, List, ListItem, ListItemAvatar, Avatar } from '@mui/material'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { getConversations } from '../../actions/conversations'
import { useDispatch } from 'react-redux'
import { ChatState } from '../../context/ChatProvider'
import { deleteMessageNotification } from '../../actions/notifications'
import socket from '../../utils/SocketManager'
import { refreshUser } from '../../actions/auth'
import { resetUsers } from '../../actions/user'

const Conversations = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.user)
  const user = JSON.parse(localStorage.getItem('profile'))
  let { conversations } = useSelector((state) => state.conversation)
  const { selectedConversation, setSelectedConversation } = ChatState()

  const fetchConversations = () => {
    dispatch(getConversations(user?._id))
  }

  useEffect(() => {
    if (!open) {
      dispatch(resetUsers())
    }
  }, [open])

  const handleSelectChat = async (conversation) => {
    setSelectedConversation(conversation)
    const index = user?.conversationNotifications?.findIndex(not => not === conversation._id)

    if (index > -1) {
      await dispatch(deleteMessageNotification(user._id, conversation._id))
      await dispatch(refreshUser())
    }
  }

  useEffect(() => {
    socket.on('new conversation', () => {
      fetchConversations()
    })
  }, [])

  useEffect(() => {
    setSearchResult(users)
  }, [users])

  useEffect(() => {
    fetchConversations()
  },[])

  const getSender = ( users ) => {
    return users[0]._id === user._id ? users[1].name : users[0].name
  }

  return (
    <Box
      className={classes.envoltory}
      sx={{ display: { sm: selectedConversation ? 'none' : 'block', md: 'block' } }}
      width={{ base: '100%', md: '31%' }}
    >
      <Box className={classes.header}>
        Messages
        <Button onClick={() => setOpen(true)} className={classes.button}>Create Group</Button>
        <GroupModal open = {open} setOpen = {setOpen} searchResult={searchResult} setSearchResult={setSearchResult} />
      </Box>
      <Box className={classes.conversations}>
        {conversations ? (
          <List>
            {conversations.map((conversation) => {
              const isNotification = user?.conversationNotifications?.includes(conversation._id)

              return (

                <ListItem className={ conversation._id === selectedConversation?._id ? classes.selected : classes.conversation } key={conversation._id} onClick={() => handleSelectChat(conversation)}>
                  <ListItemAvatar>
                    <Avatar alt={conversation.name} src={conversation.avatarUrl} />
                  </ListItemAvatar>
                  <Typography
                    style={{
                      fontSize: '18px',
                      color: 'black',
                      fontWeight: isNotification ? 'bold' : 'normal'
                    }}
                  >                    {conversation.isGroupChat ? conversation.chatName : getSender(conversation.users)}
                  </Typography>
                </ListItem>
              )
            })}
          </List>
        ) : <div></div>}
      </Box>
    </Box>
  )
}

export default Conversations