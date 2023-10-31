import React, { useState, useEffect } from 'react'
import { Box, Typography, IconButton, TextField } from '@mui/material'
import useStyles from './styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ChatState } from '../../context/ChatProvider'
import UpdateGroupModal from './UpdateGroupModal'
import { useDispatch } from 'react-redux'
import { getMessages, sendMessage } from '../../actions/messages'
import ScrollableChat from './ScrollableChat'
import animationData from '../../animations/typing.json'
import Lottie from 'react-lottie'
import socket from '../../utils/SocketManager'
import { refreshUser } from '../../actions/auth'
import { deleteMessageNotification } from '../../actions/notifications'
var selectedChatCompare

const SingleConversation = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [newText, setNewText] = useState('')
  const { selectedConversation, setSelectedConversation } = ChatState()
  const [socketConnected, setSocketConnected] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const fetchMessages = async () => {
    if (!selectedConversation) return
    try {
      const fetchedMessages = await dispatch(getMessages(selectedConversation._id))
      setMessages(fetchedMessages)
      socket.emit('join chat', selectedConversation._id)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchMessages()
    selectedChatCompare = selectedConversation
  }, [selectedConversation])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if(newText){
      const newMessage = {
        text: newText,
        conversationId: selectedConversation._id
      }
      socket.emit('stop typing', selectedConversation._id)
      const data = await dispatch(sendMessage(newMessage))

      setNewText('')
      socket.emit('new conversation')
      socket.emit('new message',data)
      setMessages([...messages, data])
    }
  }

  const typingHandler = (e) => {
    setNewText(e.target.value)
    if(!socketConnected) return console.log('not connected')

    if(!typing){
      setTyping(true)
      socket.emit('typing', selectedConversation._id)
    }
    let lastTypingTime = new Date().getTime()
    var timerLength = 3000
    setTimeout(() => {
      var timeNow = new Date().getTime()
      var timeDiff = timeNow-lastTypingTime
      if(timeDiff >= timerLength && typing){
        socket.emit('stop typing', selectedConversation._id)
        setTyping(false)
      }
    }, timerLength)
  }

  const getSender = (users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name
  }

  useEffect(() => {
    socket.emit('setup', user)
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
  }, [])

  useEffect(() => {
    socket.on('message received',async (newMessageReceived) => {
      if( !selectedChatCompare || selectedChatCompare._id !== newMessageReceived.conversationId._id){
        return
      }else{
        setMessages([...messages, newMessageReceived])
        await dispatch(deleteMessageNotification(user._id, newMessageReceived.conversationId._id))
        await dispatch(refreshUser())
      }
    })
  },)

  return (
    <>
      {selectedConversation ? (
        <>
          <Typography className={classes.texttop}>
            <IconButton
              style={{ color: 'white' }}
              onClick={() => setSelectedConversation('')}
            >
              <ArrowBackIcon />
            </IconButton>
            {!selectedConversation.isGroupChat ? (
              <>{getSender(selectedConversation.users)}</>
            ) : (
              <>
                {selectedConversation.chatName.toUpperCase()}
                <UpdateGroupModal/>
              </>
            )}
          </Typography>
          <Box className={ classes.messagesbox }>
            <div className={classes.messages}>
              <ScrollableChat messages={messages}/>

            </div>
            <Box></Box>
            <form  onSubmit = {handleSubmit}>
              {isTyping ?
                <div>
                  <Lottie
                    options= {defaultOptions}
                    width={70}
                    style={{ marginBottm: 15, marginLeft:0 }}
                  />
                </div> : <></>
              }
              <TextField style={{ color: '#606060' }} label="Type your message"  fullWidth value = {newText} onChange={typingHandler} />

            </form>
          </Box>
        </>) :
        <Box className={classes.nonselected}>
          <Typography gutterBottom> Click on a group to start chating</Typography>
        </Box>
      }
    </>
  )
}

export default SingleConversation