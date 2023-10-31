import React, { useState } from 'react'
import { Divider, Paper, Typography, Button, Avatar, CardMedia, Grid, Card, Chip } from '@mui/material'
import { useSelector } from 'react-redux'
import useStyles from './styles'
import { useNavigate } from 'react-router-dom'
import CustomizedDialogs from './Modal'
import { followUser } from '../../actions/user'
import { useDispatch } from 'react-redux'
import { sendNotification, deleteNotification } from '../../actions/notifications'
import { createConversation } from '../../actions/conversations'
import { ChatState } from '../../context/ChatProvider'

const User = () => {
  const { user } = useSelector((state) => state.user)
  const logged_user = JSON.parse(localStorage.getItem('profile'))
  const [ followers, setFollowers ] = useState(user?.followers)
  const [ isFollowing, setIsFollowing] = useState(user?.followers.find((follower) => follower._id === logged_user._id))
  const [ showInfo, setShowInfo ] = useState([])
  const [ open, setOpen ] = useState(false)
  const { setSelectedConversation } = ChatState()
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleFollow = async () => {
    await dispatch(followUser(user?._id))
    const notification = ({ receiver: user?._id, type: 'followed' })
    if(isFollowing){
      setIsFollowing(null)
      setFollowers(user?.followers.filter((follower) => follower._id !== logged_user._id))
      await dispatch(deleteNotification(notification))
    }else{
      await dispatch(sendNotification(notification))
      setIsFollowing({ id: user?._id, name: user?.name })
      setFollowers(followers => [...followers,{ id: logged_user._id, name: logged_user.name }])
    }
  }

  const handleMessage = async(userId) => {
    const conversation = await dispatch(createConversation({ id: userId }))
    setSelectedConversation(conversation)
    navigate('/messages')
  }

  const openPost = (id) => {
    navigate(`/posts/${id}`)
  }

  const Follow = () => {
    if(isFollowing){
      return  <div>Unfollow</div>
    }else{
      return <div>Follow</div>
    }
  }

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ width: '95%', }}>
          <div style={{ display: 'flex', paddingTop: '20px', justifyContent: 'center', alignContent: 'center', flexDirection: 'row', gap: '10px' }}>
            <Avatar alt={user?.name} src={user?.picture} style={{ width:'150px', height: '150px', marginRight: '10px' }} />
            <div style={{ marginLeft: '10px' }}>
              <Typography variant="h5">{user?.name} {user?.lastName}</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>@{user?.username}</Typography>
              <Typography variant="h7" component="h5" style={{ marginBottom: '10px' }}> {user?.bio}</Typography>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }} >
                <Typography  style={{ margin: '0 10px', fontSize: 18 }} onClick={ () => {setOpen(true); setShowInfo([user?.following, user?.following.length, 'Following'])} }> <span style={{ fontWeight: 'bold' }}>{user?.following.length}</span> Following</Typography>
                <Typography   style={{ margin: '0 10px', fontSize: 18  }} onClick={ () => {setOpen(true); setShowInfo([followers, followers.length, 'Followers']) }}> <span style={{ fontWeight: 'bold' }}>{followers?.length}</span> Followers</Typography>
                <Typography   style={{ margin: '0 10px', fontSize: 18  }}> <span style={{ fontWeight: 'bold' }}> {user?.posts.length} </span> Posts</Typography>
              </div>
              {user?.favoriteGenres.map((genre) => (
                <Chip className={classes.chip} key={genre} label={genre}/>
              ))}
              {user?._id !== logged_user._id &&(
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button fullWidth className={classes.button} size="medium" disabled={!user} onClick={handleFollow} >
                    <Follow />
                  </Button>
                  <Button fullWidth className={classes.button} size="medium" disabled={!user}   onClick={() => handleMessage(user?._id)} >
                    Message
                  </Button>
                </div>
              )
              }
              {
                user?._id === logged_user._id  &&(
                  <Button size="medium" className={classes.button} disabled={!user}  onClick={() => navigate(`/user/${logged_user._id}/change`)}>
                    Edit profile
                  </Button>)
              }
            </div>
          </div>
          {open && (
            <div>
              <CustomizedDialogs showInfo={showInfo} setOpen={setOpen} open={open}/>
            </div>
          )}

          {user?.posts.length > 0 && (
            <div className={classes.section}>
              <Divider sx={{ margin: '10px 0' }} />
              <Grid container alignItems="stretch" spacing={3} sx={{ marginTop: '10px' }}>
                { user?.posts.map(({ title, likes,_id, url }) => (
                  <Grid  onClick={() => openPost(_id)} key={_id} item xs={12} sm={6} md={4} sx={{ cursor: 'pointer' }}>
                    <Card className={classes.card} raised elevation={6}>
                      <CardMedia className={classes.media} height="300" component="iframe" title={title} src={`https://www.youtube.com/embed/${url}`} crossOrigin="anonymous" />
                      <Typography gutterBottom variant="h7" component="div" sx={{ fontWeight: 'bold', padding: '12px', marginBottom: '-12px' }}>
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ padding: '10px 20px 20px', fontSize: 14, margin: '0 0 -5px' }}>
          Likes: {likes.length}
                      </Typography>                  </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )
          }
        </div>
      </Paper>
    </div>
  )
}


export default User