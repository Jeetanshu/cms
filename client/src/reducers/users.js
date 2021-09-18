import * as actionType from '../constants/actionTypes';

const userReducer =  (users = [], action) => {
    switch (action.type) {
        case actionType.CREATE_USER:
            return [...users, action.payload];
        case actionType.UPDATE_USER:
            return users.map((user) => (user._id === action.payload._id ? action.payload : user));
        case actionType.FETCH_USERS:
            return action.payload;
        case actionType.DELETE_USER:
            return users.filter((user) => user._id !== action.payload);
        default:
            return users;
    }
}

export default userReducer;