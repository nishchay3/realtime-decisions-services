const connection = require('../utilities/connection');

let database = {}

database.createUser = async (user) => {
    try {
        let userModel = await connection.getCollection();
        let newUser = new userModel();
        newUser.email = user.email;
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.setPassword(user.password);
        let dataCreated = await userModel.create(newUser);
        if (dataCreated) {
            let token = newUser.generateJwt();
            return token;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

database.loginUser = async (userObj) => {
    try {
        let userModel = await connection.getCollection();
        let user = await userModel.findOne({ email: userObj.email });
        if (user) {
            if (!user.validPassword(userObj.password)) {
                return ({
                    message: "Password is wrong"
                })
            } else {
                let token = user.generateJwt();
                return token;
            }
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

database.userProfile = async (id) => {
    try {
        let userModel = await connection.getCollection();
        let user = await userModel.findOne({ _id: id });
        if (user) {
            return user;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

database.getAllUsers = async () => {
    try {
        let userModel = await connection.getCollection();
        let allData = await userModel.find({});
        if (allData) {
            return allData;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = database;