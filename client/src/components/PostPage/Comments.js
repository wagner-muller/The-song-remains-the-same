import { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'
import { sendNotification } from '../../actions/notifications'
import useStyles from './styles'
import { useNavigate } from 'react-router-dom'

const Comments = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')
  const commentsRef = useRef()
  const openUser =() =>  navigate(`/user/${user._id}`)

  const handleClick = async () => {
    const finalComment = `${user.name}: ${comment}`

    const newComments = await dispatch(commentPost(finalComment, post._id))
    if(post?.user?._id !== user._id){
      const notification = ({ receiver: post?.user?._id, type: 'comment', post: post?._id })
      await dispatch(sendNotification(notification))
    }
    setComment('')
    setComments(newComments)
    commentsRef.current.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <div>

      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom style={{ fontWeight:'bold' }} variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong onClick={openUser}>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.name && (
          <div style={{ width: '50%', marginRight: '80px' }}>
            <Typography style={{ fontWeight:'bold' }} gutterBottom variant="h6">Write a comment</Typography>
            <TextField
              className={classes.Input}
              fullWidth minRows={4} variant="outlined" label="Comment"
              multiline value={comment}
              onChange={(e) => setComment(e.target.value)} />
            <br />
            <Button  className={classes.buttonSubmit} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments