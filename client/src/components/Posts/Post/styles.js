import { makeStyles } from '@mui/styles'

export default makeStyles(() => ({
  media: {
    backgroundBlendMode: 'darken',
    height: '300px',
    width: '90%',
    border: 'none'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px',
  },
  title: {
    padding: '0 16px',
    fontWeight: 'bold',
  },
  user: {
    padding: '0 26px',
  },
  info: {
    padding: '0 16px',
    fontSize: '16px',
    color:  '#b3b3b3',
  },
  card: {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
    height: '90%',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgb(240,240,240)',
    },
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  deleteButtom: {
    fontWeight:  'bolder',
    fontSize:  '16px',
  },
  moment: {
    padding: '0 26px',
  },
}))
