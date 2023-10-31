import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({

  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    cursor: 'pointer'
  },
  favoriteGenresContainer: {
    display: 'flex',
    flexWrap: 'wrap', // This allows the Chips to wrap to the next line
    marginTop: '-8px',
    marginBottom: '-10px',
  },
  searchTabs: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%', // Set the width to 100% to make it responsive
  },

  videoIframe: {
    width: '100%',
    height: '200px',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  followButton: {
    marginTop: theme.spacing(2),
  },
}))
