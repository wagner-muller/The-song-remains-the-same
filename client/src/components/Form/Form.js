import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Chip, Snackbar, Alert } from '@mui/material'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom'

function Form() {
  const [newPost, setNewPost] = useState({ title: '', artist: '', description: '', url: '', tags:[] })
  const [inputValue, setInputValue] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const navigate = useNavigate()
  const classes = useStyles()
  const dispatch = useDispatch()

  const clear = () => {
    setNewPost({ title: '', artist: '', description:'', url: '',tags:[] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newPost.title || !newPost.description || !newPost.artist || !newPost.url){
      setShowNotification(true)
      return
    }
    dispatch(createPost(newPost, navigate))
    clear()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault()
      setNewPost({ ...newPost, tags: [...newPost.tags, inputValue.trim()] })
      setInputValue('')
    }
  }

  const handleDelete = (tagToDelete) => {
    setNewPost({ ...newPost, tags: newPost.tags.filter((tag) => tag !== tagToDelete) })
  }

  const renderTags = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          border: '1px solid red',
          minHeight: '32px',
          justifyContent: 'center',
          minWidth: '120px'
        }}
      >
        {newPost.tags.map((tag) => (
          <Chip
            color="secondary"
            key={tag}
            label={tag}
            onDelete={() => handleDelete(tag)}
            sx={{ marginBottom: '5px' }}
          />
        ))}
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ p: 2 }}>
        <form className={classes.form}  onSubmit = {handleSubmit} >
          <Typography  style={{ fontWeight: 'bold', fontSize: '18px' }}> Share a song!</Typography>
          <TextField size='large' style={{ marginBottom: '10px' }} variant='standard'  label='Title' InputLabelProps={{ style: { fontSize: '18px' } }} name='title' fullWidth value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} >Title</TextField>
          <TextField size='large' style={{ marginBottom: '10px' }} variant='standard'  label='Artist' InputLabelProps={{ style: { fontSize: '18px' } }} name='artist' fullWidth value={newPost.artist} onChange={(e) => setNewPost({ ...newPost, artist: e.target.value })} >Artist</TextField>
          <TextField size='large' style={{ marginBottom: '10px' }} variant='standard'  label='Youtube URL' InputLabelProps={{ style: { fontSize: '18px' } }} name='Url' fullWidth value={newPost.url} onChange={(e) => setNewPost({ ...newPost, url: e.target.value.substring(e.target.value.indexOf('watch') + 8) })} >Youtube Url</TextField>
          <TextField size='large' style={{ marginBottom: '10px' }} multiline rows={3} variant='standard'   label='Description' name='description' InputLabelProps={{ style: {  fontSize: '18px' } }} fullWidth value={newPost.description} onChange={(e) => setNewPost({ ...newPost, description: e.target.value })} >Message</TextField>
          <TextField
            variant="standard"
            size='large'
            style={{ marginBottom: '10px' }}
            label="Tags"
            InputLabelProps={{ style: { fontSize: '18px' } }}
            name="Tags"
            fullWidth
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            inputProps={{
              style: { marginBottom: '10px' }
            }}
          />
          {
            newPost.tags.length > 0 ?
              renderTags():
              null
          }
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', border: '1px solid green' }}>
            <Button  className={classes.buttonSubmit} type='submit' size='large' variant = 'contained'> Submit </Button>

            <Button  className={classes.buttonReset} variant='outlined'size='large' color='secondary' onClick={clear}> Clear </Button>
          </Box>
        </form>
        <Snackbar
          open={showNotification}
          autoHideDuration={6000}
          onClose={() => setShowNotification(false)}
        >
          <Alert onClose={() => setShowNotification(false)} severity="error" sx={{ width: '100%' }}>
            Oops! Please fill in all the required fields before submitting your song.          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}

export default Form