const { DataTypes, Model } = require('sequelize');

class BlockedExtension extends Model {
    static inintModel(sequelize){
        BlockedExtension.init(
            {
                userId:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                extension:{
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isCustom:{
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName : 'BlockedExtension',
            }
        );
    }
}

module.exports = BlockedExtension;