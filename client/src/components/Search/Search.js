import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Chip,CardContent, CardHeader, Grid, Avatar, Card, AppBar, Typography, Box, Toolbar, IconButton, InputBase, Badge, MenuItem, Menu } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import TagIcon from '@mui/icons-material/Tag'
import MoreIcon from '@mui/icons-material/MoreVert'
import { getUsersBySearch, resetUsers } from '../../actions/user'
import { getPostsBySearch, resetPosts } from '../../actions/posts'
import { followUser } from '../../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined'
import { useNavigate } from 'react-router-dom'
import { sendNotification, deleteNotification } from '../../actions/notifications'


const SearchComponent = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgb(236, 236,236)',
  '&:hover': {
    backgroundColor: 'rgb(241,241,241)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

function Search() {
  const settedIcon = [ AccountCircleIcon, LibraryMusicIcon, TagIcon]
  const icons = [AccountCircleOutlined, LibraryMusicOutlinedIcon, TagIcon ]
  const logged_user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [activeTag, setActiveTag] = useState('users')
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const [ search, setSearch ] = useState('')
  const dispatch = useDispatch()
  const classes = useStyles()
  const [followStatus, setFollowStatus] = useState({})


  const { users } = useSelector((state) => state.user)
  const { posts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(resetUsers())
    dispatch(resetPosts())
  }, [])

  useEffect(() => {
    const initialFollowStatus = {}
    users.forEach((user) => {
      initialFollowStatus[user._id] = user.followers.includes(logged_user._id)
    })
    setFollowStatus(initialFollowStatus)
  }, [users, logged_user._id])

  const handleFollow = async (user) => {
    const newFollowStatus = { ...followStatus }
    const isFollowingOriginally = followStatus[user._id]
    newFollowStatus[user._id] = !newFollowStatus[user._id]
    setFollowStatus(newFollowStatus)

    const notification = ({ receiver: user?._id, type: 'followed' })

    await dispatch(followUser(user?._id))

    if(isFollowingOriginally){
      await dispatch(deleteNotification(notification))
    }else{
      await dispatch(sendNotification(notification))
    }
  }



  const openUser = (id) => {
    navigate(`/user/${id}`)
  }

  const openPost = (id) => {
    navigate(`/posts/${id}`)
  }

  const handleSearch = (event) => {
    if (activeTag === 'users') {
      dispatch(getUsersBySearch(search))
    } else if (activeTag === 'posts') {
      dispatch(getPostsBySearch({ searchTerm: search, tags: null }))
    } else if (activeTag === 'tags') {
      dispatch(getPostsBySearch({ searchTerm: null, tags: search }))
    }
    if (event.key === 'Enter') {
      setSearch('')
    }
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {['users', 'posts', 'tags'].map((text, index) => (
        <MenuItem  key={index}>
          <IconButton size="large" color="inherit" onClick={() => setActiveTag(text)}>
            {text === activeTag ?  (
              <Badge>
                {React.createElement(settedIcon[index % icons.length], { style: { fontSize: 36 } })}
              </Badge>
            ) : (
              <Badge>
                {React.createElement(icons[index % icons.length], { style: { fontSize: 36 } })}
              </Badge>
            )}
          </IconButton>
        </MenuItem>
      ))}
    </Menu>
  )

  return (
    <>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar sx={{   boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)' }} position="static" color='transparent'>
          <Toolbar >
            <SearchComponent>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={(e) => handleSearch(e) }
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </SearchComponent>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {['users', 'posts', 'tags'].map((text, index) => (
                <IconButton size="large" color="inherit" onClick={() => setActiveTag(text)} key={index}>
                  {text === activeTag ?  (
                    <Badge>
                      {React.createElement(settedIcon[index % icons.length], { style: { fontSize: 36 } })}
                    </Badge>
                  ) : (
                    <Badge>
                      {React.createElement(icons[index % icons.length], { style: { fontSize: 36 } })}
                    </Badge>
                  )}
                </IconButton>
              ))}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        <Grid sx={{ marginTop: '15px', marginLeft:'15px',  marginRigth:'15px' }} container alignItems="stretch" spacing={3}>
          {activeTag === 'users' && users?.map((user) => {
            return                <Grid item xs={12} sm={6} md={4} key={user._id} sx={{ cursor: 'pointer' }}>
              <div className={classes.userCardContainer}>
                <Card sx={{ height: '180px' }}>
                  <CardHeader
                    sx={{ marginTop: '-12px', marginBottom: '-10px' }}
                    avatar={<Avatar className={classes.avatar} src={user.photo} />}

                    title={ <Typography sx={{ fontWeight: 'bold' }}> {user.name} {user.lastName}</Typography> }
                    subheader={`@${user.username}`}
                    onClick={() => openUser(user._id)}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {user.favoriteGenres.length ? <div  style={{ marginTop: '-8px', marginBottom: '-10px' }}>
                      <strong>Favorite Genre:</strong>
                      {user.favoriteGenres.slice(1).map((genre) => (
                        <Chip className={classes.chip} key={genre} label={genre}/>
                      ))}
                    </div> :
                      <Typography align='center'  sx={{ marginTop: '-16px', marginBottom: '-10px' }}>

                      User has not registered a prefered genre</Typography>}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px',  }}>

                      <Button
                        variant="contained"
                        // color={isFollowed ? 'default' : 'primary'}
                        className={classes.followButton}
                        onClick={() => handleFollow(user)}
                      >
                        {followStatus[user._id] ? 'Unfollow' : 'Follow'}
                      </Button>
                    </div>
                  </CardContent>

                </Card>
              </div>
            </Grid>
          })}
          {(activeTag === 'posts' || activeTag === 'tags') && posts?.map((post) => {
            return <Grid item xs={12} sm={6} md={4} key={post._id} onClick={() => openPost(post._id)} sx={{ cursor: 'pointer' }}>
              <Card key={post._id} className={classes.card} onClick={() => openPost(post._id)}>
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
            </Grid>
          })}
        </Grid>
      </Box>



    </>
  )
}

export default Search