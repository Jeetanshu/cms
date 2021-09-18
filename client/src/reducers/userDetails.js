import * as actionType from '../constants/actionTypes';

const userDetailsReducer =  (userDetails = [], action) => {
    switch (action.type) {
        case actionType.FETCH_USER:
            return action.payload;
        case actionType.UPDATE_USER:
            return userDetails.map((user) => (user._id === action.payload._id ? action.payload : user));    
        default:
            return userDetails;
    }
}

export default userDetailsReducer;