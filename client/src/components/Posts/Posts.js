import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, resetPosts } from '../../actions/posts'
import { Typography, Box } from '@mui/material'
import Post from './Post/Post'
import InfiniteScroll from 'react-infinite-scroll-component'

function Posts() {

  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch()

  const { posts, isLoading }= useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getPosts(pageNumber))
  }, [])

  useEffect(() => {
    return () => {
      dispatch(resetPosts())
    }
  }, [])

  const fetchDataOnScroll = async () => {
    const nextPage = pageNumber + 1
    await dispatch(getPosts(nextPage))
    if (posts.length < nextPage * 5) setHasMore(false)
    setPageNumber(nextPage)
  }
  if(!posts.length && !isLoading){
    return (<Typography style={{ color: 'white', fontSize:'20px', padding:'5em',    textAlign: 'center' }} > There are no posts that match your search. Try again with another song name/genre. </Typography>)
  }
  return (

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

  )
}

export default Posts