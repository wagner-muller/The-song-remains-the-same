import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({

  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  cardModal: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgb(245,245,245)',

    },

  },
  chip: {
    margin: theme.spacing(0.5),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    cursor: 'pointer'
  },
  recommendedPosts: {
    display: 'flex',
    alignContent:  'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    objectFit: 'cover',
    maxHeight: '1000px',
    width: '100%',
    height: '60%',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },


}))
