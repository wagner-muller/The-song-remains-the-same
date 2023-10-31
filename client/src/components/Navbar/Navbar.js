import React, { useState, useEffect, useRef } from 'react'
import { CardHeader, Avatar, Badge, Paper, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout'
import { EMPTY_NOTIFICATIONS } from '../../constants/actionTypes'
import useStyles from './styles'
import moment from 'moment'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EmailIcon from '@mui/icons-material/Email'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import GradeIcon from '@mui/icons-material/Grade'
import Box from '@mui/material/Box'
import Logo from '../../images/Logo.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, readNotifications } from '../../actions/notifications'
import socket from '../../utils/SocketManager'
import { refreshUser } from '../../actions/auth'
import { UserState } from '../../context/UserProvider'
const drawerWidth = 240

function Navbar() {
  const [place, setPlace] = useState(localStorage.getItem('selectedTab') || 'Main' )
  const [previousPlace, setPreviousPlace] = useState('')
  const notificationsRef = useRef(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)
  const { setLoggedIn } = UserState()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showNotifications && notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
        setPlace(previousPlace)

      }
    }
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showNotifications])

  socketConnected
  const classes = useStyles()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const settedIcon = [HomeIcon, SearchIcon, NotificationsIcon, GradeIcon, EmailIcon, AccountCircleIcon, LogoutIcon]
  const icons = [HomeOutlinedIcon, SearchIcon, NotificationsOutlinedIcon, GradeOutlinedIcon, EmailOutlinedIcon, AccountCircleOutlinedIcon,LogoutOutlinedIcon]
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if(user?.notifications?.length !==0){
      dispatch(getNotifications(user?.notifications))
    }
  }, [dispatch])

  useEffect(() => {
    socket.emit('setup', user)
    socket.on('connection', () => {
      setSocketConnected(true)
    })
  }, [])

  const { notifications } = useSelector((state) => state.notification)


  useEffect(() => {
    socket.on('notification received', async () => {
      await dispatch(refreshUser())
      const notification_user = JSON.parse(localStorage.getItem('profile'))
      dispatch(getNotifications(notification_user.notifications))
    })
    socket.on('notification deleted', async () => {
      await dispatch(refreshUser())
      const notification_user = JSON.parse(localStorage.getItem('profile'))
      if(notification_user?.notifications?.length !==0){
        dispatch(getNotifications(notification_user.notifications))
      }else{
        dispatch({ type: EMPTY_NOTIFICATIONS })
      }
    })
    socket.on('message received', async () => {
      await dispatch(refreshUser())
    })
  })

  const openUser = (id) => {
    setShowNotifications(false)
    navigate(`user/${id}`)
  }

  const openPost = (id) => {
    setShowNotifications(false)
    navigate(`posts/${id}`)
  }

  const handleClick = async (text) => {
    setPreviousPlace(place)
    setPlace(text)
    if (text !== 'Notifications'){
      localStorage.setItem('selectedTab', text)
    }
    setShowNotifications(false)
    if (text === 'Notifications') {
      dispatch(readNotifications(user?.notifications))
      setShowNotifications(true)
    } else if (text === 'Profile'){
      navigate(`/user/${user._id}`)
    } else if(text === 'Logout'){
      await dispatch({ type: 'LOGOUT' })
      setLoggedIn(false)
      navigate('/auth')
    }
    else{
      navigate(`/${text.toLowerCase()}`)
    }
  }

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <img src={Logo} alt="icon" width="240px" />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <List>
            {['Main','Search', 'Notifications','Saved', 'Messages', 'Profile', 'Logout'].map((text, index) => (
              <ListItem key={text} disablePadding>
                {text === place ?
                  <ListItemButton onClick={() => handleClick(text)}>
                    <ListItemIcon sx={{ color: 'inherit', }}>
                      {text === 'Messages' ? (
                        <Badge badgeContent={user?.conversationNotifications.length} color="primary">
                          {React.createElement(settedIcon[index % icons.length], { style: { fontSize: 36 } })}
                        </Badge>
                      ) : (
                        React.createElement(settedIcon[index % icons.length], { style: { fontSize: 36 } })
                      )}
                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>{text}</Typography>} />
                  </ListItemButton>
                  :
                  <ListItemButton onClick={() => handleClick(text)}>
                    <ListItemIcon sx={{ color: 'inherit', }}>
                      {text === 'Notifications' ? (
                        <Badge badgeContent={notifications.filter((not) => not.readed === false).length} color="primary">
                          {React.createElement(icons[index % icons.length], { style: { fontSize: 36 } })}
                        </Badge>
                      ) : text === 'Messages' ? (
                        <Badge badgeContent={user?.conversationNotifications.length} color="primary">
                          {React.createElement(icons[index % icons.length], { style: { fontSize: 36 } })}
                        </Badge>
                      ) : (
                        React.createElement(icons[index % icons.length], { style: { fontSize: 36 } })
                      )}

                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{ color: 'black', fontSize: '18px' }}>{text}</Typography>} />
                  </ListItemButton>
                }
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {showNotifications && (
        <Paper
          ref={notificationsRef}
          sx={{
            position: 'absolute',
            left: drawerWidth,
            width: 310,
            zIndex: 2,
            height: '100%',
          }}
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '25px', padding: '20px' }}>Notifications</Typography>
          {notifications?.map((notification) =>
            <div key={notification._id} className={classes.notification}>
              <CardHeader
                avatar= {
                  <Avatar
                    onClick={() => openUser(notification?.sender?._id)}
                    alt={notification?.sender?.name}
                    src={notification?.picture}
                  />
                }
                title={
                  <>
                    {notification.type === 'like' ? (
                      <Typography variant="h7">
                        <span style={{ fontWeight: 'bold' }} onClick={() => openUser(notification?.sender?._id)}>
                          {notification?.sender?.name}
                        </span>{' '}
                      like your post <span style={{ fontWeight: 'bold' }} onClick={() => openPost(notification?.post?._id)}>
                          {notification?.post?.title}
                        </span>
                      </Typography>
                    ) : notification.type === 'comment' ? (
                      <Typography variant="h7">
                        <span style={{ fontWeight: 'bold' }} onClick={() => openUser(notification?.sender?._id)}>
                          {notification?.sender?.name}
                        </span>{' '}
                      commented your post <span style={{ fontWeight: 'bold' }} onClick={() => openPost(notification?.post?._id)}>
                          {notification?.post?.title}
                        </span>
                      </Typography>
                    ) : notification.type === 'followed' ? (
                      <Typography variant="h7">
                        <span style={{ fontWeight: 'bold' }} onClick={() => openUser(notification?.sender?._id)}>
                          {notification?.sender?.name}
                        </span>{' '}
                      started following you
                      </Typography>
                    ) : null}

                    <Typography variant="body2" color="textSecondary">
                      {moment(notification.createdAt).fromNow()}
                    </Typography>
                  </>
                }/>

            </div>)}
        </Paper>
      )}
    </>

  )
}

export default Navbar