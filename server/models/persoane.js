module.exports = (sequelize, DataTypes) => {
    let person = sequelize.define('persoane', {
        nume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cnp: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        varsta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        masina: {
            type: DataTypes.JSON,
            allowNull: false
        }
    })

    return person;
}