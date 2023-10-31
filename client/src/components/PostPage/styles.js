import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    height: '250px',
    marginRight: '80px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,

    },
  },
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    maxHeight: '600px',
    width: '100%',
    height: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
    },
  },
  videoIframe: {
    width: '100%',
    height: '200px',
  },
  recommended: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    cursor: 'pointer'
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  Input:{
    width: '95%',
    borderRadius: '15px',
    '& fieldset': {
      borderRadius: '15px',
      color:'white'
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    width: '30%'
  },
  buttonSubmit: {
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'border-color 0.3s ease',
    '&:hover': {
      backgroundColor:'rgb(0,99,28)',
    },
  },
}))
