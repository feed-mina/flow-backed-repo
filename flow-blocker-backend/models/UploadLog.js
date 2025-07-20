const { DataTypes, Model } = require('sequelize');

class UploadLog extends Model {
  static initModel(sequelize) {
    UploadLog.init(
      {
        userId: DataTypes.INTEGER,
        fileName: DataTypes.STRING,
        extensionType: DataTypes.STRING,  
        result: DataTypes.ENUM('PASS', 'BLOCK'),
      },
      {
        sequelize,
        modelName: 'UploadLog',
      }
    );
  }
}

module.exports = UploadLog;
