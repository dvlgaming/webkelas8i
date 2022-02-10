const { limitCount, limitPremium } = require('../lib/settings');
const { User } = require('./model');

    async function addUser(username, password, email, kelas, nomor) {
        let obj = { username };
        User.create(obj);
    }
    module.exports.addUser = addUser

    async function checkUsername(username) {
        let users = await User.findOne({username: username});
        if(users !== null) {
            return users.username;
        } else {
            return false;
        }
    }
    module.exports.checkUsername = checkUsername;