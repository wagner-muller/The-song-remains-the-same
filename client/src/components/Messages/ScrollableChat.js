import { Tooltip, Avatar } from '@mui/material'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({ messages }) => {
  const user = JSON.parse(localStorage.getItem('profile'))

  const isSameSender = (messages, m,i,userId) => {
    return(
      i < messages.length -1 &&
        (messages[i+1].sender._id !==m.sender._id ||
        messages[i+1].sender._id ===undefined) &&
        messages[i].sender._id !== userId
    )
  }

  const isLastMessage = (messages, i,userId) => {
    return(
      i ===messages.length -1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    )
  }

  const isSameSenderMargin = (messages, m, i, userId) => {
    if(
      i < messages.length -1 &&
        messages[i+1].sender._id === m.sender._id &&
        messages[i].sender._id !==userId
    )
      return 57.5
    else if(
      (i < messages.length - 1 &&
        messages[i+1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 10
    else return 'auto'
  }

  const isSameUser = (messages, m , i) => {
    return i > 0 && messages[i-1].sender._id === m.sender._id
  }

  return(
    <ScrollableFeed>
      {messages &&
        messages.map((m,i) => (
          <div style={{ display:'flex' }} key = {m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.name} placement="bottom-start">
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                  style={{ marginLeft: '7.5px' }}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? 'rgb(44,153,233)' : 'rgb(239,239,239)'
                }`,
                color: `${
                  m.sender._id === user._id ? 'white' : 'black'
                }`,
                fontSize: '16px',
                borderRadius: '10px',
                padding: '10px 15px',
                maxWidth: '75%',
                marginBottom: '2px',
                marginRight: '15px',
                marginLeft: isSameSenderMargin(messages,m,i,user._id),
                marginTop: isSameUser(messages,m,i,user._id) ? 3 : 10,
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat