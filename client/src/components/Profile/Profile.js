import React, {useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppBar, Avatar, Typography, Toolbar, Button, Paper, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStyle from './style.js';
import Input from './Input';
import { getUser, updateUserInfoByUser } from '../../actions/index.js';
import * as actionType from '../../constants/actionTypes.js';

const Profile = (props) => {

  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentUser, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [open, setOpen] = React.useState(false);

  const { id } = useParams();

  const user = useSelector((state) => state.userDetails);

  const [userData, setBoardData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    country: user.country,
  });

  useEffect(() => {
    setBoardData(userData);
  }, [userData]);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  const handleClickOpen = () => {
    setBoardData(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/');
    setUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfoByUser(user._id, userData));
    window.location.reload(false);
  }

  return(
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography className={classes.heading} variant="h2" align="center">{user.name}</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
          <div className={classes.profile}>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
      </Toolbar>
      </AppBar>
      <Container component="main">
        <Paper className={classes.paper} elevation={3}>
          <form className={classes.form}>
              <Grid container spacing={3}>
                  { 
                    <>
                      <Input name="name" label="Name" type="text" defaultValue={user.name} />
                      <Input name="email" label="Email Address" type="email" defaultValue={user.email} />
                      <Input name="phone" label="Phone Number" type="text" defaultValue={user.phone} />
                      <Input name="address" label="Address" type="text" defaultValue={user.address} />
                      <Input name="city" label="City" type="text" defaultValue={user.city} />
                      <Input name="state" label="State" type="text" defaultValue={user.state} />
                      <Input name="country" label="Country" type="text" defaultValue={user.country} />
                    </>
                  }
              </Grid>
          </form>
          <Button style={{ color: '#FFFFFF', backgroundColor: '#000000', marginTop: '10px', }} onClick={handleClickOpen} color="primary">
            Update Details
          </Button>
        </Paper>
      </Container>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update the Details</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Name" varient="outlined" fullWidth value={userData.name} onChange={(e) => setBoardData({ ...userData, name: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="email" label="E-mail" varient="outlined" fullWidth value={userData.email} onChange={(e) => setBoardData({ ...userData, email: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="phone" label="Phone Number" varient="outlined" fullWidth value={userData.phone} onChange={(e) => setBoardData({ ...userData, phone: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="address" label="Address" varient="outlined" fullWidth value={userData.address} onChange={(e) => setBoardData({ ...userData, address: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="city" label="City" varient="outlined" fullWidth value={userData.city} onChange={(e) => setBoardData({ ...userData, city: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="state" label="State" varient="outlined" fullWidth value={userData.state} onChange={(e) => setBoardData({ ...userData, state: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="country" label="Country" varient="outlined" fullWidth value={userData.country} onChange={(e) => setBoardData({ ...userData, country: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#FFFFFF', backgroundColor: '#000000', }} onClick={handleSubmit} color="primary">
            Update
          </Button>
          <Button style={{ color: '#FFFFFF', backgroundColor: '#1A1A1A', }} onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
   )
}

export default Profile;