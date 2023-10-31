import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  postsContainer: {
    height: '100%',
    overflowY: 'scroll',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))