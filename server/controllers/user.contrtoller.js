const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');

const createUser = async (data) => {

    try {
        const userExist = await userModel.findOne({ email: data.email });
        if (userExist) {
            console.log("user already exists")
            return {
                status: "failed",
                message: "user already exists"
            }
        }
        // hashing password of user 
        else{
            const hashedPassword = await bcrypt.hash(data.password, 10);
            console.log(hashedPassword);
            data.password = hashedPassword;
            await userModel.create(data);
            return data;
        }
    }
    catch (e) {
        return {
            status: e._message,
        }
    }
}


const loginUser = async (data) => {

    const userExist = await userModel.findOne({ email: data.email });
    if (!userExist) {
        return {
            status: 'failed',
            message: "check ur password or email"
        }
    }
    try {
        // matching password
        const isPasswordCorrect = await bcrypt.compare(data.password, userExist.password);
        console.log(isPasswordCorrect);

        if (isPasswordCorrect) {
            return userExist;
        }
        else {
            return {
                status: 'failed',
                message: "check ur password or email"
            }
        }
    }
    catch (error) {
        return {
            status: 'failed',
            message: 'email and password required for login'
        }
    }
}

module.exports={
    createUser,
    loginUser
}