import React, { useState } from 'react'
import { IconButton, Card, CardMedia, Typography, CardContent, CardActions } from '@mui/material'
import useStyles from './styles'
import moment from 'moment'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch }from 'react-redux'
import { deletePost, likePost, favoritePost } from '../../../actions/posts'
import { sendNotification, deleteNotification } from '../../../actions/notifications'
import { useNavigate } from 'react-router-dom'
import GradeIcon from '@mui/icons-material/Grade'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined'
import { GET_POST, RESET_POSTS } from '../../../constants/actionTypes'

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const userId = user?.result?.googleId || user?._id
  const classes = useStyles()
  const navigate = useNavigate()

  const handlePostClick = () => {
    dispatch({ type: GET_POST, payload: post })
    dispatch({ type: RESET_POSTS, payload: post })
    navigate(`/posts/${post._id}`)
  }

  const dispatch = useDispatch()
  const [ likes, setLikes ] = useState(post?.likes)
  const [ hasLiked, setHasLiked ] = useState(post.likes.find((like) => like === userId))

  const [ favorites, setFavorites ] = useState(post?.favorited)
  const [ hasFavorited, setHasFavorited ] = useState(post?.favorited.find((favorite) => favorite === userId))

  const handleLike = () => {
    dispatch(likePost(post._id))
    const notification = ({ receiver: post?.user?._id, type: 'like', post: post?._id })

    if(hasLiked){
      setLikes(post.likes.filter((id) => id !== userId))
      setHasLiked(null)
      dispatch(deleteNotification(notification))
    }else{
      dispatch(sendNotification(notification))
      setLikes([...post.likes, userId])
      setHasLiked(userId)
    }
  }

  const Likes = () => {
    if(likes.length > 0){
      return likes.find((like) => like === userId)
        ? (
          <><FavoriteIcon  fontSize="large"/></>
        ) : (
          <><FavoriteBorderIcon  fontSize="large"/></>
        )
    }
    return <><FavoriteBorderIcon  fontSize="large" /></>
  }

  const handleFavorite = () => {
    dispatch(favoritePost(post._id))
    if(hasFavorited){
      setFavorites(post.favorited.filter((id) => id !== userId))
      setHasFavorited(null)
    }else{
      setFavorites([...post.favorited, userId])
      setHasFavorited(userId)
    }
  }

  const Favorite = () => {
    if(favorites.length > 0){
      return favorites.find((favorite) => favorite === userId)
        ? (
          <><GradeIcon  fontSize="large"/></>
        ) : (
          <><GradeOutlinedIcon  fontSize="large"/></>
        )
    }
    return <><GradeOutlinedIcon  fontSize="large" /></>
  }

  return (
    <Card sx={{ marginBottom: '16px' }} className={classes.card} raised elevation={6}>
      <div onClick={handlePostClick}  >
        <CardMedia
          component="iframe"
          src={`https://www.youtube.com/embed/${post.url}`}
          title="YouTube Video"
          className={classes.media}
        />
        <CardContent sx={{ padding: '0' }} >
          <div className={classes.details}>
            <Typography variant="body2" className={classes.info} component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} sx={{ fontWeight: 'bold' }}  variant="h6" component="h2">{post.title} by {post.artist}</Typography>
          <Typography  className={classes.user}>{post?.user?.name}</Typography>
          <Typography className={classes.moment} variant="body2">{moment(post.createdAt).fromNow()}</Typography>

          <div style={{ padding: '0 16px', marginTop: '8px' }}>
            <Typography variant="body2"className={classes.info} component="p">{post.description}</Typography>
          </div>
        </CardContent>
      </div>
      <CardActions className={classes.cardActions}>
        <IconButton size="small" color="primary" disabled={!user} className={classes.deleteButtom} onClick={handleLike} >
          <Likes />
        </IconButton>
        <IconButton size="small" color="primary" disabled={!user} className={classes.deleteButtom} onClick={handleFavorite} >
          <Favorite />
        </IconButton>
        {(userId === post?.user?._id) && (
          <div style={{ marginLeft: 'auto' }}>
            {(userId === post?.user?._id) && (
              <IconButton color="error" aria-label="delete" size="large" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteOutlineIcon fontSize="inherit"/>
              </IconButton>
            )}
          </div>
        )}
      </CardActions>
    </Card>
  )
}

export default Post