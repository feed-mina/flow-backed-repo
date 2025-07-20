const sequelize = require('../config/db');
const BlockedExtension = require('./BlockedExtension');
const UploadLog = require('./UploadLog');

BlockedExtension.initModel(sequelize);
UploadLog.initModel(sequelize);

module.exports = {
  sequelize,
  BlockedExtension,
  UploadLog,
};
