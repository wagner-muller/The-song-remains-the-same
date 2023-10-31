import React, { useState } from 'react'
import { Grid, Paper, Button, Divider, Typography, useMediaQuery, Snackbar, Alert }  from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import TextInput from '../../utils/TextInput'
import createTheme from './styles'
import { signUp, signIn, signInGoogle } from '../../actions/auth'
import { UserState } from '../../context/UserProvider'
import Logo_big from '../../images/Logo_big.png'


function Auth() {
  const classes = createTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setLoggedIn } = UserState()
  const isLargeScreen = useMediaQuery('(min-width: 1150px)')

  const initialState = {
    name: '', lastName: '', email: '', password: '', confirmPassword: '', username: ''
  }

  const [form, setForm] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState({ text: '', severity: 'error' })

  const handleClick = () => {
    setShowPassword((current) => !current)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(isSignUp){
      if(!form.name || !form.lastName || !form.username || !form.email || !form.password || !form.confirmPassword){
        setNotification({ text: 'Please fill in all the fields before submission.', severity: 'error' })
        setShowNotification(true)
        return
      }
      if(form.password !== form.confirmPassword){
        setNotification({ text: 'Passwords do not match.', severity: 'error' })
        setShowNotification(true)
        return
      }

      const createUserError = await dispatch(signUp(form, setIsSignUp))
      if(createUserError){
        setNotification({ text: createUserError, severity: 'error' })
        setShowNotification(true)
      }else{
        setNotification({ text: 'Account created successfully!', severity: 'success' })
        setShowNotification(true)
      }
    }else{
      const loginError = await dispatch(signIn(form))
      if(loginError){
        setNotification({ text: loginError, severity: 'error' })
        setShowNotification(true)
      }else{
        setLoggedIn(true)
        navigate('/main')
      }

    }
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const switchMode = () => {
    setForm(initialState)
    setIsSignUp((current) => !current)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const tokenId = res?.credential

    const form = { result,tokenId }
    try{
      await dispatch(signInGoogle(form,navigate))
      setLoggedIn(true)
      navigate('/main')
    }catch(error){
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Something went wrong. Try again')
  }

  return (

    <Grid className={classes.root} container component="main" justifyContent="center">
      {isLargeScreen && (
        <Grid item className={classes.image} >
          <img src={Logo_big} alt="icon"  />
        </Grid>
      )}
      <Grid item xs={12} sm={5} md={5}>
        <Paper  elevation={2} className={classes.paper}>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2} className={classes.formContainer}>

              { isSignUp && (
                <>
                  <TextInput name="name" style={{ backgroundColor: 'white', borderRadius: 50, padding: 'offset' }} label="Name" handleChange={handleChange} autoFocus half className={classes.input} />
                  <TextInput name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                  <TextInput name="username" label="Username" handleChange={handleChange} handleClick={handleClick} />

                </>
              )}
              <TextInput name="email" label="E-mail" handleChange={handleChange} type="email" />
              <TextInput name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleClick={handleClick} />
              { isSignUp && (<TextInput name="confirmPassword" label="Confirm password" handleChange={handleChange} autoFocus type="password" />)}
              <Button type="submit" className={classes.submit}  >
                { isSignUp ? 'Sign Up' : 'Log In' }
              </Button>

              { !isSignUp && (
                <div>
                  <Grid container>
                    <Divider style={{ width: '100%', margin: '8px' }} className={classes.divider}>OR</Divider>
                  </Grid>

                  <GoogleLogin
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                  />
                </div>
              )}

              <Typography
                component="span"
                sx={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  cursor: 'pointer',
                  marginTop: 2,
                }}
                onClick={switchMode}
              >            {!isSignUp ? (
                  <>
      Don&apos;t have an account? <span style={{ fontWeight: 'bold' }}>Sign up</span>
                  </>
                ) : (
                  <>
      Have an account? <span style={{ fontWeight: 'bold' }}>Log in</span>
                  </>
                )}
              </Typography>
            </Grid>

          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
      >
        <Alert onClose={() => setShowNotification(false)} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.text} </Alert>
      </Snackbar>

    </Grid>
  )
}

export default Auth
