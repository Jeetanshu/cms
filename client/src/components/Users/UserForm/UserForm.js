import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from './Input';
import { createUser } from '../../../actions/index.js';

const initialState = { name: '', email: '', phone: '', address: '', city: '', state: '', country: '', password: '' };

const UserForm = () => {
    const [form, setForm] = useState(initialState);
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(true);

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(form));
        setForm({ name: '', email: '', phone: '', address: '', city: '', state: '', country: '', password: '' });
        window.location.reload(false);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            { 
                                <>
                                    <Input name="name" label="Name" type="text" handleChange={handleChange} />
                                    <Input name="email" label="Email Address" type="text"  handleChange={handleChange} />
                                    <Input name="phone" label="Phone Number" type="text" handleChange={handleChange} />
                                    <Input name="address" label="Address" type="text" handleChange={handleChange} />
                                    <Input name="city" label="City" type="text" handleChange={handleChange} half />
                                    <Input name="state" label="State" type="text" handleChange={handleChange} half />
                                    <Input name="country" label="Country" type="text" handleChange={handleChange} />
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'password' : 'text'} handleShowPassword={handleShowPassword} />
                                </>
                            }
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Add User
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default UserForm;