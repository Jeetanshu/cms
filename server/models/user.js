const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    password : {
        type : String,
    },
    address : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        requried : true,
    },
    country : {
        type : String,
        required : true,
    },
    profilePic : {
        type : String,
    },
    adminApproved : {
        type : Boolean,
        default : false,
    },
    role : {
        type : String,
        default : 'user',
    }
});

const User = mongoose.model('arhiantuser', userSchema);

module.exports = User;