import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from './Input';
import { signUp, signIn } from '../../actions/index.js';

const initialState = { name: '', email: '', phone: '', address: '', city: '', state: '', country: '', phoneOrEmail: '', password: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const classes = useStyles();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
      console.log(showPassword);
      setShowPassword(!showPassword)
    };

  const dispatch = useDispatch();
  const history = useHistory();

    const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signUp(form, history));
    } else {
      dispatch(signIn(form, history));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { 
                            isSignup ?
                                (
                                    <>
                                        <Input name="name" label="Name" handleChange={handleChange} autoFocus type="text" />
                                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                                        <Input name="phone" label="Phone Number" handleChange={handleChange} type="text" />
                                        <Input name="address" label="Address" handleChange={handleChange} type="text" />
                                        <Input name="city" label="City" handleChange={handleChange} type="text" half />
                                        <Input name="state" label="State" handleChange={handleChange} type="text" half />
                                        <Input name="country" label="Country" handleChange={handleChange} type="text" />
                                    </>
                                ) :
                                (
                                    <>
                                        <Input name="phoneOrEmail" label="Email or Phone Number" handleChange={handleChange} type="text" />
                                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'password' : 'text'} handleShowPassword={handleShowPassword} />
                                    </>
                                )
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                        </Grid>
                    </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default SignUp;