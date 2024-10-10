const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};
