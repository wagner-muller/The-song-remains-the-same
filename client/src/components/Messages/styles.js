import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  envoltory: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px',
    borderRadius: '20px',
    borderWidth: '1px',
  },
  header: {
    paddingBottom: '5px',
    paddingLeft: '5px',
    paddingRigth: '5px',
    fontSize: '30px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  messagebox:{
    display: 'flex',
    alignItems:'center',
    flexDirection: 'column',
    padding:'10px',
    width:'100%',
    borderRadius: '20px',
    borderWidth: '1px',
    marginLeft: '10px',
    [theme.breakpoints.up('md')]: {
      width: '68%',
    },
  },
  texttop: {
    fontSize: '28px',
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    width: '100%',
    display: 'flex',
    marginRight: theme.spacing(2),
    color: 'black',
    justifyContent: {
      base: 'space-between'
    },
    alignItems: 'center',
  },

  messagesbox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '1px',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    overflowY: 'hidden',
  },
  messages:{
    display:'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
  },
  conversations: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px',
    width: '95%',
    height: '100%',
    borderRadius: 'lg',
    overflowY: 'hidden'
  },
  selected: {
    cursor: 'pointer',
    color: 'black',
    backgroundColor: 'rgb(239,239,239)',
    fontWeight: 'bold',
    height: '80px'

  },
  conversation: {
    cursor: 'pointer',
    backgroundColor: 'white',
    color: 'black',
    height: '80px',
    '&:hover': {
      backgroundColor: 'rgb(250,250,250)',

    },
  },
  renameContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  newheader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  paper: {
    backgroundColor: 'white',
    width: 300,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalupdate: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonselected: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    padding: 4,
  },
  textInput: {
    marginRight: theme.spacing(4),
  },
  searchUser: {
    cursor: 'pointer',
    backgroundColor:'#E8E8E8',
    width:'100%',
    display:'flex',
    alignItems: 'center',
    color: 'black',
    paddingLeft: theme.spacing(3),
    paddingRigth: theme.spacing(4),
    height: '50px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  buttonSubmit: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },


}))
