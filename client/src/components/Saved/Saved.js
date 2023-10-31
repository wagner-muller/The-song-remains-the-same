import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritedPosts, resetPosts } from '../../actions/posts'
import { Typography, Box, Container, Grid, useMediaQuery } from '@mui/material'
import Post from '../Posts/Post/Post'
import InfiniteScroll from 'react-infinite-scroll-component'

function Saved() {
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch()
  const isLargeScreen = useMediaQuery('(min-width: 850px)')

  const { posts, isLoading }= useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getFavoritedPosts(pageNumber))
  }, [])

  useEffect(() => {
    return () => {
      dispatch(resetPosts())
    }
  }, [])

  const fetchDataOnScroll = async () => {
    const nextPage = pageNumber + 1
    await dispatch(getFavoritedPosts(nextPage))
    if (posts.length < nextPage * 5) setHasMore(false)
    setPageNumber(nextPage)
  }
  if(!posts.length && !isLoading){
    return (<Typography style={{ color: 'white', fontSize:'20px', padding:'5em',    textAlign: 'center' }} > There are no posts that match your search. Try again with another song name/genre. </Typography>)
  }
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={isLargeScreen ? 4 : 2}>
        <Grid item xs={12} sm={12} md = {8}>
          <Box sx={{ marginBottom: isLargeScreen ? '20px' : '0px' }}>

            <Box sx={{ maxHeight: '600px', alignItems: 'center' }}>
              <InfiniteScroll
                hasMore={hasMore}
                next={fetchDataOnScroll}
                dataLength={posts.length}
                loader={<p>Loading...</p>}
                endMessage={     <p style={{ textAlign: 'center', marginTop: '2em', fontSize: '1.2em', color: '#555555' }}>

                  <b>You have seen it all! </b>
                </p>}
              >
                {posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}

              </InfiniteScroll>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>

  )
}

export default Saved