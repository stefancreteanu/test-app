module.exports = (sequelize, DataTypes) => {
    let masina = sequelize.define('masini', {
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anfab: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capcil: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        taxa: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return masina;
}