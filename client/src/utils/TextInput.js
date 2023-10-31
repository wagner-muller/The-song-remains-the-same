import React from 'react'
import {
  TextField, Grid, InputAdornment, IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

function TextInput({
  // eslint-disable-next-line react/prop-types
  half, name, handleChange, label, autoFocus, type, handleClick,
}) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        size='small'
        sx={{
          //height: '21px'
        }}
        InputProps={
          name === 'password'
            ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClick}>
                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
            : {}
        }
      />
    </Grid>
  )
}

export default TextInput
