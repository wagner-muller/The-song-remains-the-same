import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  root: {
    paddingTop: '80px'
    //alignItems: 'center', // Vertically center
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
    width: 400,
    margin: 'auto',
    alignItems: 'center',
    marginTop: '10px'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginLeft: '10px',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    width: 320,
    marginLeft: theme.spacing(4),
    border: '1px solid rgba(0, 0, 0, 0.25)',
    boxShadow: 'none',
  },
  form: {
    width: '95%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: '20px',
    fontWeight: 'bold',
    textTransform: 'none',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    width: '55%',
    '&:hover': {
    },
  },
  text: {
    backgroundColor: 'black',
    borderColor: 'transparent'
  },
  googleButton: {
    margin: theme.spacing(2, 0, 2),
    borderRadius: '40px',
    fontWeight: 'bold',
    textTransform: 'none',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    width: '55%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
}))
