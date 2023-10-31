import React, { useState } from 'react'
import { TextField, Button, Typography, Container, Avatar, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../actions/user'

const ProfileForm = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [formData, setFormData] = useState(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(user._id, formData, navigate))
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setFormData({ ...formData, picture: reader.result })
      }
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
        Edit Profile
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ padding: '20px' }}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Avatar alt={formData.name} src={formData.picture} sx={{ width: 120, height: 120, margin: '0 auto' }} />
            <input type="file" accept="image/*" name="photo" onChange={handlePhotoChange} />
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit}>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Favorite Music Genres"
                name="favoriteGenres"
                value={formData.favoriteMusicGenres}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value.split(' ') })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={formData.bio}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
          Save Changes
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ProfileForm
