import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  listContainer: {
    background: 'rgba(var(--cdc,255,255,255),1)',
    borderRadius: '3px',
    border: '1px solid red',
    boxShadow: '0 0 5px rgba(var(--jb7,0,0,0),.0975)',
    display: 'block',
    maxHeight: '362px !important',
    minHeight: '100px !important',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '0',
    position: 'absolute',
    top: '54px !important',
    whiteSpace: 'normal',
    maxWidth: '500px !important',
    width: '500px !important',

    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      right: 0
    }
  },
}))
