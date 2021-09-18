import React, {useState, useEffect } from "react";
import { Container, Grow, Grid, AppBar, Typography, Toolbar, Button, } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";

import UserCard from './UserCard/Users.js';
import UserForm from './UserForm/UserForm.js';
import useStyle from './style';
import { getUsers } from '../../actions/index.js';
import * as actionType from '../../constants/actionTypes.js';

const Users = (props) => {

  const classes = useStyle();

  const [currentUser, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsers());
  }, [currentId, dispatch]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/');
    setUser(null);
  };

  return(
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography className={classes.heading} variant="h2" align="center">Users</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
          <div className={classes.profile}>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3} >
            <Grid item xs={12} sm={7}>
              <UserCard setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <UserForm/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
}

export default Users;