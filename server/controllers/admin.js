const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const User = require('../models/user.js');

const getUsers = async (request, response) => {
    try {

        const userDetails = await User.find({ role : 'user' });

        if(userDetails == undefined || userDetails == null)
            return response.status(200).json({ userDetails : [] });

        response.status(200).json(userDetails);

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

const updatePassword = async (request, response) => {
    try {

        const { id } = request.params;

        const { password } = request.body;

        const userDetails = await User.findById(id);

        if(!userDetails)
            return response.status(404).json({ message : "User does not exist" });

        const hashedPassword = await bcrypt.hash(password, 12);

        userDetails.password = hashedPassword;
        userDetails.adminApproved = true;

        userDetails.save();

        let emailMessage  = `Hello ${userDetails.name}\n
                    Your login credentials are as follows:\n
                    Email : ${userDetails.email}
                    Password : ${password}\n
                    Link : http://localhost:3000\n
                    Thank You`;

        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
              user: `<!--ADMIN_EMAIL_ID--!>`,
              pass: `<!--ADMIN_EMAIL_PASSWORD--!>`,
            },
        });

        let info = await transporter.sendMail({
            from: `<!--ADMIN_EMAIL_ID--!>`,
            to: `${userDetails.email}`,
            subject: "Girija Agro Processor Enquiry",
            text: `${emailMessage}`,
        });
    
        transporter.sendMail(info, function(error, data) {
            if(error);
                //ERROR
            else {
                //EMAIL SENT
            }
        });
    
        response.status(200).json({ message : "Password has been Updated" });

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

const updateUserInfo = async (request, response) => {
    try {

        console.log("Update User Info");

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

const createUser = async (request, response) => {
    try {

        const { name, email, password, phone, address, city, state, country } = request.body;

        const userDetailsEmail = await User.findOne({ email });
        const userDetailsPhone = await User.findOne({ phone });

        if(userDetailsEmail)
            return response.status(404).json({ message : "User exists with given email" });
        else if(userDetailsPhone)
            return response.status(404).json({ message : "User exists with given phone" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = await User.create({ name, email, password : hashedPassword, phone, address, city, state, country, adminApproved : true });

        response.status(201).json({ userDetails });

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

const deleteUser = async (request, response) => {
    try {

        const { id } = request.params;

        await User.findByIdAndDelete(id);

        response.status(200).json({ message : "User Deleted" });

    } catch (error) {
        console.log(error);
        response.status(500).json({ message : error });
    }
}

module.exports = { getUsers, updatePassword, updateUserInfo, createUser, deleteUser };