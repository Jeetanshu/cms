import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import User from './User/User.js';
import useStyle from './style.js';

const Users = (props) => {

    const classes = useStyle();
    const users = useSelector((state) => state.users);

    return(
        !users.length ? 
        (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                <Typography className={classes.heading} variant="h3" align="center">No Users Available</Typography>
            </Grid>
        ) :
        (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {users.map((user) => (
                    user._id !== undefined ?
                        (
                            <Grid key={user._id} item xs={6} sm={3} md={6}>
                                <User user={user} />
                            </Grid>
                        ) : null
                ))}
            </Grid>
        )    
    )

}

export default Users;