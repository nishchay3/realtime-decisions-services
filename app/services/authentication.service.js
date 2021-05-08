const database = require('../database/authentication.database');

let authService = {}
let throwError = (message, status) => {
    let err = new Error(message);
    if (status) {
        err.status = status;
    }
    throw err
}

authService.createUser = async (userObj) => {
    try {
        let token = await database.createUser(userObj);
        if (token) {
            return token;
        } else {
            throwError("User creation failed", 500);
        }
    } catch (error) {
        throw error;
    }
}

authService.loginUser = async (userObj) => {
    try {
        let token = await database.loginUser(userObj);
        if (token) {
            return token;
        } else {
            throwError("User not found", 401);
        }
    } catch (error) {
        throw error;
    }
}

authService.userProfile = async (req) => {
    try {
        if (!req.payload._id) {
            throwError("Unauthorized user", 401);
        } else {
            let userFound = await database.userProfile(req.payload._id);
            if (userFound) {
                return userFound;
            } else {
                throwError("User fetch failed", 500);
            }
        }
    } catch (error) {
        throw error;
    }
}

authService.getAllUsers = async () => {
    try {
        let allUsers = database.getAllUsers();
        if (allUsers) {
            return allUsers;
        } else {
            throwError("User fetch failed", 500);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = authService;