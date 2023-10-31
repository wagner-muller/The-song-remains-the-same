import { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {

  const [selectedConversation, setSelectedConversation] = useState()
  const [conversations, setConversations] = useState()
  const [messageNotification, setMessageNotification] = useState([])


  return <ChatContext.Provider
    value={{
      selectedConversation,
      setSelectedConversation,
      conversations,
      setConversations,
      messageNotification,
      setMessageNotification
    }}
  >
    {children}
  </ChatContext.Provider>
}

export const ChatState = () => {
  return useContext(ChatContext)
}

export default ChatProvider