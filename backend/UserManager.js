const User = require("./sequelize/models/User");
const Admin = require("./sequelize/models/Admin");

async function getAllUserInformation() {
    var allValues = await User.findAll();
    return allValues.map(value=>({name: value.name, username: value.username, userID: value.userID, canLogIn: value.canLogIn, pin: value.pin}))
}

async function setUserCanLogIn(userID, canLogIn) {
    var user = await User.findOne({where: {userID: userID}});
    if (!user) {
        throw new Error("Could not find user")
    }

    // verify canLogIn is a boolean
    if (typeof canLogIn !== "boolean") {
        throw new Error("canLogIn must be a boolean");
    }

    user.canLogIn = canLogIn;
    await user.save();
}

async function setUserPin(userID, pin) {
    var user = await User.findOne({where: {userID: userID}});
    if (!user) {
        throw new Error("Could not find user")
    }

    // verify pin is a string
    if (typeof pin !== "string" && pin !== null) {
        throw new Error("pin must be a string");
    }

    // verify pin only contains numbers
    if (!/^\d+$/.test(pin) && pin !== null) {
        throw new Error("pin must only contain numbers");
    }

    // if pin is less than 4 digits, pad it with leading zeros
    if (pin !== null && pin.length < 4) {
        pin = pin.padStart(4, '0');
    }

    user.pin = pin;
    await user.save();
}

async function setUserUsername(userID, username) {
    var user = await User.findOne({where: {userID: userID}});
    if (!user) {
        throw new Error("Could not find user")
    }

    // verify username is a string
    if (typeof username !== "string" && username !== null) {
        throw new Error("username must be a string");
    }

    // verify username does not already exist as a user or admin
    var existingUser = await User.findOne({where: {username: username}});
    var existingAdmin = await Admin.findOne({where: {username: username}});
    if (existingUser && existingUser.userID !== userID && username != null) {
        throw new Error("username already exists");
    }
    if (existingAdmin) {
        throw new Error("username already exists");
    }

    user.username = username;
    await user.save();
}

async function getUserInformation(userID) {
    // return name, username, pin, userID, canLogIn
    var user = await User.findOne({where: {userID: userID}});
    if (!user) {
        throw new Error("Could not find user")
    }
    return {
        name: user.name,
        username: user.username,
        pin: user.pin,
        userID: user.userID,
        canLogIn: user.canLogIn
    }
}

async function validateAdmin(username, pin) {
    var admin = await Admin.findOne({where: {username: username}});
    if (!admin) return null;
    if (admin.pin === pin) {
        return {
            type: "admin",
            username: admin.username,
            userID: null
        }
    }
    return null;
}

async function validateAccount(username, pin) {
    var user = await User.findOne({where: {username: username}});
    if (!user) return null;
    if (user.pin === pin && user.canLogIn) {
        return {
            type: "user",
            username: user.username,
            userID: user.userID
        }
    }
    return null;
}

async function validateLogin(username, pin) {
    var admin = await validateAdmin(username, pin);
    if (admin) return admin;

    var account = await validateAccount(username, pin);
    if (account) return account;
 
    return null;
}

async function getNameForUser(userID) {
    var user = await User.findOne({where: {userID: userID}});
    if (!user) {
        throw new Error("Could not find user")
    }
    return user.name;
}

async function getNameForAdmin() {
    var admin = await Admin.findOne();
    if (!admin) {
        throw new Error("Could not find admin")
    }
    return admin.name;
}

module.exports = {
    getAllUserInformation,
    setUserCanLogIn,
    setUserUsername,
    setUserPin,
    getUserInformation,
    validateAdmin,
    validateAccount,
    validateLogin,
    getNameForUser,
    getNameForAdmin
};