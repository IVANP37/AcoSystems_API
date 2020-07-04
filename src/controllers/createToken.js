require('dotenv').config();
const jwt = require('jsonwebtoken');

const getToken = async (req, res) => {
    const { password } = req.body;
    const newUserPass = { ...req.body };
    const pass = newUserPass.password;
    const token = jwt.sign({ pass }, process.env.SECRET_KEY);
    res.status(200).json({ auth: true, token });
}
module.exports = {
    getToken
}
