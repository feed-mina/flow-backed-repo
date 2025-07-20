// app.js 생성 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const {sequelize} = require('./models');

app.use(cors());
app.use(express.json());

app.use('/upload', require('./routes/upload'));
app.use('/extensions', require('./routes/extensions'));

sequelize.sync().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is runnng on port ${process.env.PORT}`);
    });
});