const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');

const secret = "jwt";

const logIn = async (request, response) => {
    try {

        const { phoneOrEmail, password } = request.body;

        const userDetailsEmail = await User.findOne({ email : phoneOrEmail });
        const userDetailsPhone = await User.findOne({ phone : phoneOrEmail });

        if(userDetailsEmail) {
            
            const isPasswordCorrect = await bcrypt.compare(password, userDetailsEmail.password);

            if (!isPasswordCorrect) 
                return response.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ email: userDetailsEmail.email, id: userDetailsEmail._id }, secret, { expiresIn: "1h" });

            const userDetails = userDetailsEmail;

            response.status(200).json({ userDetails, token });
        }
        else if(userDetailsPhone) {

            const isPasswordCorrect = await bcrypt.compare(password, userDetailsPhone.password);

            if (!isPasswordCorrect)
                return response.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ email: userDetailsPhone.email, id: userDetailsPhone._id }, secret, { expiresIn: "1h" });

            const userDetails = userDetailsPhone;

            response.status(200).json({ userDetails , token });
        }
        else {
            return response.status(400).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

const signUp = async (request, response) => {
    try {

        const { name, email, phone, address, city, state, country } = request.body;

        const userDetailsEmail = await User.findOne({ email });
        const userDetailsPhone = await User.findOne({ phone });

        if(userDetailsEmail)
            return response.status(404).json({ message : "User exists with given email" });
        else if(userDetailsPhone)
            return response.status(404).json({ message : "User exists with given phone" });

        const userDetails = await User.create({ name, email, phone, address, city, state, country });

        const token = jwt.sign( { email: userDetails.email, id: userDetails._id }, secret, { expiresIn: "1h" } );

        response.status(201).json({ userDetails, token });

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

const getUser = async (request, response) => {
    try {

        const { id } = request.params;

        const userDetails = await User.findById(id);

        if(!userDetails)
            return response.status(404).json({ message : "User does not exist" });
        
        response.status(200).json(userDetails);

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

const uploadProfilePic = async (request, response) => {
    try {

        const { id } = request.params;

        const userDetails = await User.findById(id);

        if(!userDetails)
            return response.status(404).json({ message : "User does not exist" });

        response.status(200).json(userDetails);

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

const updateUserInfo = async (request, response) => {
    try {

        const { name, email, phone, address, city, state, country } = request.body;

        const { id } = request.params;

        const userDetails = await User.findById(id);

        userDetails.name = name;
        userDetails.email = email;
        userDetails.phone = phone;
        userDetails.address = address;
        userDetails.city = city;
        userDetails.state = state;
        userDetails.country = country;

        userDetails.save();

        response.status(200).json({ message : "User Details Updated" });

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

module.exports = { logIn, signUp, getUser, uploadProfilePic, updateUserInfo };