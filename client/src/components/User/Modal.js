import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { CardHeader, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center', fontWeight: 'bold', fontSize: 'large' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function CustomizedDialogs({ showInfo, setOpen, open }) {
  const navigate = useNavigate()
  const classes = useStyles()
  const openUser = (_id) => {
    navigate(`/user/${_id}`)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div
    >
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ maxWidth: '400px', position: 'fixed',left: '40%',  }}
        fullWidth={true}

      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {showInfo[2]}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {showInfo[0]?.map((info) =>
            <div
              key={info._id}

              //onMouseOver={(e) => { e.target.style.backgroundColor = 'rgb(245,245,245)' }} // Change background on hover
              //onMouseOut={(e) => { e.target.style.backgroundColor = '' }} // Reset background on mouse out
            >
              <CardHeader
                className={classes.cardModal}
                avatar= {info?.picture ?
                  <Avatar  alt={info?.name} src={info?.picture}  className={classes.followPicture} />
                  :
                  <Avatar alt={info?.name}  className={classes.followPicture}>{info?.name.charAt(0)}</Avatar>
                }
                title={
                  <Typography variant = "h7" onClick={() => openUser(info._id)} >{info?.name}</Typography>
                }
              />
            </div>)}
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}