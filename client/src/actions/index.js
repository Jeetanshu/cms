import { AUTH, FETCH_USERS, FETCH_USER, UPDATE_USER, CREATE_USER, UPDATE_USER_ADMIN, DELETE_USER } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const signIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    if(data.userDetails.role == 'user') {
      router.push(`/profile/${data.userDetails._id}`);
    }
    else if(data.userDetails.role == 'admin') {
      router.push('/users');
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updateUserInfoByUser = (id, formData) => async(dispatch) => {
  try {
    const { data } = await api.updateUserInfo(id, formData);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updateUserInfoByAdmin = (id, formData) => async(dispatch) => {
  try {
    const { data } = await api.updateUserInfo(id, formData);
    dispatch({ type: UPDATE_USER_ADMIN, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updatePassword = (id, formData) => async(dispatch) => {
  try {
    const { data } = await api.updatePassword(id, formData);
    dispatch({ type: UPDATE_USER_ADMIN, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const createUser = (formData) => async(dispatch) => {
  try {
    const { data } = await api.createUser(formData);
    dispatch({ type: CREATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(id);
    dispatch({ type: DELETE_USER, paload: data });
  } catch (error) {
    console.log(error);
  }
}