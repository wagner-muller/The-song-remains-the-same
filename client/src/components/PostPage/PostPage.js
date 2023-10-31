import React, { useEffect, useState } from 'react'
import { Paper, Typography, Divider, CircularProgress, IconButton, Card, CardContent } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getPost, getPostsBySearch, resetPosts } from '../../actions/posts'
import moment from 'moment'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import Iframe from 'react-iframe'
import Comments from './Comments'
import { useDispatch }from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import GradeIcon from '@mui/icons-material/Grade'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined'
import { likePost, favoritePost } from '../../actions/posts'
import { sendNotification, deleteNotification } from '../../actions/notifications'

const PostPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { post, posts, isLoading } = useSelector((state) => state.post)
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('profile'))

  const [ likes, setLikes ] = useState(post?.likes)
  const [ hasLiked, setHasLiked ] = useState(post?.likes.find((like) => like === user._id))

  const [ favorites, setFavorites ] = useState(post?.favorited)
  const [ hasFavorited, setHasFavorited ] = useState(post?.favorited.find((favorite) => favorite === user._id))

  const openPost = (id) => { navigate(`/posts/${id}`) }

  const Likes = () => {
    if(likes?.length > 0){
      return likes.find((like) => like === user._id)
        ? (
          <><FavoriteIcon  fontSize="large"/></>
        ) : (
          <><FavoriteBorderIcon  fontSize="large"/></>
        )
    }
    return <><FavoriteBorderIcon  fontSize="large" /></>
  }

  const Favorite = () => {
    if(favorites.length > 0){
      return favorites.find((favorite) => favorite === user._id)
        ? (
          <><GradeIcon  fontSize="large"/></>
        ) : (
          <><GradeOutlinedIcon  fontSize="large"/></>
        )
    }
    return <><GradeOutlinedIcon  fontSize="large" /></>
  }

  const handleFavorite = () => {
    dispatch(favoritePost(post._id))
    if(hasFavorited){
      setFavorites(post.favorited.filter((id) => id !== user._id))
      setHasFavorited(null)
    }else{
      setFavorites([...post.favorited, user._id])
      setHasFavorited(user._id)
    }
  }
  const handleLike = () => {
    dispatch(likePost(post?._id))
    const notification = ({ receiver: post?.user?._id, type: 'like', post: post?._id })

    if(hasLiked){
      setLikes(post.likes.filter((id) => id !== user._id))
      setHasLiked(null)
      dispatch(deleteNotification(notification))
    }else{
      dispatch(sendNotification(notification))
      setLikes([...post.likes, user._id])
      setHasLiked(user._id)
    }
  }

  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
    return () => {
      dispatch(resetPosts())
    }
  }, [post, dispatch])

  //const openPost = (_id) => navigate(`/posts/${_id}`)
  const openUser =() =>  navigate(`/user/${post.user._id}`)

  if (!post) return null

  const recommendedPosts = posts ? posts.filter(({ _id }) => _id !== post._id) : undefined

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>

      <Paper style={{ padding: '20px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography style={{ fontWeight: 'bold' }} variant="h4" component="h2">{post.title} by {post.artist}</Typography>
            <Typography gutterBottom style={{ color: 'gray', paddingLeft: '30px' }} variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1"  style={{ color: 'black' }} component="p">{post.description}</Typography>
            <Typography variant="h6" >Created by:<span className={classes.pointer}  onClick={openUser}> {post.user.name} </span></Typography>
            <Typography variant="body1"  >{moment(post.createdAt).fromNow()}</Typography>
            <div>
              <IconButton size="small" color="primary" disabled={!user} className={classes.deleteButtom} onClick={handleLike} >
                <Likes />
              </IconButton>
              <IconButton size="small" color="primary" disabled={!user} className={classes.deleteButtom} onClick={handleFavorite} >
                <Favorite />
              </IconButton>
            </div>
            <Divider style={{ margin: '10px 0' }} />

          </div>
          <div className={classes.imageSection}>
            <Iframe className={classes.media} src={`https://www.youtube.com/embed/${post.url}`} title="YouTube video player" />
          </div>
        </div>
        <Comments post={post} />
        <Divider  />

        {recommendedPosts.length > 0 && (
          <div className={classes.section}>
            <Typography gutterBottom variant='h5' style={{ fontWeight: 'bold' }} >You may also like:</Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.slice(0,3).map((post) => (
                <div style ={{ margin:'20px',cursor: 'pointer' }} key={post._id}>
                  <Card key={post._id} className={classes.recommended} onClick={() => openPost(post._id)}>
                    <iframe
                      className={classes.videoIframe}
                      title="Video"
                      src={`https://www.youtube.com/embed/${post.url}`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {post.title}
                      </Typography>
                      <Typography gutterBottom variant="h8" component="div" sx={{ marginLeft: '10px' }}>
                        {post.user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '10px' }}>
          Likes: {post.likes.length}
                      </Typography>
                    </CardContent>

                  </Card>
                </div>
              ))}
            </div>
          </div>
        )
        }
      </ Paper>
    </div>
  )
}

export default PostPage


