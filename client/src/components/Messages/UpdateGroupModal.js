import { Box, Chip, IconButton, Modal, TextField, Button, Typography, Avatar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'
import useStyles from './styles'
import { getUsersBySearch, resetUsers } from '../../actions/user'
import { ChatState } from '../../context/ChatProvider'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getConversations, addUserConversation, removeUserGroup, renameConversation } from '../../actions/conversations'

const UpdateGroupModal = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [searchResults, setSearchResults] = useState()
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.user)
  const [groupChatName, setGroupChatName] = useState()

  useEffect(() => {
    setSearchResults(users)
  }, [users])

  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const [ newUser, setNewUser ] = useState('')

  const { selectedConversation, setSelectedConversation } = ChatState()

  const handleRemove= async (user1) => {
    try {
      const newConversation = await dispatch(removeUserGroup({ id: selectedConversation?._id, userId: user1._id }))
      setSelectedConversation(newConversation)
      dispatch(getConversations(user?._id))
      setGroupChatName('')
      if(user._id ===user1._id){
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!open) {
      dispatch(resetUsers())
    }
  }, [open])

  const handleRename = async () => {
    if (!groupChatName) return
    try {
      const renamedConversation = await dispatch(renameConversation({ id: selectedConversation?._id, chatName:groupChatName }))
      dispatch(getConversations(user?._id))

      setSelectedConversation(renamedConversation)
    } catch (error) {
      console.log(error)
    }
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

  const handleAddUser = async (user1) => {
    if (selectedConversation.users.find((u) => u._id === user1._id)) {
      return console.log('User already in the group')
    } else {
      try {
        const newConversation = await dispatch(addUserConversation({ id: selectedConversation?._id, userId: user1._id }))
        setSelectedConversation(newConversation)
        dispatch(getConversations(user?._id))
        setSearchResults([])
        setNewUser('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (!open) {
      setSearchResults([])
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      dispatch(resetUsers())
      setNewUser('')
    }
  }, [open])

  return (
    <>
      <IconButton onClick={ () => setOpen(true) }>
        <VisibilityIcon />
      </IconButton>
      <Modal open={open} className={classes.modalupdate}>
        <div className={classes.paper}  >
          <div className={classes.newheader}>
            <Typography variant="h6" align="center">
              {selectedConversation.chatName}
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div >
            {selectedConversation.users.map((u) => (
              <Chip variant="outlined" key = {u._id} label={u.name}
                onDelete={() => handleRemove(u)}
                avatar={<Avatar alt={u.name} src={u.picture} />}
              />
            ))}
          </div>
          <div className={classes.renameContainer}>
            <TextField   className={classes.textInput} label="Rename Conversation" variant="outlined" size="small" fullWidth onChange={(e) => setGroupChatName(e.target.value )} >Group Name</TextField>
            <Button  onClick={ handleRename } variant = 'contained'> Update </Button>
          </div>
          <div>
            <TextField value={newUser} variant='outlined'  className={classes.addUserField} label='Add Users!' size="small" fullWidth
              onChange={(e) => {setNewUser(e.target.value)
                handleSearch( e.target.value )}} >Add User</TextField>
            <Box style={{ width: '92%' }}>

              {searchResults?.slice(0,4).map((user) => (
                <Box className={classes.searchUser} onClick={() => handleAddUser(user)} key = {user._id}>
                  <Avatar mr={2} size="sm" cursor="pointer" name={user.name} src={user.pic} />
                  <Box>
                    <Typography>{user.name}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </div>
          <div className={classes.buttonContainer}>
            <Button  onClick={() => handleRemove(user)} variant = 'contained'> Leave Group </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UpdateGroupModal