import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { updateUserInfoByAdmin, updatePassword, deleteUser } from '../../../../actions/index.js';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    height: 100,
  },
  media: {
    height: 0,
    paddingTop: '25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  deleteIcon : {
    color: '#e60000',
    marginRight: '0px',
  },
  descriptionTextField : {
    marginTop: '20px',
    marginBottom: '10px',
  },
}));

function User({ user }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    country: user.country,
  });

  const [userPassword, setUserPasswordData] = useState({
    password: '',
  });

  useEffect(() => {
    if (userData) 
        setUserData(userData);
  }, [userData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfoByAdmin(user._id, userData));
    setOpen(false);
    window.location.reload(false);
  }

  const handleClickOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = () => {
    setOpenPassword(false);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    dispatch(updatePassword(user._id, userPassword));
    setOpen(false);
    window.location.reload(false);
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title={<h4>{user.name}</h4>}
          action={
            <>
              <IconButton aria-label="vpnkey">
                  {
                      user.adminApproved === false ? 
                      (
                          <VpnKeyIcon style={{ color: '#FF0000' }} onClick={handleClickOpenPassword} />
                      ) : 
                      null 
                  }
              </IconButton>
              <IconButton aria-label="edit">
                  <EditIcon style={{ color: '#404040' }} onClick={handleClickOpen} />
              </IconButton>
              <IconButton aria-label="delete-icon">
                <DeleteIcon className={classes.deleteIcon} 
                  onClick={() => 
                    {
                      dispatch(deleteUser(user._id))
                      window.location.reload(false);
                    }
                  }
                />
              </IconButton>
            </>
          }
        />
      </Card>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update the Details</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Name" varient="outlined" fullWidth value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="email" label="E-mail" varient="outlined" fullWidth value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="phone" label="Phone Number" varient="outlined" fullWidth value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="address" label="Address" varient="outlined" fullWidth value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="city" label="City" varient="outlined" fullWidth value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="state" label="State" varient="outlined" fullWidth value={userData.state} onChange={(e) => setUserData({ ...userData, state: e.target.value })} />
          <TextField className={classes.descriptionTextField} name="country" label="Country" varient="outlined" fullWidth value={userData.country} onChange={(e) => setUserData({ ...userData, country: e.target.value })} />
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
      <Dialog open={openPassword} onClose={handleClosePassword} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
        <DialogContent>
          <TextField name="password" label="Password" varient="outlined" fullWidth value={userPassword.password} onChange={(e) => setUserPasswordData({ ...userPassword, password: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#FFFFFF', backgroundColor: '#000000', }} onClick={handleSubmitPassword} color="primary">
            Update
          </Button>
          <Button style={{ color: '#FFFFFF', backgroundColor: '#1A1A1A', }} onClick={handleClosePassword} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default User;