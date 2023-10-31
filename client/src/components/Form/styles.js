import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textInput: {
    width: '80%',
    margin: '10px ',
  },
  buttonSubmit: {
    marginBottom: 10,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '10px',
  },
}))