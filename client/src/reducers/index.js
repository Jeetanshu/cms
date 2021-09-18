import { combineReducers } from 'redux';

import auth from './auth.js';
import users from './users.js';
import userDetails from './userDetails';

export const reducers = combineReducers({ auth, users, userDetails });