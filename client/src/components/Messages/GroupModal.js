import { Modal, Typography, TextField, Box, Button, IconButton, Chip, Avatar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { getUsersBySearch } from '../../actions/user'
import CloseIcon from '@mui/icons-material/Close'

import { createGroupConversation, getConversations } from '../../actions/conversations'
import socket from '../../utils/SocketManager'

export const GroupModal = ({ open, setOpen, searchResult, setSearchResult }) => {
  const classes = useStyles()
  const [groupChat, setGroupChat] = useState({ selectedUsers: [] })
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newConversation = { name: groupChat.chatName, users: JSON.stringify(groupChat.selectedUsers.map((u) => u._id)) }
    await dispatch(createGroupConversation(newConversation))
    dispatch(getConversations(user?._id))
    setGroupChat({ selectedUsers: [] })
    setOpen(false)
    socket.emit('new conversation')
  }

  const handleDelete = (delUser) => {
    setGroupChat({ ...groupChat, selectedUsers: [...groupChat.selectedUsers.filter((sel) => sel._id !== delUser._id)] })
  }

  const handleGroup = (userToAdd) => {
    if (groupChat.selectedUsers.find((user) => user._id === userToAdd._id)){
      return
    }
    if (userToAdd._id === user._id){
      return
    }
    setGroupChat({ ...groupChat, selectedUsers: [...groupChat.selectedUsers, userToAdd] })
    setSearchResult([])
    setSearchQuery('')
  }

  const handleSearch = async (query) => {
    if(!query){
      return
    }
    try{
      await dispatch(getUsersBySearch(query))
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    if (!open) {
      setSearchResult([])
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setSearchQuery('')
    }
  }, [open])


  return (
    <Modal open={open} className={classes.modalupdate}>
      <div className={classes.paper}>
        <div className={classes.newheader}>
          <Typography variant="h6" align="center">
              Group Conversation
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit = {handleSubmit}>
          <div className={classes.renameContainer}>
            <TextField variant='outlined' className={classes.textInput} label='Conversation name' name='title' size='small' fullWidth onChange={(e) => setGroupChat({ ...groupChat, chatName: e.target.value })}></TextField>
          </div>
          <TextField  variant='outlined' className={classes.textInput}
            label='Users' name='title' size='small' fullWidth value = {searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleSearch(e.target.value)
            }}></TextField>
          <Box style={{ width: '92%' }}>
            {searchResult?.slice(0,4).map((user) => (
              <Box className={classes.searchUser} onClick={() => handleGroup(user)} key = {user._id}>
                <Avatar mr={2} size="sm" cursor="pointer" name={user.name} src={user.pic} />
                <Box>
                  <Typography>{user.name}</Typography>
                </Box>
              </Box>
            ))}

          </Box>

          <div style={{ marginTop: '8px' }}>
            {groupChat?.selectedUsers?.map((u) => (
              <Chip variant="outlined" key = {u._id} label={u.name}
                onDelete={() => handleDelete(u)}
                avatar={<Avatar alt={u.name} src={u.picture} />}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Button
              className={classes.buttonSubmit}
              type='submit'
              size='medium'
              variant='contained'
            >
    Create new group
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
