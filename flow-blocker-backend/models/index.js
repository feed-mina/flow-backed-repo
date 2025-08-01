const { Sequelize } = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const BlockedExtension = require('./BlockedExtension');
const UploadLog = require('./UploadLog');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

BlockedExtension.initModel(sequelize);
UploadLog.initModel(sequelize);


const db = {
  Sequelize,      
  sequelize,
  BlockedExtension,
  UploadLog,
};

module.exports = db;