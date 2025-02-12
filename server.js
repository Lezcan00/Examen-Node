require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./api/routes/itemRoutes')
const authRoutes = require('./api/routes/authRoutes');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error(err));


app.use('/api/items', itemRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
